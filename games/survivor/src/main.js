/**
 * @module main
 * @description Top-level orchestrator. Owns the `Game` instance, the
 * fixed-step update loop, the spawn/wave director, the achievement check
 * heartbeat and the menu/state machine. This is the only module that
 * reaches into nearly every other one — keep new logic out of here when a
 * focused module fits.
 *
 * Dependencies: every other module under `src/`.
 *
 * Exports:
 *   - class Game
 *   - boot()              constructor + window-handle install
 *   - re-exports ACHIEVEMENTS, WAVES from data.js
 */

import { CONFIG, Difficulty, GameState } from './config.js';
import { ACHIEVEMENTS, BOSSES, ENEMIES, WAVES, WEAPONS } from './data.js';
import {
    Enemy,
    ExpOrb,
    FloatingText,
    Particle,
    Player,
    findEnemyDef,
    registerWeaponClass
} from './entities.js';
import { Weapon } from './weapons.js';
import { AudioEngine } from './audio.js';
import { InputManager } from './input.js';
import { HapticEngine } from './haptics.js';
import { loadKeymap, saveKeymap } from './keymap.js';
import { UI } from './ui.js';
import { FpsMeter, ShakeCamera } from './systems.js';
import { SpatialHash } from './spatial-hash.js';
import { Pool, resetFloatingText, resetParticle } from './pool.js';
import { EffectLayer } from './effects.js';
import { AchievementTracker } from './achievements.js';
import {
    SeededRng,
    accumulateTotals,
    getTouchButtonScale,
    loadSave,
    loadSpeedrunScores,
    recordHighScore,
    recordSpeedrunScore,
    resetSave,
    saveSave
} from './storage.js';
import { setLocale, t as _t } from './i18n.js';
import {
    DEFAULT_STAGE_ID,
    getBackgroundFor,
    getBossesFor,
    getStageModifiers,
    getWavesFor,
    pickWeighted
} from './stages.js';
import { dailyChallenge, saveDailyResult } from './daily.js';
import { TutorialState } from './tutorial.js';
import { ReplayPlayer, ReplayRecorder, loadReplay, saveReplay } from './replay.js';
import { KonamiDetector } from './konami.js';

registerWeaponClass(Weapon);

// ---------------------------------------------------------------------------
// Offscreen sprite cache. Pre-rasterising the tiny enemy sprites once and
// blitting the bitmap each frame is measurably faster than redoing the
// gradient/fill path every draw call. Cache key = `${id}-${size}`.
// ---------------------------------------------------------------------------
const SPRITE_CACHE = new Map();

function spriteKey(id, size) {
    return `${id}@${size}`;
}

function getEnemySprite(def, size) {
    const key = spriteKey(def.id, size);
    const cached = SPRITE_CACHE.get(key);
    if (cached) return cached;
    if (typeof document === 'undefined') return null; // SSR / test guard
    const pad = 4;
    const d = size * 2 + pad * 2;
    const off = document.createElement('canvas');
    off.width = d;
    off.height = d;
    const ox = d / 2;
    const oy = d / 2;
    const c = off.getContext('2d');
    c.fillStyle = def.color || '#ff4444';
    c.beginPath();
    c.arc(ox, oy, size, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = 'rgba(255,255,255,0.25)';
    c.beginPath();
    c.arc(ox, oy, size * 0.5, 0, Math.PI * 2);
    c.fill();
    SPRITE_CACHE.set(key, off);
    return off;
}

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = GameState.MENU;
        this.lastTime = 0;
        this.gameTime = 0;
        this.kills = 0;
        this.raf = 0;

        // Collections
        this.enemies = [];
        this.projectiles = [];
        this.enemyProjectiles = [];
        this.expOrbs = [];
        this.particles = [];
        this.floatingTexts = [];
        this.mines = [];

        this.player = null;

        // Systems
        this.spatial = new SpatialHash(CONFIG.SPATIAL_CELL_SIZE);
        this.camera = new ShakeCamera();
        this.fpsMeter = new FpsMeter();
        this.effects = new EffectLayer();

        // Object pools for the churny entities. `prealloc` avoids the
        // first-level burst triggering an allocation cascade.
        this.pools = {
            floatingText: new Pool(() => new FloatingText('', 0, 0, '#fff'), resetFloatingText, {
                maxSize: 256,
                prealloc: 32
            }),
            particle: new Pool(() => new Particle(0, 0, '#fff'), resetParticle, {
                maxSize: 512,
                prealloc: 64
            })
        };

        // Tab-visibility aware pause so resuming doesn't produce a huge dt.
        this._hiddenPaused = false;
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => this._onVisibilityChange());
        }

        // Save + settings
        this.save = loadSave();
        setLocale(this.save.settings.locale || 'pt');
        if (this.save.settings.colorblind) document.body.classList.add('cb-mode');

        // Audio + input + UI
        this.audio = new AudioEngine(this.save.settings);
        this.input = new InputManager();
        // iter-19: haptic feedback engine. Reads the live save.settings ref
        // so toggling the Settings checkbox takes effect on the next event.
        this.haptics = new HapticEngine(this.save.settings);
        // iter-19: load custom keymap (or fall back to default WASD + arrows
        // + Esc/P + H/? + M) and hand it to the input manager. Persisted
        // changes from previous sessions are picked up here.
        this.keymap = loadKeymap();
        this.input.setKeymap(this.keymap);
        this.ui = new UI(this);
        // Refresh every static [data-i18n] node right away so the boot
        // locale (pt by default on this deployment) renders correctly on
        // first paint instead of only after a manual language switch.
        this.ui.onLocaleChanged();

        // Achievements tracker persists the lifetime record.
        this.achievements = new AchievementTracker(this.save);

        this._bossesSpawned = new Set();
        this._spawnAccumulator = 0;
        this._bossWarnedAt = new Set();
        this._lastAnnouncedWave = null;

        // Active stage descriptor + per-stage waves/bosses snapshot. Keyed off
        // the persisted setting so a returning player resumes on whatever map
        // they last picked. Re-derived in start() so a stage swap mid-session
        // takes effect on the next run.
        this.stageId = this.save?.settings?.stage || DEFAULT_STAGE_ID;
        this.stageWaves = getWavesFor(this.stageId);
        this.stageBosses = getBossesFor(this.stageId);
        this.currentWave = this.stageWaves[0] || WAVES[0];

        // Speedrun bookkeeping. When `speedrunMode` is truthy, spawn picks
        // are deterministic, real-time splits are tracked and the result
        // lands in the speedrun leaderboard instead of the normal one.
        this.speedrunMode = false;
        this.speedrunRng = null;
        this.speedrunStart = 0;
        this.speedrunSplits = [];
        this._nextSplitIdx = 0;

        // Daily-challenge bookkeeping. When `dailyMode` is true the seed +
        // stage + boss schedule are pinned by `daily.dailyChallenge(...)`.
        this.dailyMode = false;
        this.dailyChallenge = null;

        // Per-run bookkeeping used by achievements.
        this.run = this.achievements.run;

        this._bindInput();
        this._bindDomButtons();
        this._bindLeaderboardImport();
        this._bindGlobalHotkeys();
        // iter-20: Konami code detector. Active only on the main menu (state
        // === MENU); the listener is hot-installed but checks the state on
        // every push so it never interferes with gameplay input.
        this._bindKonamiCode();

        // iter-13: paint the Stage chip on the main menu so a returning
        // player sees which map their next Start Run would launch.
        this.ui.updateStageChip(this.stageId);

        // iter-15: tutorial state machine + replay bookkeeping. Both are
        // inert until explicitly engaged by the player (via Try Tutorial /
        // Replay Last Run). Recorder is created on every run start in
        // `start()` and only persisted when the run ends; replay player is
        // only created on demand.
        this.tutorial = new TutorialState();
        this.replayRecorder = null;
        this.replayPlayer = null;
        this.replayActive = false;
        // Per-frame snapshot of move vector for the recorder (kept on the
        // game so other systems can also peek at the most recent input).
        this._lastMoveVec = { x: 0, y: 0 };
        // Cached tutorial banner element handle; assigned lazily on first
        // tutorial activation so we don't pay for it on returning players.
        this._tutorialBanner = null;

        // First-launch How-to-Play: show once, persist a flag so we don't
        // nag returning players. Wrapped in a microtask so DOM is settled.
        // iter-15: same one-time gate now also offers the 5-step tutorial.
        if (!this.save?.flags?.howToSeen) {
            Promise.resolve().then(() => {
                this.ui.showHowToPlay(() => {
                    this.save.flags = this.save.flags || {};
                    this.save.flags.howToSeen = true;
                    saveSave(this.save);
                    // After the how-to-play closes, offer the interactive
                    // tutorial if it hasn't already been completed.
                    if (!this.save.flags.tutorialDone) this._offerTutorial();
                });
            });
        } else if (!this.save?.flags?.tutorialDone) {
            // Returning player who saw HTP but never finished the tutorial:
            // nudge once on the next cold-boot, no other interruption.
            Promise.resolve().then(() => this._offerTutorial());
        }

        // Apply any persisted mute on boot so a refresh keeps the choice.
        if (this.save.settings.muted) this.audio.setMuted(true);

        // iter-14: apply touch-button scale to CSS custom properties.
        this._applyTouchScale();
        // iter-14: PWA install prompt (one-shot per save). Listens for the
        // browser's `beforeinstallprompt` once; if it fires before the user
        // has dismissed it ever, we surface our own little banner.
        this._wirePwaPrompt();

        window.addEventListener('resize', () => this._resize());
        this._resize();
    }

    /**
     * Bind global hotkeys that operate from the main menu *and* during
     * gameplay: M toggles mute, H (or ?) toggles the help overlay. Pause
     * already has its own binding via InputManager.onTogglePause.
     */
    _bindGlobalHotkeys() {
        // iter-19: M (mute) and H/? (help) are now dispatched by the input
        // layer through the customisable keymap. We keep the per-frame
        // suppression for INPUT/TEXTAREA targets as a capture-phase guard so
        // typing into the leaderboard import textarea doesn't pause/help.
        if (typeof window === 'undefined') return;
        window.addEventListener(
            'keydown',
            (e) => {
                const tag = (e.target && e.target.tagName) || '';
                if (tag === 'INPUT' || tag === 'TEXTAREA') {
                    // Stop the input-manager's default handler from firing
                    // for typed text. We do this rather than gating inside
                    // input.js so keymap remapping stays tiny.
                    e.stopPropagation();
                }
            },
            true
        );
    }

    /**
     * iter-20: install the Konami Code detector. Listens on the main menu
     * only — the gameplay input layer already owns arrows during a run, and
     * we don't want a stray cheat-code press during combat to flicker an
     * unlock toast. On a successful sequence we flip a per-run flag, run
     * the achievement check immediately, and surface a small announcement
     * via the existing live-region helper. The unlock weapon is wired
     * through UNLOCKS so the next Start Run gets it as a starter option.
     */
    _bindKonamiCode() {
        if (typeof window === 'undefined') return;
        this._konami = new KonamiDetector(() => this._onKonamiUnlocked());
        window.addEventListener('keydown', (e) => {
            if (this.state !== GameState.MENU) return;
            // Ignore when typing into the leaderboard import textarea etc.
            const tag = (e.target && e.target.tagName) || '';
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            this._konami.push(e.key);
        });
    }

    /** Konami sequence completed: flip the per-run flag and unlock the cheat. */
    _onKonamiUnlocked() {
        // `this.run` is aliased to `this.achievements.run` (see constructor +
        // start()), so setting the flag in one place is enough for the
        // achievement check to read it.
        if (this.run) this.run.konamiCode = true;
        try {
            this.achievements.check(this);
        } catch {
            /* swallow — boot-time miss is fine */
        }
        this._flushAchievementToasts?.();
        this._announce(_t('cheatUnlocked'));
    }

    /** Toggle a global mute and persist so a refresh keeps the choice. */
    toggleMute() {
        const next = !this.save.settings.muted;
        this.save.settings.muted = next;
        saveSave(this.save);
        this.audio.setMuted(next);
        this._announce(next ? _t('audioMuted') : _t('audioUnmuted'));
    }

    /** Open the help overlay; close it if it's already open. */
    toggleHelp() {
        const el = this.ui.els.helpScreen;
        if (el && el.style.display === 'flex') {
            this.ui.hideHelp();
        } else {
            this.ui.showHelp();
        }
    }

    /**
     * Listen for the `vs-leaderboard-import` CustomEvent that `UI.showLeaderboard`
     * dispatches when the user pastes JSON and clicks Import. We merge the
     * incoming runs into both the normal and speedrun stores, dedupe by
     * `date+timeSurvived` (or `date+timeMs` for speedrun), then re-rank and
     * persist. The UI is then refreshed if it's still on screen.
     */
    _bindLeaderboardImport() {
        if (typeof window === 'undefined') return;
        window.addEventListener('vs-leaderboard-import', (ev) => {
            const payload = ev.detail || {};
            try {
                if (Array.isArray(payload.normal)) {
                    const seen = new Set(
                        (this.save.highScores || []).map((r) => `${r.date}|${r.timeSurvived}`)
                    );
                    for (const r of payload.normal) {
                        const k = `${r.date}|${r.timeSurvived}`;
                        if (!seen.has(k)) {
                            recordHighScore(this.save, r);
                            seen.add(k);
                        }
                    }
                    saveSave(this.save);
                }
                if (Array.isArray(payload.speedrun)) {
                    const existing = loadSpeedrunScores();
                    const seen = new Set(existing.map((r) => `${r.date}|${r.timeMs}`));
                    for (const r of payload.speedrun) {
                        const k = `${r.date}|${r.timeMs}`;
                        if (!seen.has(k)) {
                            recordSpeedrunScore(r);
                            seen.add(k);
                        }
                    }
                }
                // Refresh the open leaderboard view if the dialog is still up.
                this.ui.showLeaderboard?.(
                    this.save.highScores || [],
                    loadSpeedrunScores(),
                    () => {}
                );
            } catch (err) {
                console.warn('[main] leaderboard import failed', err);
            }
        });
    }

    // --- Lifecycle --------------------------------------------------------
    _bindInput() {
        this.input.attach(window);
        this.input.onTogglePause = () => this.togglePause();
        // iter-19: help/mute actions are routed through the keymap rather
        // than the legacy global keydown listener. Both still default to
        // H/M but a remap takes effect immediately.
        this.input.onActionHelp = () => this.toggleHelp();
        this.input.onActionMute = () => this.toggleMute();
        // Virtual joystick
        const joy = document.getElementById('joystickBase');
        const knob = document.getElementById('joystickKnob');
        if (joy && knob) this.input.attachJoystick(joy, knob);
        // iter-14: mobile special-skill button. The button is a placeholder
        // for now — wires through to togglePause until per-build skills are
        // implemented, so the press at least gives the player a way out.
        const special = document.getElementById('specialSkillBtn');
        if (special) {
            this.input.attachSpecialButton(special);
            this.input.onTouchSpecial = () => this.togglePause();
        }
        // iter-14: gamepad confirm/cancel/menu wiring. We map A→togglePause
        // and B→togglePause as well for now (overlay UIs read DOM keystrokes
        // directly), but Start is the canonical pause toggle.
        this.input.onGamepadConfirm = () => {
            // Forward as a synthetic Enter keypress so existing menu close
            // handlers fire without each one having to know about gamepads.
            this._dispatchKey('Enter');
        };
        this.input.onGamepadCancel = () => {
            this._dispatchKey('Escape');
        };
        this.input.onGamepadCycleNext = () => this._dispatchKey('Tab');
        this.input.onGamepadCyclePrev = () => this._dispatchKey('Tab', { shiftKey: true });
    }

    /** Dispatch a synthetic keydown so DOM listeners react to gamepad nav. */
    _dispatchKey(key, opts = {}) {
        if (typeof window === 'undefined' || typeof KeyboardEvent === 'undefined') return;
        const ev = new KeyboardEvent('keydown', { key, bubbles: true, ...opts });
        (document.activeElement || document.body).dispatchEvent(ev);
    }

    /**
     * iter-14: write the touch-button scale to CSS custom properties on the
     * document root. Multiplies the base sizes (defined in styles.css under
     * `:root`) by the user's setting so the joystick + special button stay
     * proportional. No-op outside the browser (test env).
     */
    _applyTouchScale() {
        if (typeof document === 'undefined' || !document.documentElement) return;
        const scale = getTouchButtonScale(this.save);
        const base = 140;
        const knob = 58;
        const special = 96;
        const root = document.documentElement.style;
        root.setProperty('--touch-button-size', `${Math.round(base * scale)}px`);
        root.setProperty('--touch-knob-size', `${Math.round(knob * scale)}px`);
        root.setProperty('--touch-special-size', `${Math.round(special * scale)}px`);
    }

    /**
     * iter-14: install-prompt plumbing. Browsers fire `beforeinstallprompt`
     * once when the page meets the install criteria. We stash the deferred
     * event, surface a small in-page banner the first time, and remember the
     * user's choice (install / dismiss) so we never nag them again. We
     * intentionally avoid auto-prompting — Chrome ranks repeated prompts as
     * spam; the user has to click our button.
     */
    _wirePwaPrompt() {
        if (typeof window === 'undefined') return;
        if (this.save?.flags?.pwaPromptSeen) return;
        let deferred = null;
        const banner = document.getElementById('pwaInstallPrompt');
        const installBtn = document.getElementById('pwaInstallBtn');
        const dismissBtn = document.getElementById('pwaInstallDismiss');
        if (!banner || !installBtn || !dismissBtn) return;
        const markSeen = () => {
            this.save.flags = this.save.flags || {};
            this.save.flags.pwaPromptSeen = true;
            saveSave(this.save);
            banner.style.display = 'none';
        };
        window.addEventListener(
            'beforeinstallprompt',
            (e) => {
                e.preventDefault?.();
                deferred = e;
                banner.style.display = 'flex';
            },
            { once: true }
        );
        installBtn.addEventListener('click', async () => {
            if (deferred) {
                deferred.prompt?.();
                try {
                    await deferred.userChoice;
                } catch {
                    /* ignore */
                }
            }
            markSeen();
        });
        dismissBtn.addEventListener('click', markSeen);
    }

    _bindDomButtons() {
        const q = (id) => document.getElementById(id);
        q('btnStart')?.addEventListener('click', () => {
            this.audio.unlock();
            this.speedrunMode = false;
            this.dailyMode = false;
            this.start();
        });
        q('btnSpeedrun')?.addEventListener('click', () => {
            this.audio.unlock();
            this.startSpeedrun();
        });
        q('btnStage')?.addEventListener('click', () => this.openStagePicker());
        q('btnDaily')?.addEventListener('click', () => {
            this.audio.unlock();
            this.startDaily();
        });
        q('btnLeaderboard')?.addEventListener('click', () => this.openLeaderboard());
        q('btnSettings')?.addEventListener('click', () => this.openSettings());
        q('btnAchievements')?.addEventListener('click', () => this.openAchievements());
        q('btnViewStreak')?.addEventListener('click', () => this.openStreak());
        q('btnHowTo')?.addEventListener('click', () => this.openHowToPlay());
        // iter-15: replay-last-run + tutorial entry points on the start menu.
        q('btnReplay')?.addEventListener('click', () => this.openReplay());
        q('btnTutorial')?.addEventListener('click', () => this.startTutorialRun());
        q('btnRetry')?.addEventListener('click', () => {
            this.ui.hideGameOver();
            if (this.dailyMode) this.startDaily();
            else if (this.speedrunMode) this.startSpeedrun();
            else this.start();
        });
        q('btnMenu')?.addEventListener('click', () => {
            this.ui.hideGameOver();
            this.ui.showStart();
            this.state = GameState.MENU;
            this.speedrunMode = false;
        });
        q('btnResume')?.addEventListener('click', () => this.togglePause());
        q('btnQuit')?.addEventListener('click', () => {
            this.state = GameState.MENU;
            this.ui.hidePause();
            this.ui.showStart();
            cancelAnimationFrame(this.raf);
            this.audio.stopMusic();
        });
    }

    _resize() {
        const container = document.getElementById('gameContainer');
        if (!container) return;
        const w = Math.min(window.innerWidth - 16, CONFIG.CANVAS_WIDTH);
        const h = Math.min(window.innerHeight - 16, CONFIG.CANVAS_HEIGHT);
        const scale = Math.min(w / CONFIG.CANVAS_WIDTH, h / CONFIG.CANVAS_HEIGHT);
        container.style.width = `${CONFIG.CANVAS_WIDTH * scale}px`;
        container.style.height = `${CONFIG.CANVAS_HEIGHT * scale}px`;
    }

    start() {
        this.state = GameState.PLAYING;
        this.gameTime = 0;
        this.kills = 0;
        this.enemies = [];
        this.projectiles = [];
        this.enemyProjectiles = [];
        this.expOrbs = [];
        this.particles = [];
        this.floatingTexts = [];
        this.mines = [];
        this._bossesSpawned.clear();
        this._bossWarnedAt.clear();
        this._spawnAccumulator = 0;
        this._lastAnnouncedWave = null;
        this._nextSplitIdx = 0;
        // iter-16 bug-bash: clear stale pause-anchor from any prior paused run.
        this._pauseStartedAt = 0;

        // Re-derive the stage snapshot at run start. Daily mode pins the
        // stage from the challenge spec; otherwise we honour the saved
        // setting so a stage-picker change between runs takes effect here.
        const stageOverride =
            this.dailyMode && this.dailyChallenge ? this.dailyChallenge.stage : null;
        this.stageId = stageOverride || this.save?.settings?.stage || DEFAULT_STAGE_ID;
        this.stageWaves = getWavesFor(this.stageId);
        this.stageBosses = this._applyDailyBossOffset(getBossesFor(this.stageId));
        this.currentWave = this.stageWaves[0];
        // iter-14: cache the active stage's gameplay modifiers (player speed,
        // enemy HP, cold tick). Looked up here so the per-frame hot path
        // doesn't pay the indirection — `getStageModifiers` walks STAGES.
        this.stageMods = getStageModifiers(this.stageId);
        this._coldTickAccum = 0;

        // Reset per-run achievement state.
        this.achievements.resetRun();
        this.run = this.achievements.run;
        // Seed the fields the v2.4 achievements depend on. Kept here (rather
        // than in AchievementTracker) because these tie together weapons/ui.
        this.run.passivesPicked = 0;
        this.run.maxedWeaponCount = 0;
        this.run.evolvedBefore = {};
        this.run.realSecondsToVoidLord = Infinity;
        this.run.noHitBoss = false;
        this.run.tookAnyDamage = false; // flipped by Player.takeDamage; drives no-hit badge
        this.run.bossFightNoHit = new Set(); // ids of bosses whose fight we've tracked
        this._runStartWallClock = performance.now();
        this.speedrunSplits = [];

        this.player = new Player(
            (CONFIG.ARENA_WIDTH ?? CONFIG.CANVAS_WIDTH) / 2,
            (CONFIG.ARENA_HEIGHT ?? CONFIG.CANVAS_HEIGHT) / 2
        );
        this.player.weapons.push(new Weapon(WEAPONS.WHIP));
        // Snap camera to player at run start so the first frame doesn't show
        // a one-tick lerp from (0,0).
        this._updateCamera();

        this.ui.hideStart();
        this.ui.hideGameOver();
        this.ui.hideLevelUp();
        this.ui.hidePause();

        this.save.runs = (this.save.runs || 0) + 1;
        saveSave(this.save);

        // iter-15: spin up a fresh replay recorder for the new run, unless
        // we're playing back an existing replay. We use a deterministic seed
        // when one is available (speedrun / daily) so playback can recreate
        // identical spawns. Outside those modes, the recorder records the
        // wall-clock seed so replay still mostly reproduces the run, but
        // RNG-driven systems (Math.random) will diverge — documented in
        // docs/USER_GUIDE.md and the CHANGELOG.
        if (!this.replayActive) {
            const seed = this.speedrunRng?.state || Date.now() & 0xffffffff || 1;
            this.replayRecorder = new ReplayRecorder({
                seed,
                stage: this.stageId,
                difficulty: this.save.settings.difficulty || 'normal',
                dt: 1 / 60
            });
        } else {
            this.replayRecorder = null;
        }

        this.audio.unlock();
        this.audio.startMusic();

        this.lastTime = performance.now();
        this._scheduleFrame();
    }

    /**
     * Speedrun mode: deterministic seed, fixed boss timeline (the `spawnAt`
     * fields in data.js are already fixed), real-time millisecond clock,
     * separate leaderboard. We toggle `speedrunMode` before delegating to
     * `start()` so the spawn path can branch on the seeded RNG.
     */
    startSpeedrun() {
        this.speedrunMode = true;
        this.dailyMode = false;
        this.speedrunRng = new SeededRng(CONFIG.SPEEDRUN_SEED);
        this.speedrunStart = performance.now();
        this.start();
        this._announce('Speedrun started — deterministic seed.');
    }

    /**
     * Daily challenge: deterministic seed pinned to the UTC date, stage is
     * also pinned (rotates daily), and boss timings are nudged by a per-day
     * offset. Final entry lands in `daily-{date}-{stage}` rather than the
     * regular leaderboard so the global ranks aren't polluted.
     */
    startDaily() {
        this.dailyMode = true;
        this.speedrunMode = false;
        this.dailyChallenge = dailyChallenge();
        // Re-use SeededRng for spawn determinism — same plumbing as speedrun.
        this.speedrunRng = new SeededRng(this.dailyChallenge.seed);
        this.speedrunStart = performance.now();
        this.start();
        this._announce(`${_t('dailyChallenge')} ${this.dailyChallenge.date} — ${this.stageId}.`);
    }

    /** Apply the daily challenge's bossOffset to a `getBossesFor` result. */
    _applyDailyBossOffset(bosses) {
        if (!this.dailyMode || !this.dailyChallenge?.bossOffset) return bosses;
        const off = this.dailyChallenge.bossOffset;
        return bosses.map((b) => ({ ...b, spawnAt: Math.max(30, b.spawnAt + off) }));
    }

    /** Show the stage picker overlay; persists the choice via `save.settings.stage`. */
    openStagePicker() {
        this.ui.showStagePicker(this.stageId, (newStageId) => {
            this.stageId = newStageId;
            this.save.settings.stage = newStageId;
            saveSave(this.save);
            // Refresh the chip on the main menu Stage button.
            this.ui.updateStageChip(newStageId);
        });
    }

    openStreak() {
        this.ui.showStreak();
    }

    openHowToPlay() {
        this.ui.showHowToPlay(() => {
            this.save.flags = this.save.flags || {};
            this.save.flags.howToSeen = true;
            saveSave(this.save);
        });
    }

    /**
     * iter-15: surface a small "Try Tutorial" prompt above the start menu
     * on first launch. Yes/skip button writes `tutorialDone=true` either way
     * so the prompt never re-appears.
     */
    _offerTutorial() {
        if (typeof document === 'undefined') return;
        if (this.save?.flags?.tutorialDone) return;
        // Ensure the host overlay exists (created lazily so the DOM stays
        // unchanged for users who never trigger it).
        let overlay = document.getElementById('tutorialOffer');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'tutorialOffer';
            overlay.className = 'tutorial-offer';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-live', 'polite');
            overlay.style.display = 'none';
            const container = document.getElementById('gameContainer');
            container?.appendChild(overlay);
        }
        const dismiss = () => {
            overlay.style.display = 'none';
            this.save.flags = this.save.flags || {};
            this.save.flags.tutorialDone = true;
            saveSave(this.save);
        };
        const accept = () => {
            overlay.style.display = 'none';
            this.startTutorialRun();
        };
        overlay.innerHTML = `
            <div class="overlay-card tutorial-offer-card">
                <h2>${_t('tutorialOffer')}</h2>
                <div class="btn-row">
                    <button id="tutorialOfferYes" class="btn primary">${_t('tryTutorial')}</button>
                    <button id="tutorialOfferNo" class="btn ghost">${_t('skipTutorial')}</button>
                </div>
            </div>`;
        overlay.style.display = 'flex';
        overlay.querySelector('#tutorialOfferYes')?.addEventListener('click', accept);
        overlay.querySelector('#tutorialOfferNo')?.addEventListener('click', dismiss);
    }

    /**
     * Begin the tutorial: hand the menu off to a normal `start()` then flip
     * the tutorial state on. Esc skips at any point. Once the last step is
     * acknowledged we persist `tutorialDone=true`.
     */
    startTutorialRun() {
        this.tutorial = new TutorialState();
        this.tutorial.start();
        this.audio.unlock();
        this.speedrunMode = false;
        this.dailyMode = false;
        this.start();
        this._renderTutorialBanner();
        // Esc handler that explicitly skips the tutorial. Only fires while
        // the tutorial is active and a step is on screen — once the run is
        // over (success or skip) we detach the listener.
        if (typeof window !== 'undefined') {
            const onKey = (e) => {
                if (!this.tutorial.active) return;
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.tutorial.skip();
                    this._renderTutorialBanner();
                    this.save.flags = this.save.flags || {};
                    this.save.flags.tutorialDone = true;
                    saveSave(this.save);
                    window.removeEventListener('keydown', onKey, true);
                }
            };
            window.addEventListener('keydown', onKey, true);
            this._tutorialKeyHandler = onKey;
        }
    }

    /** Lazily mount + repaint the tutorial banner overlay. */
    _renderTutorialBanner() {
        if (typeof document === 'undefined') return;
        let banner = this._tutorialBanner;
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'tutorialBanner';
            banner.className = 'tutorial-banner';
            banner.setAttribute('aria-live', 'polite');
            const container = document.getElementById('gameContainer');
            container?.appendChild(banner);
            this._tutorialBanner = banner;
        }
        const prompt = this.tutorial.currentPrompt();
        if (!prompt) {
            banner.style.display = 'none';
            // If the tutorial just completed cleanly, persist the flag.
            if (this.tutorial.completed) {
                this.save.flags = this.save.flags || {};
                this.save.flags.tutorialDone = true;
                saveSave(this.save);
                this._announce(_t('tutorialDone'));
            }
            return;
        }
        banner.innerHTML = `
            <strong>${prompt.title}</strong>
            <span class="tutorial-body">${prompt.body}</span>
            <span class="tutorial-skip-hint">${_t('tutorialSkipHint')}</span>`;
        banner.style.display = 'block';
    }

    /**
     * iter-15: open the replay menu. Loads the most recent saved replay
     * (single-slot) and lets the player pick a 1× / 2× / 4× playback speed.
     * If no replay is saved, surface a friendly note.
     */
    openReplay() {
        const blob = loadReplay();
        this.ui.showReplayMenu(blob, (speed) => {
            if (!blob) return;
            this._beginReplay(blob, speed);
        });
    }

    /**
     * Engage replay playback: build a ReplayPlayer, start the run with the
     * persisted seed/stage/difficulty, and route input through the player.
     */
    _beginReplay(blob, speed) {
        this.replayPlayer = new ReplayPlayer(blob, { speed });
        this.replayActive = true;
        // Pin the same stage + difficulty so spawn determinism holds.
        if (blob.stage) this.save.settings.stage = blob.stage;
        if (blob.difficulty) this.save.settings.difficulty = blob.difficulty;
        // Reuse the speedrun seeding plumbing for spawn determinism. We
        // explicitly toggle off speedrunMode (no leaderboard write) but keep
        // the seeded RNG branch alive by setting `_replaySeededRng`.
        this.speedrunMode = false;
        this.dailyMode = false;
        this.speedrunRng = new SeededRng(blob.seed);
        // Use start() to do the rest of the setup (player, weapons, UI).
        this.start();
        // After start() resets state, force-feed the replay seed back in
        // because start() does not touch speedrunRng outside its modes.
        this.speedrunRng = new SeededRng(blob.seed);
        // Banner the user so they know inputs are disabled.
        this._announce(_t('replayPlaying'));
    }

    /**
     * End an active replay session — called when the player runs out of
     * frames or hits Esc / Quit. Returns the engine to the menu cleanly.
     */
    _endReplay() {
        this.replayActive = false;
        this.replayPlayer = null;
        this.state = GameState.MENU;
        cancelAnimationFrame(this.raf);
        this.audio.stopMusic();
        this.ui.hideGameOver();
        this.ui.showStart();
    }

    togglePause() {
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
            this.ui.showPause();
            this.audio.stopMusic();
            // iter-16 bug-bash: stamp the pause moment so we can subtract the
            // paused duration from the speedrun wall-clock when we resume.
            // Without this, leaderboard timeMs (and split realMs) silently
            // counted seconds spent in the pause menu — penalising players
            // who paused to read a level-up dialog or take a breath.
            this._pauseStartedAt = performance.now();
            // iter-15: tutorial step 5 waits for a pause toggle.
            if (this.tutorial?.active) {
                this.tutorial.notifyPause();
                this._renderTutorialBanner();
            }
        } else if (this.state === GameState.PAUSED) {
            this.state = GameState.PLAYING;
            this.ui.hidePause();
            this.audio.startMusic();
            this.lastTime = performance.now();
            // iter-16 bug-bash: shift the speedrun + run-start anchors forward
            // by however long we were paused so wall-clock readings exclude
            // pause time. Both anchors are floats, so a simple addition keeps
            // the existing `performance.now() - anchor` math correct.
            if (this._pauseStartedAt) {
                const paused = performance.now() - this._pauseStartedAt;
                if (paused > 0 && Number.isFinite(paused)) {
                    if (this.speedrunStart) this.speedrunStart += paused;
                    if (this._runStartWallClock) this._runStartWallClock += paused;
                }
                this._pauseStartedAt = 0;
            }
            this._scheduleFrame();
        }
    }

    gameOver() {
        this.state = GameState.GAMEOVER;
        cancelAnimationFrame(this.raf);
        this.audio.stopMusic();
        this.audio.death();
        // iter-19: long death-knell pattern. Fired once at the moment of
        // game over, before any leaderboard / replay finalisation work.
        this.haptics?.gameOver();
        // iter-15: snapshot + persist the recorded replay (single slot).
        // We do this before any of the leaderboard / achievement logic so a
        // crash inside those paths never loses the replay. Skipped during
        // playback (no recorder).
        if (this.replayRecorder) {
            try {
                this.replayRecorder.finalize({
                    kills: this.kills,
                    time: this.gameTime,
                    level: this.player?.level || 1
                });
                saveReplay(this.replayRecorder.serialize());
            } catch (err) {
                console.warn('[main] failed to persist replay', err);
            }
            this.replayRecorder = null;
        }

        // Update lifetime "unique builds" counter: a build = the sorted set
        // of weapon ids at death. If we haven't seen this combination before,
        // append it. Hard-cap the array at SEEN_BUILDS_CAP (1000) to keep the
        // save under a reasonable byte budget — older keys roll out FIFO.
        this.save.totals ??= { kills: 0, timePlayed: 0, runs: 0, bossKills: 0 };
        this.save.totals.seenBuilds ??= [];
        const buildKey = this.player.weapons
            .map((w) => w.id)
            .sort()
            .join('+');
        if (buildKey && !this.save.totals.seenBuilds.includes(buildKey)) {
            this.save.totals.seenBuilds.push(buildKey);
            const cap = CONFIG.SEEN_BUILDS_CAP || 1000;
            if (this.save.totals.seenBuilds.length > cap) {
                this.save.totals.seenBuilds.splice(0, this.save.totals.seenBuilds.length - cap);
            }
            this.save.totals.uniqueBuilds = this.save.totals.seenBuilds.length;
        }

        // Final achievement check.
        this.achievements.check(this);
        this._flushAchievementToasts();

        // Record run -------------------------------------------------------
        const weaponIds = this.player.weapons.map((w) => w.id);
        const entry = {
            kills: this.kills,
            timeSurvived: this.gameTime,
            level: this.player.level,
            date: Date.now(),
            weapons: weaponIds,
            // v2.6: stage tag so per-stage leaderboards split correctly.
            stage: this.stageId,
            // Authoritative: was the player hit even once across the whole
            // run? Falls back to the unhit-timer proxy for backwards compat
            // if a custom path bypassed Player.takeDamage.
            noHit: !this.run.tookAnyDamage
        };
        // Daily-mode runs go to the per-day slot rather than the global
        // leaderboard so they don't pollute the speedrun/normal pools.
        if (this.dailyMode && this.dailyChallenge) {
            saveDailyResult({
                ...entry,
                date: this.dailyChallenge.date,
                seed: this.dailyChallenge.seed,
                won: !!this.run.bossesDefeated?.void_lord
            });
        } else {
            recordHighScore(this.save, entry);
        }
        accumulateTotals(this.save, {
            kills: this.kills,
            gameTime: this.gameTime,
            bossKills: Object.keys(this.run.bossesDefeated).length
        });
        saveSave(this.save);

        // Speedrun: write to its own leaderboard, and store the split timeline
        // on the game so the UI can render it in the game-over screen.
        if (this.speedrunMode) {
            const sEntry = {
                timeMs: performance.now() - this.speedrunStart,
                splits: this.speedrunSplits,
                level: this.player.level,
                kills: this.kills,
                date: Date.now(),
                weapons: weaponIds,
                noHit: entry.noHit
            };
            const rank = recordSpeedrunScore(sEntry);
            this._speedrunRank = rank;
            this._speedrunEntry = sEntry;
        }

        this.ui.showGameOver(this);
    }

    openLeaderboard() {
        this.ui.showLeaderboard(this.save.highScores || [], loadSpeedrunScores(), () => {
            /* closed */
        });
    }

    // --- Frame loop -------------------------------------------------------
    _scheduleFrame() {
        this.raf = requestAnimationFrame((t) => this._frame(t));
    }

    _onVisibilityChange() {
        if (typeof document === 'undefined') return;
        if (document.hidden) {
            if (this.state === GameState.PLAYING) {
                this._hiddenPaused = true;
                this.state = GameState.PAUSED;
                this.ui.showPause();
                this.audio.stopMusic();
                // iter-16 bug-bash: track tab-hidden start so when the player
                // hits Resume the speedrun anchor shifts past the hidden
                // window. Mirrors togglePause()'s logic.
                this._pauseStartedAt = performance.now();
            }
        } else if (this._hiddenPaused && this.state === GameState.PAUSED) {
            // Don't auto-resume: leave the pause menu up so the player
            // explicitly opts back in. Just reset the clock to avoid a
            // massive dt when they do click Resume.
            this._hiddenPaused = false;
            this.lastTime = performance.now();
        }
    }

    _frame(now) {
        if (this.state !== GameState.PLAYING && this.state !== GameState.LEVEL_UP) return;
        // Clamp dt so that (a) a paused+resumed tab does not nuke the sim in
        // one step, and (b) frame-rate spikes don't create tunneling bugs.
        const dt = Math.min((now - this.lastTime) / 1000, CONFIG.DT_CLAMP);
        this.lastTime = now;
        // iter-14: pull the gamepad once per frame so axes + button edges
        // are fresh by the time update() reads `getMoveVector`. Safe no-op
        // when no pad is attached.
        this.input.pollGamepad?.();
        if (this.state === GameState.PLAYING) {
            this.update(dt);
        }
        // iter-20: pass the canvas viewport so EffectLayer can recycle
        // off-screen emoji rain drops without reaching back into the DOM.
        this.effects.update(dt, {
            w: this.canvas?.width || CONFIG.CANVAS_WIDTH,
            h: this.canvas?.height || CONFIG.CANVAS_HEIGHT
        });
        this.render(dt);
        this.fpsMeter.tick(dt);
        this.ui.setFps(this.fpsMeter.fps, this.save.settings.showFps);
        this._scheduleFrame();
    }

    update(dt) {
        this.gameTime += dt;

        const { hpMult, dmgMult, diff } = this._computeDifficultyMults();
        this.enemyDmgMult = dmgMult; // used by enemy projectile spawn

        this.currentWave = this._selectWave();

        // iter-15: replay playback drives input by replacing
        // `input.getMoveVector` with the recorded vector for the current
        // frame. We tick the player AFTER this swap; the swap is undone via
        // `input.getMoveVector = original` only when the replay finishes.
        if (this.replayActive && this.replayPlayer) {
            const v = this.replayPlayer.getMoveVector();
            this.input.getMoveVector = () => v;
            this.replayPlayer.tick();
            if (this.replayPlayer.done) {
                // Out of frames: end the replay before computing player update
                // so the run terminates cleanly on the next loop iteration.
                this._endReplay();
                return;
            }
        }

        // iter-15: snapshot the current input so the recorder + tutorial
        // both see the same vector this frame. Reading `getMoveVector`
        // twice would otherwise be cheap but inconsistent under replay.
        const moveSnapshot = this.input.getMoveVector();
        this._lastMoveVec = { x: moveSnapshot.x, y: moveSnapshot.y };
        if (this.replayRecorder && !this.replayActive) {
            this.replayRecorder.record(this._lastMoveVec);
        }
        // Tutorial state-machine tick. Cheap no-op unless active.
        if (this.tutorial?.active) {
            this.tutorial.tick(dt, this._lastMoveVec);
            this._renderTutorialBanner();
        }

        this.player.update(dt, this);
        if (this.player.dead) {
            this.gameOver();
            return;
        }
        // iter-14: stage modifiers — cold tick (no-op on forest/crypt).
        this._applyColdTick(dt);

        // iter-20: pacifist-provoked timer. Counts up while the player has
        // zero kills; a single kill breaks the streak and forfeits the
        // window for the rest of the run (we cap at 60 + 1 to avoid
        // unbounded float growth and to make the achievement check trivial).
        if (this.run) {
            if (this.kills === 0) {
                if ((this.run.pacifistTimer || 0) < 61) {
                    this.run.pacifistTimer = (this.run.pacifistTimer || 0) + dt;
                }
            }
        }

        // Spatial hash rebuild BEFORE anyone queries it.
        this.spatial.insertAll(this.enemies);

        this._updateEnemies(dt, hpMult, dmgMult);
        this._updateProjectiles(dt);
        this._updateEnemyProjectiles(dt);
        this._updateMines(dt);
        this._updateExpOrbs(dt);
        this._maybeTriggerLevelUp();
        this._updateParticlesAndText(dt);

        this._spawnLogic(dt, hpMult, dmgMult, diff.spawnMult);

        // Speedrun splits: push once per threshold as gameTime crosses them.
        if (this.speedrunMode) {
            const thresholds = CONFIG.SPEEDRUN_SPLITS;
            while (
                this._nextSplitIdx < thresholds.length &&
                this.gameTime >= thresholds[this._nextSplitIdx]
            ) {
                const mark = thresholds[this._nextSplitIdx];
                this.speedrunSplits.push({
                    mark,
                    realMs: performance.now() - this.speedrunStart
                });
                this._nextSplitIdx++;
            }
        }

        // Achievement ticks (cheap: most checks short-circuit).
        this.achievements.check(this);
        this._flushAchievementToasts();

        // HUD
        this.ui.updateHud(this);

        // Camera
        this.camera.update(dt, this.save.settings.screenShake);
        this._updateCamera();
    }

    /**
     * Position the camera so the player sits in the centre of the viewport,
     * clamped so the camera never shows arena out-of-bounds. Called every
     * frame from `update()` and once from `start()` to avoid a first-frame
     * snap. Stored on `this.camera.worldX/worldY` (top-left of the viewport
     * in arena coords). Render translates by `-worldX + shake.x` etc.
     */
    _updateCamera() {
        if (!this.player) return;
        const vw = CONFIG.CANVAS_WIDTH;
        const vh = CONFIG.CANVAS_HEIGHT;
        const aw = CONFIG.ARENA_WIDTH ?? vw;
        const ah = CONFIG.ARENA_HEIGHT ?? vh;
        let wx = this.player.x - vw / 2;
        let wy = this.player.y - vh / 2;
        if (wx < 0) wx = 0;
        if (wy < 0) wy = 0;
        if (wx > aw - vw) wx = aw - vw;
        if (wy > ah - vh) wy = ah - vh;
        this.camera.worldX = wx;
        this.camera.worldY = wy;
    }

    // --- update() helpers (kept close to the orchestrator for locality) ---
    _computeDifficultyMults() {
        const diff =
            Difficulty[(this.save.settings.difficulty || 'normal').toUpperCase()] ||
            Difficulty.NORMAL;
        const timeDiff = 1 + Math.floor(this.gameTime / 60) * 0.3;
        // Stage modifier folds into hpMult at the source so every spawn path
        // (waves, splitter children, bosses) inherits the +20% on tundra
        // without each call site reaching back into stages.js.
        const stageHpMult = this.stageMods?.enemyHpMult ?? 1;
        return {
            diff,
            hpMult: diff.hpMult * timeDiff * stageHpMult,
            dmgMult: diff.dmgMult * timeDiff
        };
    }

    /**
     * iter-14: tundra cold tick. Drains 1 HP every `coldTickInterval` seconds
     * (default 10) on stages that opt in. Skipped on stages with
     * `coldTickInterval == 0` (forest, crypt). Bypasses i-frames and armor on
     * purpose — it's an attrition mechanic, not damage — and never kills the
     * player outright (clamps at 1 HP) so death is always attributable to a
     * real hit.
     */
    _applyColdTick(dt) {
        const mods = this.stageMods;
        if (!mods || !mods.coldTickInterval) return;
        if (!this.player || this.player.dead) return;
        this._coldTickAccum += dt;
        while (this._coldTickAccum >= mods.coldTickInterval) {
            this._coldTickAccum -= mods.coldTickInterval;
            const dmg = mods.coldTickDamage || 1;
            // Drain HP without going through takeDamage so we don't refresh
            // i-frames or trigger the no-hit invalidation (cold is ambient).
            const next = Math.max(1, this.player.hp - dmg);
            if (next < this.player.hp) {
                this.player.hp = next;
                this.createFloatingText(`-${dmg}❄`, this.player.x, this.player.y - 36, '#88ccff');
            }
        }
    }

    _updateEnemies(dt, hpMult, dmgMult) {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const e = this.enemies[i];
            e.update(dt, this);

            const dx = e.x - this.player.x;
            const dy = e.y - this.player.y;
            const d = Math.hypot(dx, dy);
            if (d < e.size + this.player.size && !this.player.invincible) {
                this.player.takeDamage(e.damage, this);
                this.createFloatingText(
                    Math.round(e.damage),
                    this.player.x,
                    this.player.y - 30,
                    '#ff3333'
                );
            }

            if (e.hp <= 0) {
                this._onEnemyKilled(e, hpMult, dmgMult);
                this.enemies.splice(i, 1);
                continue;
            }

            if (d > CONFIG.DESPAWN_RADIUS && !e.boss) {
                this.enemies.splice(i, 1);
            }
        }
    }

    _onEnemyKilled(e, hpMult, dmgMult) {
        this.kills++;
        this.createParticles(e.x, e.y, e.color, e.boss ? 40 : 8);
        this.effects.hit(e.x, e.y, this._rgbFromHex(e.color));
        this.dropExp(e.x, e.y, e.expValue);
        if (e.boss) {
            this.shake(0.5);
            this.audio.explosion();
            this.achievements.onBossDefeated(e.id);
            this._announce(`${e.id.replace('_', ' ')} defeated`);
            // Mark no-hit-boss if the player's unhit streak is longer than
            // the fight itself. We use the unhit timer (seconds without
            // damage) as a cheap proxy; any damage during the fight resets it.
            if (this.player.unhitTimer >= 8) this.run.noHitBoss = true;
            // Speedrun: record wall-clock seconds until each boss.
            if (e.id === 'void_lord') {
                this.run.realSecondsToVoidLord =
                    (performance.now() - this._runStartWallClock) / 1000;
            }
            // iter-20: hidden Speedrunner Plus achievement. Any boss kill in
            // under 5 minutes wall-clock counts. The pause anchor inside
            // `togglePause` keeps `_runStartWallClock` honest, so a player
            // can't pad the timer by sitting in the pause menu.
            if (this._runStartWallClock) {
                const realSec = (performance.now() - this._runStartWallClock) / 1000;
                if (realSec < 300) this.run.fastBossClear = true;
            }
        }
        if (e.splitter && e.type.splitInto) {
            const childDef = findEnemyDef(e.type.splitInto);
            if (childDef) {
                const n = e.type.splitCount || 2;
                for (let k = 0; k < n; k++) {
                    const a = (k / n) * Math.PI * 2;
                    this.enemies.push(
                        new Enemy(
                            e.x + Math.cos(a) * 14,
                            e.y + Math.sin(a) * 14,
                            childDef,
                            hpMult,
                            dmgMult
                        )
                    );
                }
            }
        }
        this.audio.hit();
    }

    _updateProjectiles(dt) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.update(dt, this);
            if (p.shouldRemove) {
                this.projectiles.splice(i, 1);
                continue;
            }

            const range = p.size + 32;
            for (const enemy of this.spatial.queryRect(p.x, p.y, range)) {
                if (p.hitEnemies.has(enemy)) continue;
                const d = Math.hypot(p.x - enemy.x, p.y - enemy.y);
                if (d < enemy.size + p.size) {
                    let dmg = p.damage;
                    const chance = this.player.getCritChance();
                    const crit = chance > 0 && Math.random() < chance;
                    if (crit) dmg *= 2;
                    enemy.takeDamage(dmg);
                    p.hitEnemies.add(enemy);
                    if (enemy.hp > 0) {
                        this.createFloatingText(
                            Math.round(dmg),
                            enemy.x,
                            enemy.y - 20,
                            crit ? '#ffee44' : '#fff',
                            { crit }
                        );
                    }
                    // iter-15 polish: brief red flash on critical hits, opt-out
                    // via Settings → criticalFlash. Suppressed when reduced
                    // motion is on so it never overrides accessibility.
                    if (
                        crit &&
                        this.save.settings.criticalFlash !== false &&
                        !this.save.settings.reducedMotion
                    ) {
                        this.effects.criticalHit();
                    }
                    this.effects.hit(enemy.x, enemy.y);
                    if (!p.piercing) {
                        p._onEnd(this);
                        p.shouldRemove = true;
                        break;
                    }
                }
            }
        }
    }

    _updateEnemyProjectiles(dt) {
        for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
            const ep = this.enemyProjectiles[i];
            ep.update(dt, this);
            if (ep.shouldRemove) this.enemyProjectiles.splice(i, 1);
        }
    }

    _updateMines(dt) {
        for (let i = this.mines.length - 1; i >= 0; i--) {
            const m = this.mines[i];
            m.update(dt, this);
            if (m.shouldRemove) this.mines.splice(i, 1);
        }
    }

    _updateExpOrbs(dt) {
        // iter-15: snapshot the orb-collected counter before the per-frame
        // update so we can fire `tutorial.notifyOrbPickup()` on the rising
        // edge. ExpOrb.update bumps `game.run.orbsCollected`; comparing the
        // two values is cheaper than wrapping ExpOrb.
        const before = this.run?.orbsCollected || 0;
        for (let i = this.expOrbs.length - 1; i >= 0; i--) {
            const o = this.expOrbs[i];
            o.update(dt, this);
            if (o.shouldRemove) this.expOrbs.splice(i, 1);
        }
        if (this.tutorial?.active) {
            const after = this.run?.orbsCollected || 0;
            for (let k = 0; k < after - before; k++) {
                this.tutorial.notifyOrbPickup();
            }
            if (after !== before) this._renderTutorialBanner();
        }
    }

    _maybeTriggerLevelUp() {
        if (this._pendingLevelUps > 0 && this.state === GameState.PLAYING) {
            this._pendingLevelUps--;
            this.state = GameState.LEVEL_UP;
            this.audio.levelUp();
            this.effects.levelUp(this.player.x, this.player.y);
            // iter-19: ascending-ramp vibration. Distinct shape from the
            // hurt single-pulse and the boss triple so the player can
            // tell what just happened from the haptic alone.
            this.haptics?.levelUp();
            this._announce(`Level ${this.player.level}! Choose an upgrade.`);
            // iter-15: notify the tutorial state machine — its "level up"
            // step waits for exactly this event.
            if (this.tutorial?.active) {
                this.tutorial.notifyLevelUp();
                this._renderTutorialBanner();
            }
            this.ui.showLevelUp(this.player, (choice) => this._applyUpgrade(choice));
        }
    }

    _updateParticlesAndText(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const part = this.particles[i];
            part.update(dt);
            if (part.life <= 0) {
                this.pools.particle.release(part);
                this.particles.splice(i, 1);
            }
        }
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.update(dt);
            if (ft.life <= 0) {
                this.pools.floatingText.release(ft);
                this.floatingTexts.splice(i, 1);
            }
        }
    }

    /** Broadcast a short message to screen readers via the a11y live region. */
    _announce(msg) {
        if (typeof document === 'undefined') return;
        const el = document.getElementById('a11yLiveRegion');
        if (!el) return;
        // Toggle textContent to force SR re-announce if the message repeats.
        el.textContent = '';
        // Microtask flush before writing so ATs pick up the change.
        Promise.resolve().then(() => {
            el.textContent = msg;
        });
    }

    _applyUpgrade(choice) {
        if (choice) {
            if (choice.type === 'weapon') {
                const existing = this.player.weapons.find((w) => w.id === choice.data.id);
                if (existing) {
                    const prevLvl = existing.level;
                    existing.levelUp();
                    if (existing.level >= CONFIG.WEAPON_MAX_LEVEL) {
                        this.achievements.onWeaponMaxed();
                        // Track how many distinct weapons have been maxed this run.
                        if (prevLvl < CONFIG.WEAPON_MAX_LEVEL) {
                            this.run.maxedWeaponCount = (this.run.maxedWeaponCount || 0) + 1;
                        }
                    }
                    // Early-Evolve achievement: fire when the weapon actually
                    // crosses into its evolution tier before 7:00.
                    if (
                        existing.def.evolveLevel &&
                        prevLvl < existing.def.evolveLevel &&
                        existing.level >= existing.def.evolveLevel &&
                        this.gameTime < CONFIG.EARLY_EVOLVE_THRESHOLD
                    ) {
                        this.run.evolvedBefore = this.run.evolvedBefore || {};
                        this.run.evolvedBefore.sevenMin = true;
                    }
                } else {
                    this.player.weapons.push(new Weapon(choice.data));
                }
            } else {
                this.player.passives[choice.data.id] ??= { def: choice.data, count: 0 };
                if (this.player.passives[choice.data.id].count < CONFIG.PASSIVE_MAX_STACK) {
                    this.player.passives[choice.data.id].count++;
                    this.player.recalculateStats();
                    this.run.passivesPicked = (this.run.passivesPicked || 0) + 1;
                }
            }
        }
        this.ui.hideLevelUp();
        this.state = GameState.PLAYING;
        this.lastTime = performance.now();
    }

    _selectWave() {
        const t = this.gameTime;
        const list = this.stageWaves && this.stageWaves.length ? this.stageWaves : WAVES;
        let match = list[list.length - 1];
        for (const w of list) {
            if (t >= w.from && t < w.to) {
                match = w;
                break;
            }
        }
        if (this._lastAnnouncedWave !== match.label) {
            this._lastAnnouncedWave = match.label;
        }
        return match;
    }

    _spawnLogic(dt, hpMult, dmgMult, diffSpawnMult) {
        const wave = this.currentWave;
        const waveMult = wave.spawnMult || 1;
        const maxEnemies = Math.min(CONFIG.MAX_ENEMIES, 20 + Math.floor(this.gameTime / 10));
        const interval = Math.max(0.2, 1.2 - this.gameTime / 200) / (diffSpawnMult * waveMult);
        this._spawnAccumulator += dt;

        while (this._spawnAccumulator >= interval && this.enemies.length < maxEnemies) {
            this._spawnAccumulator -= interval;
            this._spawnOne(wave.pool, hpMult, dmgMult);
        }

        // Boss triggers (warning 5s before). Use the per-stage boss list so
        // stage-specific timing overrides (e.g. crypt's earlier Reaper) fire.
        const bossList =
            this.stageBosses && this.stageBosses.length ? this.stageBosses : Object.values(BOSSES);
        for (const boss of bossList) {
            const warnAt = boss.spawnAt - 5;
            if (this.gameTime >= warnAt && !this._bossWarnedAt.has(boss.id)) {
                this._bossWarnedAt.add(boss.id);
                this.audio.bossWarn();
            }
            if (this.gameTime >= boss.spawnAt && !this._bossesSpawned.has(boss.id)) {
                this._bossesSpawned.add(boss.id);
                this._spawnBoss(boss, hpMult, dmgMult);
            }
        }
    }

    _spawnOne(pool, hpMult, dmgMult) {
        // Speedrun + Daily both want determinism; either uses speedrunRng.
        const rng =
            (this.speedrunMode || this.dailyMode) && this.speedrunRng ? this.speedrunRng : null;
        const frnd = rng ? () => rng.nextFloat() : Math.random;
        // pickWeighted honours the active stage's poolOverrides; with default
        // stage (forest) all weights are 1 so it degrades to a uniform pick.
        const pick =
            pickWeighted(pool, this.stageId, frnd) || pool[Math.floor(frnd() * pool.length)];
        const type = findEnemyDef(pick) || ENEMIES.BAT;
        const angle = frnd() * Math.PI * 2;
        const dist = CONFIG.SPAWN_RADIUS + frnd() * 120;
        const x = this.player.x + Math.cos(angle) * dist;
        const y = this.player.y + Math.sin(angle) * dist;
        this.enemies.push(new Enemy(x, y, type, hpMult, dmgMult));
    }

    _spawnBoss(bossDef, hpMult, dmgMult) {
        const angle = Math.random() * Math.PI * 2;
        const d = CONFIG.SPAWN_RADIUS * 0.8;
        const x = this.player.x + Math.cos(angle) * d;
        const y = this.player.y + Math.sin(angle) * d;
        this.enemies.push(new Enemy(x, y, bossDef, hpMult, dmgMult));
        this.ui.showBossBanner();
        this.audio.bossSpawn();
        this.effects.bossSpawn();
        // iter-15 polish: bump boss-spawn camera shake by +50% (0.8 → 1.2).
        // The reduced-motion gate inside `shake()` still applies so
        // accessibility users are unaffected.
        this.shake(1.2);
        // iter-19: triple-pulse vibration so the player feels the warning
        // even with audio off / sleeve-pocket play.
        this.haptics?.bossSpawn();
        this._announce(`Boss incoming: ${bossDef.name || bossDef.id}`);
    }

    _flushAchievementToasts() {
        const toasts = this.achievements.takeToasts();
        for (const ach of toasts) {
            this.ui.showAchievementToast(ach);
            this.audio.achievement();
            this.effects.achievement();
            this._announce(`Achievement unlocked: ${ach.name}. ${ach.description}`);
            // iter-20: harmless emoji-rain celebration the first time the
            // player crosses the 15-minute Survivor threshold. We trigger
            // off the achievement-just-unlocked event rather than polling
            // the save flag so a returning player who already has the
            // achievement doesn't get rained on every run.
            if (ach.id === 'survive_15min') {
                const w = this.canvas?.width || CONFIG.CANVAS_WIDTH;
                const h = this.canvas?.height || CONFIG.CANVAS_HEIGHT;
                this.effects.celebrate(w, h);
            }
        }
    }

    _rgbFromHex(hex) {
        // Accept '#rrggbb' and return 'r,g,b' for effects layer.
        if (!hex || hex[0] !== '#') return '255,255,255';
        const n = parseInt(hex.slice(1), 16);
        return `${(n >> 16) & 0xff},${(n >> 8) & 0xff},${n & 0xff}`;
    }

    // --- Helpers ----------------------------------------------------------
    dropExp(x, y, amount) {
        this.expOrbs.push(new ExpOrb(x, y, amount));
    }
    createParticles(x, y, color, n) {
        if (this.save.settings.reducedMotion) n = Math.min(n, 2);
        for (let i = 0; i < n; i++) {
            this.particles.push(this.pools.particle.acquire(x, y, color));
        }
    }
    createFloatingText(text, x, y, color, opts) {
        if (this.save.settings.reducedMotion) return;
        // damageNumbers toggle (default on). Backwards-compatible: an older
        // save without the field still gets numbers because we treat
        // `undefined` as on.
        if (this.save.settings.damageNumbers === false) return;
        this.floatingTexts.push(this.pools.floatingText.acquire(text, x, y, color, opts || {}));
    }
    shake(amount) {
        // Reduced-motion users get no camera shake even if the setting is on.
        const prm =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (this.save.settings.screenShake && !prm && !this.save.settings.reducedMotion) {
            this.camera.shake(amount);
        }
    }

    // called by Player via takeDamage
    onPlayerHurt(_amount) {
        this.audio.damage();
        this.shake(0.25);
        // iter-19: short single-pulse vibration. No-ops on platforms without
        // navigator.vibrate or when the user has switched it off.
        this.haptics?.hurt();
    }

    onBossAbility(boss) {
        if (boss.ability === 'summon') {
            const childDef = findEnemyDef('skeleton');
            for (let i = 0; i < 3; i++) {
                const a = Math.random() * Math.PI * 2;
                const r = 80;
                this.enemies.push(
                    new Enemy(boss.x + Math.cos(a) * r, boss.y + Math.sin(a) * r, childDef, 2, 1.5)
                );
            }
            this.createParticles(boss.x, boss.y, '#aa33ff', 20);
        } else if (boss.ability === 'charge') {
            const dx = this.player.x - boss.x;
            const dy = this.player.y - boss.y;
            const d = Math.hypot(dx, dy) || 1;
            boss.x += (dx / d) * 120;
            boss.y += (dy / d) * 120;
            this.createParticles(boss.x, boss.y, '#ff3366', 15);
        }
    }

    // --- Rendering --------------------------------------------------------
    render(_dt) {
        const ctx = this.ctx;
        // 1) Background fill in screen space (no transform). This guarantees
        //    the viewport is always cleared even when the camera sits flush
        //    against an arena edge and a sliver would otherwise be unfilled.
        const bg = getBackgroundFor(this.stageId);
        ctx.fillStyle = bg.fill;
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

        // 2) World-space pass: translate by -camera + shake so entity coords
        //    (which live in arena space) project into the viewport.
        ctx.save();
        ctx.translate(-this.camera.worldX + this.camera.x, -this.camera.worldY + this.camera.y);

        this._drawGrid();

        for (const o of this.expOrbs) o.render(ctx);
        for (const m of this.mines) m.render(ctx);
        this._renderEnemies(ctx);
        if (this.player) {
            this.player.render(ctx);
            // Orbit shards live on the weapon, so render per-weapon extras here.
            for (const w of this.player.weapons) w.renderExtras?.(ctx);
        }
        for (const p of this.projectiles) p.render(ctx);
        for (const ep of this.enemyProjectiles) ep.render(ctx);
        for (const p of this.particles) p.render(ctx);
        for (const t of this.floatingTexts) t.render(ctx);

        ctx.restore();

        // 3) Screen-space effects (flash, pulses, vignette) on top — these
        //    render relative to the viewport, not the world.
        this.effects.render(ctx, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    }

    /**
     * Draw enemies using the cached offscreen sprite when available. Bosses
     * and flashing enemies still go through the full per-frame path because
     * their visuals include HP bars and hit-flash highlights that the cached
     * bitmap cannot reproduce. This cuts per-enemy drawing calls from ~4
     * (gradient + two arcs + fill) to a single drawImage for the common case.
     */
    _renderEnemies(ctx) {
        for (const e of this.enemies) {
            if (e.boss || e.flashTimer > 0 || e.shielded) {
                e.render(ctx);
                continue;
            }
            const sprite = getEnemySprite(e.type, e.size);
            if (sprite) {
                ctx.drawImage(sprite, e.x - sprite.width / 2, e.y - sprite.height / 2);
                // Cheap HP bar (cached sprite can't reflect current HP).
                const pct = Math.max(0, e.hp / e.maxHp);
                if (pct < 1) {
                    const w = 30;
                    ctx.fillStyle = '#222';
                    ctx.fillRect(e.x - w / 2, e.y - e.size - 10, w, 3);
                    ctx.fillStyle = pct > 0.5 ? '#44ff44' : pct > 0.25 ? '#ffaa33' : '#ff4444';
                    ctx.fillRect(e.x - w / 2, e.y - e.size - 10, w * pct, 3);
                }
            } else {
                e.render(ctx);
            }
        }
    }

    /**
     * Draws a faint grid in arena/world space. Because we're inside the
     * world-space transform (-camera + shake) we can just iterate from
     * the first grid line >= camera.worldX to the last one <= worldX+vw,
     * which auto-clips to the visible region without any per-frame guess.
     */
    _drawGrid() {
        const ctx = this.ctx;
        const alpha = (getBackgroundFor(this.stageId).gridAlpha ?? 0.04).toFixed(3);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1;
        const size = CONFIG.GRID_SIZE;
        const cx = this.camera.worldX;
        const cy = this.camera.worldY;
        const vw = CONFIG.CANVAS_WIDTH;
        const vh = CONFIG.CANVAS_HEIGHT;
        const startX = Math.floor(cx / size) * size;
        const startY = Math.floor(cy / size) * size;
        for (let x = startX; x <= cx + vw; x += size) {
            ctx.beginPath();
            ctx.moveTo(x, cy);
            ctx.lineTo(x, cy + vh);
            ctx.stroke();
        }
        for (let y = startY; y <= cy + vh; y += size) {
            ctx.beginPath();
            ctx.moveTo(cx, y);
            ctx.lineTo(cx + vw, y);
            ctx.stroke();
        }
    }

    openAchievements() {
        this.ui.showAchievements(this.save.achievements || {}, () => {
            /* closed */
        });
    }

    // --- Settings ---------------------------------------------------------
    openSettings() {
        this.ui.showSettings(
            this.save.settings,
            (key, value) => {
                this.save.settings[key] = value;
                saveSave(this.save);
                if (key === 'masterVolume' || key === 'sfxVolume' || key === 'musicVolume')
                    this.audio.applyVolumes();
                if (key === 'musicEnabled') this.audio.toggleMusic(value);
                // iter-14: re-apply CSS custom properties when the touch
                // button scale changes so the player sees the buttons
                // resize live without reloading the page.
                if (key === 'touchButtonScale') this._applyTouchScale();
            },
            () => {
                /* closed */
            },
            () => {
                resetSave();
                this.save = loadSave();
                this.achievements = new AchievementTracker(this.save);
                this.run = this.achievements.run;
                this.audio.applyVolumes();
                this.ui.hideSettings();
            },
            {
                // iter-19: only render the vibration row when the host
                // actually has the API; the UI hides it otherwise so it
                // isn't a dead control.
                vibrationSupported: this.haptics?.isSupported() ?? false,
                onRemap: () => this.openRemap()
            }
        );
    }

    // --- Keymap remap -----------------------------------------------------
    /**
     * iter-19: open the Customize Controls dialog. Saves the new keymap to
     * localStorage and re-arms the input manager so the rebind takes effect
     * on the next keystroke.
     */
    openRemap() {
        this.ui.showRemap(
            this.keymap,
            (next) => {
                this.keymap = next;
                this.input.setKeymap(next);
                saveKeymap(next);
            },
            () => {
                /* closed; settings panel stays open behind */
            }
        );
    }
}

// Level-up batching. Called from gainExp via Player; we patch Player here to notify.
const origGainExp = Player.prototype.gainExp;
Player.prototype.gainExp = function (amount) {
    const ups = origGainExp.call(this, amount);
    if (ups.length && window.__vsGame) {
        window.__vsGame._pendingLevelUps = (window.__vsGame._pendingLevelUps || 0) + ups.length;
    }
    return ups;
};

// Bootstrap
export function boot() {
    const g = new Game();
    window.__vsGame = g;
    // Dev-only debug hooks. Gated on hostname so they never fire on the
    // GitHub Pages build; the smoke harness loads from localhost so it
    // does. Used by scripts/runtime-smoke.js to fast-forward to bosses,
    // force a level-up, and trigger game-over without having to actually
    // play 5 minutes per scene.
    const isDev =
        typeof location !== 'undefined' &&
        (location.hostname === 'localhost' ||
            location.hostname === '127.0.0.1' ||
            location.hostname === '');
    if (isDev) {
        window.__SURV_DEBUG__ = {
            /** Fast-forward simulated game time. Triggers everything that's
             * gated on `gameTime`: wave director, boss spawns, difficulty
             * scaling. Spawn accumulator follows along so a chunk of enemies
             * appears proportionate to the elapsed window. */
            advance(seconds = 30) {
                if (!g.player || g.state !== 'playing') return false;
                g.gameTime += seconds;
                // Keep the spawn director from emptying its bag in one frame.
                g._spawnAccumulator = 0;
                return true;
            },
            /** Push enough XP that the next update() flushes one level-up. */
            grantLevel(n = 1) {
                if (!g.player) return false;
                for (let i = 0; i < n; i++) g.player.gainExp(g.player.expToNext + 1);
                return true;
            },
            /** Knock the player to 1 HP so the next enemy hit ends the run. */
            killPlayer() {
                if (!g.player) return false;
                g.player.hp = 0;
                g.player.dead = true;
                return true;
            },
            /** Spawn the named boss right now (skipping its scheduled time). */
            spawnBoss(id) {
                const def = Object.values(BOSSES).find((b) => b.id === id);
                if (!def) return false;
                g._spawnBoss(def, 1, 1);
                g._bossesSpawned.add(def.id);
                return true;
            }
        };
    }
    return g;
}

// Re-export for any external script that needs the catalogue.
export { ACHIEVEMENTS, WAVES };
