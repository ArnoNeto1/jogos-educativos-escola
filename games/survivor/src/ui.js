/**
 * @module ui
 * @description All DOM-side glue — HUD, menus, settings panel, achievement
 * gallery, level-up overlay. Intentionally decoupled from the render loop so
 * UI state mutations always funnel through these helpers (easier to audit,
 * easier to swap renderers later).
 *
 * Dependencies: `./data.js`, `./config.js`, `./i18n.js`.
 *
 * Exports:
 *   - class UI               cached element references + render helpers
 *   - totalAchievements()    convenience for tests / badges
 */

import { ACHIEVEMENTS, PASSIVES, WEAPONS } from './data.js';
import { CONFIG } from './config.js';
import { t, setLocale, availableLocales } from './i18n.js';
import { getStage, listStages } from './stages.js';
import { buildShareText, dailyStreakSummary, loadDailyHistory } from './daily.js';
import {
    DEFAULT_KEYMAP,
    KEYMAP_ACTIONS,
    bindKey,
    cloneKeymap,
    detectConflicts,
    keyLabel,
    normaliseKey
} from './keymap.js';

export class UI {
    constructor(game) {
        this.game = game;
        this.els = {};
        this._cache();
    }

    _cache() {
        const ids = [
            'hp',
            'maxHp',
            'hpBar',
            'level',
            'expBar',
            'time',
            'kills',
            'weaponIcons',
            'startScreen',
            'gameOver',
            'finalTime',
            'finalKills',
            'finalLevel',
            'levelUpMenu',
            'upgradeOptions',
            'pauseMenu',
            'settingsMenu',
            'fpsCounter',
            'bossBanner',
            'highScore',
            'passiveIcons',
            'achievementToasts',
            'highScoreList',
            'waveLabel',
            'achievementsScreen',
            'leaderboardScreen',
            'stagePickerScreen',
            'streakScreen',
            'helpScreen',
            'howToPlayScreen',
            'btnStageChip'
        ];
        for (const id of ids) this.els[id] = document.getElementById(id);
        // iter-20: harden ARIA on the dynamic overlay hosts. The static
        // overlays in index.html (`startScreen`, `levelUpMenu`, `pauseMenu`,
        // `gameOver`) already declare role+aria-modal at the markup level;
        // these are the dynamically-populated dialogs that share the same
        // `.overlay` class and need the same announcement contract for
        // assistive tech to pick them up consistently.
        for (const id of [
            'achievementsScreen',
            'leaderboardScreen',
            'stagePickerScreen',
            'streakScreen',
            'helpScreen',
            'howToPlayScreen',
            'settingsMenu'
        ]) {
            const el = this.els[id];
            if (!el || typeof el.setAttribute !== 'function') continue;
            // Some test stubs don't implement hasAttribute — fall back to
            // unconditional set in that case, which is still idempotent.
            const hasAttr = typeof el.hasAttribute === 'function';
            if (!hasAttr || !el.hasAttribute('role')) el.setAttribute('role', 'dialog');
            if (!hasAttr || !el.hasAttribute('aria-modal')) el.setAttribute('aria-modal', 'true');
        }
    }

    /**
     * Full-screen leaderboard dialog. Renders both regular + speedrun runs in
     * separate scrollable sections, with export/import for sharing. This is
     * the main-menu entry point; the game-over summary still shows a compact
     * top-10 list inside the run recap.
     */
    /**
     * Render the stage picker overlay. Each stage card shows the icon, name
     * and tagline; the active one gets the `active` class so users see what
     * they've selected. Selecting a card persists via the supplied callback
     * and closes the dialog.
     */
    showStagePicker(currentId, onPick) {
        const m = this.els.stagePickerScreen;
        if (!m) return;
        const stages = listStages();
        m.innerHTML = `
            <div class="overlay-card stage-picker-card">
                <h2>${t('chooseStage')}</h2>
                <div class="stage-grid">
                    ${stages
                        .map(
                            (s) => `
                            <button class="stage-card ${s.id === currentId ? 'active' : ''}" data-stage="${s.id}">
                                <div class="stage-icon">${s.icon}</div>
                                <div class="stage-name">${s.name}</div>
                                <div class="stage-desc">${s.description}</div>
                            </button>`
                        )
                        .join('')}
                </div>
                <div class="btn-row">
                    <button id="stageClose" class="btn primary">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
        };
        m.querySelector('#stageClose')?.addEventListener('click', close);
        m.querySelectorAll('.stage-card').forEach((btn) =>
            btn.addEventListener('click', () => {
                const id = btn.dataset.stage;
                onPick && onPick(id);
                close();
            })
        );
    }

    hideStagePicker() {
        if (this.els.stagePickerScreen) this.els.stagePickerScreen.style.display = 'none';
    }

    /**
     * Refresh the stage chip rendered inside the main-menu Stage button so the
     * player can see at a glance which map a "Start Run" press would launch.
     * Cheap to call repeatedly — just innerText + className updates.
     */
    updateStageChip(stageId) {
        if (!this.els.btnStageChip) return;
        const s = getStage(stageId);
        // The chip carries the stage icon + name; we keep it short so the
        // button stays one line at the default font size.
        this.els.btnStageChip.textContent = `${s.icon} ${s.name}`;
        this.els.btnStageChip.dataset.stage = s.id;
    }

    /**
     * Render the daily-streak overlay: a 14-day calendar showing which days
     * the player has logged a daily run, plus current and best streak chips.
     * Read-only (no callbacks beyond close); the daily run itself starts via
     * the regular Daily Challenge button.
     */
    showStreak(onClose) {
        const m = this.els.streakScreen;
        if (!m) return;
        const summary = dailyStreakSummary(loadDailyHistory());
        // Render the 14 cells oldest -> newest so the row reads left-to-right
        // like a calendar; reverse the summary array (which is newest-first).
        const cells = summary.days.slice().reverse();
        const cellHtml = cells
            .map((d) => {
                const cls = d.played
                    ? d.won
                        ? 'streak-cell won'
                        : 'streak-cell played'
                    : 'streak-cell missed';
                const tip = d.played
                    ? `${d.date} · ${Math.floor(d.timeSurvived / 60)}:${String(Math.floor(d.timeSurvived % 60)).padStart(2, '0')} · ${d.kills} kills`
                    : `${d.date} — no run`;
                const day = d.date.slice(8);
                return `<div class="${cls}" title="${tip}" aria-label="${tip}">${day}</div>`;
            })
            .join('');
        const empty =
            summary.current === 0 && summary.best === 0
                ? `<div class="hs-empty">${t('noStreakYet')}</div>`
                : '';
        m.innerHTML = `
            <div class="overlay-card streak-card">
                <h2>${t('dailyStreak')}</h2>
                <div class="streak-stats">
                    <div class="streak-pill"><span>${t('currentStreak')}</span><strong>${summary.current}</strong></div>
                    <div class="streak-pill"><span>${t('bestStreak')}</span><strong>${summary.best}</strong></div>
                </div>
                <div class="streak-label">${t('last14Days')}</div>
                <div class="streak-grid" role="list">${cellHtml}</div>
                ${empty}
                <div class="btn-row">
                    <button id="streakClose" class="btn primary">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
            onClose && onClose();
        };
        m.querySelector('#streakClose')?.addEventListener('click', close);
    }

    hideStreak() {
        if (this.els.streakScreen) this.els.streakScreen.style.display = 'none';
    }

    /** Keyboard-shortcuts help overlay. Mirrors the H hotkey. */
    showHelp(onClose) {
        const m = this.els.helpScreen;
        if (!m) return;
        const rows = [
            ['WASD / ←↑↓→', t('helpKeyMove')],
            ['P / Esc', t('helpKeyPause')],
            ['M', t('helpKeyMute')],
            ['H / ?', t('helpKeyHelp')],
            ['L', t('helpKeyLanguage')],
            [',', t('helpKeySettings')],
            ['Enter / Space', t('helpKeyConfirm')]
        ];
        m.innerHTML = `
            <div class="overlay-card help-card">
                <h2>${t('helpTitle')}</h2>
                <div class="help-rows">
                    ${rows
                        .map(
                            ([k, v]) =>
                                `<div class="help-row"><kbd>${k}</kbd><span>${v}</span></div>`
                        )
                        .join('')}
                </div>
                <div class="btn-row">
                    <button id="helpClose" class="btn primary">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
            onClose && onClose();
        };
        m.querySelector('#helpClose')?.addEventListener('click', close);
    }

    hideHelp() {
        if (this.els.helpScreen) this.els.helpScreen.style.display = 'none';
    }

    /** First-launch / on-demand "How to play" overlay. */
    showHowToPlay(onClose) {
        const m = this.els.howToPlayScreen;
        if (!m) return;
        m.innerHTML = `
            <div class="overlay-card howto-card">
                <h2>${t('howToTitle')}</h2>
                <ol class="howto-list">
                    <li>${t('howToBody1')}</li>
                    <li>${t('howToBody2')}</li>
                    <li>${t('howToBody3')}</li>
                    <li>${t('howToBody4')}</li>
                </ol>
                <div class="btn-row">
                    <button id="howtoClose" class="btn primary">${t('gotIt')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
            onClose && onClose();
        };
        m.querySelector('#howtoClose')?.addEventListener('click', close);
    }

    hideHowToPlay() {
        if (this.els.howToPlayScreen) this.els.howToPlayScreen.style.display = 'none';
    }

    /**
     * iter-15: replay menu. Shows a short summary of the saved replay and
     * three speed buttons (1×, 2×, 4×). When `blob` is null we render a
     * "no replay yet" empty state and only show Close.
     */
    showReplayMenu(blob, onPlay) {
        let m = document.getElementById('replayScreen');
        if (!m) {
            m = document.createElement('div');
            m.id = 'replayScreen';
            m.className = 'overlay';
            m.style.display = 'none';
            const container = document.getElementById('gameContainer');
            container?.appendChild(m);
        }
        if (!blob) {
            m.innerHTML = `
                <div class="overlay-card replay-card">
                    <h2>${t('replayLastRun')}</h2>
                    <div class="hs-empty">${t('noReplay')}</div>
                    <div class="btn-row">
                        <button id="replayClose" class="btn primary">${t('close')}</button>
                    </div>
                </div>`;
            m.style.display = 'flex';
            m.querySelector('#replayClose')?.addEventListener('click', () => {
                m.style.display = 'none';
            });
            return;
        }
        const mm = Math.floor((blob.finalTime || 0) / 60)
            .toString()
            .padStart(2, '0');
        const ss = Math.floor((blob.finalTime || 0) % 60)
            .toString()
            .padStart(2, '0');
        m.innerHTML = `
            <div class="overlay-card replay-card">
                <h2>${t('replayLastRun')}</h2>
                <div class="replay-summary">
                    <div><strong>${t('time')}:</strong> ${mm}:${ss}</div>
                    <div><strong>${t('level')}:</strong> ${blob.finalLevel ?? 1}</div>
                    <div><strong>${t('kills')}:</strong> ${blob.finalKills ?? 0}</div>
                    <div><strong>${t('stage')}:</strong> ${blob.stage}</div>
                </div>
                <div class="btn-row" role="group" aria-label="${t('replaySpeed')}">
                    <button class="btn primary" data-replay-speed="1">1×</button>
                    <button class="btn ghost" data-replay-speed="2">2×</button>
                    <button class="btn ghost" data-replay-speed="4">4×</button>
                </div>
                <div class="btn-row">
                    <button id="replayClose" class="btn ghost">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
        };
        m.querySelectorAll('[data-replay-speed]').forEach((b) =>
            b.addEventListener('click', () => {
                const s = parseFloat(b.dataset.replaySpeed) || 1;
                close();
                onPlay && onPlay(s);
            })
        );
        m.querySelector('#replayClose')?.addEventListener('click', close);
    }

    showLeaderboard(normalScores, speedrunScores, onClose) {
        const m = this.els.leaderboardScreen;
        if (!m) return;
        const renderRow = (r, i) => {
            const mm = Math.floor((r.timeSurvived ?? 0) / 60)
                .toString()
                .padStart(2, '0');
            const ss = Math.floor((r.timeSurvived ?? 0) % 60)
                .toString()
                .padStart(2, '0');
            const d = new Date(r.date || 0);
            const dstr = isNaN(d.getTime())
                ? '—'
                : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
                      d.getDate()
                  ).padStart(2, '0')}`;
            const ws = Array.isArray(r.weapons) && r.weapons.length ? r.weapons.join(' + ') : '—';
            const nh = r.noHit ? `<span class="no-hit">${t('noHit')}</span>` : '';
            return `<div class="hs-row wide"><span>${i + 1}</span><span>${mm}:${ss}</span><span>Lv.${r.level ?? 1}</span><span>${r.kills ?? 0}</span><span class="weapons">${ws}</span><span>${dstr}</span><span>${nh}</span></div>`;
        };
        const renderSpeedRow = (r, i) => {
            const ms = r.timeMs || 0;
            const mm = Math.floor(ms / 60000)
                .toString()
                .padStart(2, '0');
            const ss = Math.floor((ms % 60000) / 1000)
                .toString()
                .padStart(2, '0');
            const ml = Math.floor(ms % 1000)
                .toString()
                .padStart(3, '0');
            const d = new Date(r.date || 0);
            const dstr = isNaN(d.getTime())
                ? '—'
                : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
                      d.getDate()
                  ).padStart(2, '0')}`;
            const ws = Array.isArray(r.weapons) && r.weapons.length ? r.weapons.join(' + ') : '—';
            return `<div class="hs-row wide"><span>${i + 1}</span><span>${mm}:${ss}.${ml}</span><span>Lv.${r.level ?? 1}</span><span>${r.kills ?? 0}</span><span class="weapons">${ws}</span><span>${dstr}</span></div>`;
        };
        m.innerHTML = `
            <div class="overlay-card leaderboard-card">
                <h2>${t('leaderboard')}</h2>
                <section class="lb-section">
                    <h3>${t('highScores')} (${normalScores.length})</h3>
                    <div class="hs-list scroll">
                        ${
                            normalScores.length
                                ? `<div class="hs-head wide"><span>#</span><span>${t('time')}</span><span>${t('level')}</span><span>${t('kills')}</span><span>${t('weapons')}</span><span>${t('date')}</span><span>${t('noHit')}</span></div>` +
                                  normalScores.map(renderRow).join('')
                                : `<div class="hs-empty">${t('noHighScores')}</div>`
                        }
                    </div>
                </section>
                <section class="lb-section">
                    <h3>${t('speedrun')} (${speedrunScores.length})</h3>
                    <div class="hs-list scroll">
                        ${
                            speedrunScores.length
                                ? `<div class="hs-head wide"><span>#</span><span>${t('time')}</span><span>${t('level')}</span><span>${t('kills')}</span><span>${t('weapons')}</span><span>${t('date')}</span></div>` +
                                  speedrunScores.map(renderSpeedRow).join('')
                                : `<div class="hs-empty">${t('noHighScores')}</div>`
                        }
                    </div>
                </section>
                <textarea id="lbJson" class="lb-json" rows="4" aria-label="${t('paste')}" placeholder='${t('paste')}'></textarea>
                <div class="btn-row">
                    <button id="lbExport" class="btn ghost">${t('export')}</button>
                    <button id="lbImport" class="btn ghost">${t('import')}</button>
                    <button id="lbClose" class="btn primary">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
            onClose && onClose();
        };
        m.querySelector('#lbClose')?.addEventListener('click', close);
        const ta = m.querySelector('#lbJson');
        m.querySelector('#lbExport')?.addEventListener('click', () => {
            if (ta) ta.value = JSON.stringify({ normal: normalScores, speedrun: speedrunScores });
        });
        m.querySelector('#lbImport')?.addEventListener('click', () => {
            if (!ta?.value?.trim()) return;
            try {
                const parsed = JSON.parse(ta.value);
                // Caller wires the merge into storage; here we just fire an event.
                const ev = new CustomEvent('vs-leaderboard-import', { detail: parsed });
                window.dispatchEvent(ev);
            } catch (err) {
                console.warn('[ui] Import JSON parse failed', err);
                ta.value = 'Invalid JSON: ' + err.message;
            }
        });
    }

    hideLeaderboard() {
        if (this.els.leaderboardScreen) this.els.leaderboardScreen.style.display = 'none';
    }

    /**
     * Render the achievements gallery as a grid of locked/unlocked cards.
     * @param {Record<string, number>} unlocked - id → unlock timestamp
     * @param {() => void} onClose
     */
    showAchievements(unlocked, onClose) {
        const m = this.els.achievementsScreen;
        if (!m) return;
        const total = ACHIEVEMENTS.length;
        const earned = ACHIEVEMENTS.filter((a) => unlocked[a.id]).length;
        m.innerHTML = `
            <div class="overlay-card achievements-card">
                <h2>${t('achievements')} <span class="ach-count">${earned} / ${total}</span></h2>
                <div class="ach-grid">
                    ${ACHIEVEMENTS.map((a) => {
                        const got = !!unlocked[a.id];
                        return `
                            <div class="ach-card ${got ? 'earned' : 'locked'}">
                                <div class="ach-card-icon">${got ? a.icon : '🔒'}</div>
                                <div class="ach-card-name">${got ? a.name : '???'}</div>
                                <div class="ach-card-desc">${a.description}</div>
                            </div>`;
                    }).join('')}
                </div>
                <div class="btn-row">
                    <button id="achClose" class="btn primary">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        const close = () => {
            m.style.display = 'none';
            onClose && onClose();
        };
        m.querySelector('#achClose')?.addEventListener('click', close);
    }

    hideAchievements() {
        if (this.els.achievementsScreen) this.els.achievementsScreen.style.display = 'none';
    }

    updateHud(game) {
        const p = game.player;
        this.els.hp.textContent = Math.ceil(p.hp);
        this.els.maxHp.textContent = Math.ceil(p.maxHp);
        this.els.hpBar.style.width = Math.max(0, (p.hp / p.maxHp) * 100) + '%';
        this.els.level.textContent = p.level;
        this.els.expBar.style.width = Math.min(100, (p.exp / p.expToNext) * 100) + '%';

        const m = Math.floor(game.gameTime / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(game.gameTime % 60)
            .toString()
            .padStart(2, '0');
        this.els.time.textContent = `${m}:${s}`;
        this.els.kills.textContent = game.kills;

        if (this.els.highScore) {
            const hs = game.save.highScore;
            const hm = Math.floor(hs.timeSurvived / 60)
                .toString()
                .padStart(2, '0');
            const hsec = Math.floor(hs.timeSurvived % 60)
                .toString()
                .padStart(2, '0');
            this.els.highScore.textContent = `${t('highScore')}: ${hm}:${hsec} · ${hs.kills}K`;
        }

        if (this.els.waveLabel && game.currentWave) {
            this.els.waveLabel.textContent = `${t('wave')}: ${game.currentWave.label}`;
        }

        // Weapon icons
        this._renderChips(
            this.els.weaponIcons,
            p.weapons.map((w) => ({
                icon: w.icon,
                level: w.level,
                max: CONFIG.WEAPON_MAX_LEVEL,
                evolved: !!w.isEvolved?.()
            }))
        );
        // Passive icons
        const passives = [];
        for (const id in p.passives) {
            const p2 = p.passives[id];
            passives.push({ icon: p2.def.icon, level: p2.count, max: CONFIG.PASSIVE_MAX_STACK });
        }
        this._renderChips(this.els.passiveIcons, passives);
    }

    _renderChips(container, items) {
        if (!container) return;
        container.innerHTML = '';
        for (const it of items) {
            const div = document.createElement('div');
            div.className = 'chip active' + (it.level >= it.max ? ' maxed' : '');
            if (it.evolved) div.classList.add('evolved');
            div.textContent = it.icon;
            const lvl = document.createElement('span');
            lvl.className = 'chip-lvl';
            lvl.textContent = it.level;
            div.appendChild(lvl);
            container.appendChild(div);
        }
    }

    setFps(fps, show) {
        if (!this.els.fpsCounter) return;
        this.els.fpsCounter.style.display = show ? 'block' : 'none';
        this.els.fpsCounter.textContent = `${Math.round(fps)} fps`;
    }

    showLevelUp(player, onPick) {
        const options = this.els.upgradeOptions;
        options.innerHTML = '';
        const pool = buildUpgradePool(player);
        // pool is [...live, ...maxed]. We pick from `live` first, fall back to
        // maxed only when there is nothing else to surface.
        const liveCount = pool.filter((p) => isUpgradeLive(player, p)).length;
        const livePool = pool.slice(0, liveCount);
        const maxedPool = pool.slice(liveCount);
        const picks = pickN(livePool, 3);
        while (picks.length < 3 && maxedPool.length) {
            const i = Math.floor(Math.random() * maxedPool.length);
            picks.push(maxedPool.splice(i, 1)[0]);
        }

        for (const up of picks) {
            const div = document.createElement('div');
            div.className = 'upgrade-option';
            div.setAttribute('role', 'menuitem');
            const existing =
                up.type === 'weapon'
                    ? player.weapons.find((w) => w.id === up.data.id)
                    : player.passives[up.data.id];
            const lvl = up.type === 'weapon' ? (existing?.level ?? 0) : (existing?.count ?? 0);
            const isMaxed =
                up.type === 'weapon'
                    ? lvl >= CONFIG.WEAPON_MAX_LEVEL
                    : lvl >= CONFIG.PASSIVE_MAX_STACK;
            const label = isMaxed
                ? ' (MÁX.)'
                : lvl > 0
                  ? ` (${up.type === 'weapon' ? 'Nív.' : 'x'}${lvl + 1})`
                  : ' (Novo!)';
            const willEvolve =
                up.type === 'weapon' &&
                !isMaxed &&
                lvl + 1 === up.data.evolveLevel &&
                up.data.evolveName;
            const evoHtml = willEvolve
                ? `<div class="evolve-tag">→ ${up.data.evolveName}</div>`
                : '';
            if (isMaxed) div.classList.add('maxed');
            div.setAttribute(
                'aria-label',
                `${up.data.name}${label}. ${up.data.description}${willEvolve ? '. Evolui para ' + up.data.evolveName : ''}`
            );
            div.innerHTML = `
                <div class="name">${up.data.icon} ${up.data.name}${label}</div>
                <div class="desc">${up.data.description}</div>
                ${evoHtml}
            `;
            // MAXED options heal a sliver instead of vanishing — they pay out something.
            div.addEventListener('click', () => onPick(isMaxed ? null : up));
            div.setAttribute('tabindex', '0');
            div.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPick(isMaxed ? null : up);
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    (div.nextElementSibling || options.firstElementChild)?.focus();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    (div.previousElementSibling || options.lastElementChild)?.focus();
                }
            });
            options.appendChild(div);
        }
        if (picks.length === 0) {
            // Nothing to upgrade (everything maxed): heal to full instead.
            player.hp = player.maxHp;
            onPick(null);
            return;
        }
        this.els.levelUpMenu.style.display = 'flex';
        // focus first option for a11y
        options.querySelector('.upgrade-option')?.focus();
    }

    hideLevelUp() {
        this.els.levelUpMenu.style.display = 'none';
    }

    showBossBanner() {
        if (!this.els.bossBanner) return;
        this._activeBannerKey = 'bossIncoming';
        this.els.bossBanner.textContent = t('bossIncoming');
        this.els.bossBanner.classList.add('visible');
        clearTimeout(this._bannerTimer);
        this._bannerTimer = setTimeout(() => {
            this.els.bossBanner.classList.remove('visible');
            this._activeBannerKey = null;
        }, 2500);
    }

    /**
     * Re-translate any sticky DOM text that does not flow through updateHud.
     * iter-16 bug-bash: previously this only refreshed the boss banner, so
     * every static menu/HUD label tagged with `data-i18n` was stuck on the
     * locale that was active at boot. Now we walk the document once and
     * write the new translation into every tagged node — cheap (one query
     * per locale change, never per frame) and works for the whole DOM
     * regardless of whether a particular overlay is visible at the time.
     */
    onLocaleChanged() {
        if (this._activeBannerKey && this.els.bossBanner) {
            this.els.bossBanner.textContent = t(this._activeBannerKey);
        }
        if (typeof document === 'undefined') return;
        const nodes = document.querySelectorAll('[data-i18n]');
        for (const el of nodes) {
            const key = el.getAttribute('data-i18n');
            if (!key) continue;
            // Preserve any non-text children (e.g. the stage chip <span> nested
            // inside the Stage button) by only rewriting the leading text node.
            const firstText = Array.from(el.childNodes).find((n) => n.nodeType === 3 /* Text */);
            const translated = t(key);
            if (firstText) {
                firstText.nodeValue = translated;
            } else {
                el.textContent = translated;
            }
        }
        // Stage chip is composed dynamically from the active stage id, not a
        // raw i18n key — refresh it explicitly so the icon + name swap with
        // the locale (e.g. "Whisperwood" → "低语森林").
        if (this.game?.stageId && typeof this.updateStageChip === 'function') {
            this.updateStageChip(this.game.stageId);
        }
    }

    showPause() {
        this.els.pauseMenu.style.display = 'flex';
    }
    hidePause() {
        this.els.pauseMenu.style.display = 'none';
    }

    showAchievementToast(ach) {
        const host = this.els.achievementToasts;
        if (!host) return;
        const el = document.createElement('div');
        el.className = 'ach-toast';
        el.innerHTML = `
            <div class="ach-icon">${ach.icon}</div>
            <div class="ach-body">
                <div class="ach-title">${t('achievementUnlocked')}</div>
                <div class="ach-name">${ach.name}</div>
                <div class="ach-desc">${ach.description}</div>
            </div>`;
        host.appendChild(el);
        // fade-in
        requestAnimationFrame(() => el.classList.add('visible'));
        setTimeout(() => {
            el.classList.remove('visible');
            setTimeout(() => el.remove(), 500);
        }, 3500);
    }

    showSettings(settings, onChange, onClose, onReset, opts = {}) {
        const m = this.els.settingsMenu;
        // iter-19: vibration row is only useful on devices with the
        // navigator.vibrate API. We hide the row entirely when
        // `opts.vibrationSupported` is false so desktop players don't see
        // a control they can't act on. The Customize controls button is
        // unconditional — keyboard remap applies everywhere.
        const vibrationRow =
            opts.vibrationSupported !== false
                ? checkboxRow('vibration', settings.vibration !== false)
                : '';
        const remapRow = opts.onRemap
            ? `<div class="settings-row"><span>${t('customizeControls')}</span>` +
              `<button data-action="remap">${t('customizeControls')}</button></div>`
            : '';
        m.innerHTML = `
            <div class="settings-card">
                <h2>${t('settings')}</h2>
                ${sliderRow('masterVolume', settings.masterVolume)}
                ${sliderRow('sfxVolume', settings.sfxVolume)}
                ${sliderRow('musicVolume', settings.musicVolume)}
                ${checkboxRow('musicEnabled', settings.musicEnabled !== false)}
                ${selectRow('difficulty', settings.difficulty, ['easy', 'normal', 'hard', 'nightmare'], DIFFICULTY_LABELS)}
                ${checkboxRow('showFps', settings.showFps)}
                ${checkboxRow('screenShake', settings.screenShake)}
                ${checkboxRow('reducedMotion', settings.reducedMotion)}
                ${checkboxRow('colorblind', !!settings.colorblind)}
                ${checkboxRow('damageNumbers', settings.damageNumbers !== false)}
                ${checkboxRow('criticalFlash', settings.criticalFlash !== false)}
                ${vibrationRow}
                ${selectRow('locale', settings.locale, availableLocales(), LOCALE_LABELS)}
                ${selectRow('touchButtonScale', String(settings.touchButtonScale ?? 1), ['0.8', '1', '1.2'])}
                ${remapRow}
                <div class="settings-buttons">
                    <button class="danger" data-action="reset">${t('resetData')}</button>
                    <button data-action="close">${t('close')}</button>
                </div>
            </div>`;
        m.style.display = 'flex';
        m.addEventListener('input', handler);
        m.addEventListener('change', handler);
        m.addEventListener('click', buttonHandler);

        const self = this;
        function handler(e) {
            const key = e.target.dataset.key;
            if (!key) return;
            const val =
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.type === 'range'
                      ? parseFloat(e.target.value)
                      : e.target.value;
            if (key === 'locale') {
                setLocale(val);
                self.onLocaleChanged();
            }
            if (key === 'colorblind') {
                document.body.classList.toggle('cb-mode', !!val);
            }
            // iter-14: touchButtonScale is exposed as a select with string
            // values ('0.8' / '1' / '1.2'); coerce back to number before
            // persisting so getTouchButtonScale's clamp works correctly.
            if (key === 'touchButtonScale') {
                const num = parseFloat(val);
                onChange(key, Number.isFinite(num) ? num : 1);
                return;
            }
            onChange(key, val);
        }
        function buttonHandler(e) {
            const a = e.target.dataset.action;
            if (a === 'close') {
                m.removeEventListener('input', handler);
                m.removeEventListener('change', handler);
                m.removeEventListener('click', buttonHandler);
                m.style.display = 'none';
                onClose();
            } else if (a === 'reset') {
                if (confirm(t('confirmReset'))) onReset();
            } else if (a === 'remap' && typeof opts.onRemap === 'function') {
                // iter-19: Customize controls. Settings panel stays open
                // behind the dialog so the user can return without
                // re-navigating.
                opts.onRemap();
            }
        }
    }

    hideSettings() {
        this.els.settingsMenu.style.display = 'none';
    }

    /**
     * iter-19: Customize controls dialog. Mounts on top of the settings
     * panel so closing the dialog returns to settings. Each row shows the
     * action label and the currently-bound key(s); the user clicks the row
     * (or focuses + presses Enter) to enter capture mode, then presses any
     * key to bind it. Captured keys are normalised through the `keymap`
     * module so the conflict-detect path matches what InputManager reads.
     *
     * Captures Esc as a binding when the user is in capture mode (so they
     * can rebind pause to a different key). Outside capture mode Esc
     * closes the dialog like the rest of the overlays.
     *
     * @param {object} keymap   the active keymap (caller owns persistence)
     * @param {(next:object)=>void} onSave
     * @param {()=>void} onClose
     */
    showRemap(keymap, onSave, onClose) {
        // Reuse the settings menu container as a host so we layer above any
        // open settings panel without spawning a new top-level overlay; the
        // settings panel itself stays mounted underneath.
        let host = document.getElementById('remapDialog');
        if (!host) {
            host = document.createElement('div');
            host.id = 'remapDialog';
            host.className = 'menu-screen';
            document.body.appendChild(host);
        }
        let working = cloneKeymap(keymap || DEFAULT_KEYMAP);
        let capturingAction = null;

        const render = () => {
            const conflicts = detectConflicts(working);
            const conflictKeys = new Set(conflicts.map((c) => c.key));
            const rows = KEYMAP_ACTIONS.map((action) => {
                const keys = working[action] || [];
                const isCapturing = capturingAction === action;
                const labels = keys.map((k) => keyLabel(k)).join(' / ') || '—';
                const row =
                    `<div class="remap-row${isCapturing ? ' capturing' : ''}" data-action="${action}" tabindex="0">` +
                    `<span class="remap-label">${t('remap_' + action) || action}</span>` +
                    `<span class="remap-keys${conflictKeys.has(keys[0]) ? ' conflict' : ''}">${
                        isCapturing ? t('pressAnyKey') : labels
                    }</span>` +
                    '</div>';
                return row;
            }).join('');
            const conflictMsg = conflicts.length
                ? `<div class="remap-conflicts">${t('keymapConflict')}: ${conflicts
                      .map((c) => `${keyLabel(c.key)} → ${c.actions.join(' / ')}`)
                      .join(', ')}</div>`
                : '';
            host.innerHTML = `
                <div class="settings-card remap-card">
                    <h2>${t('customizeControls')}</h2>
                    <div class="remap-hint">${t('remapHint')}</div>
                    ${rows}
                    ${conflictMsg}
                    <div class="settings-buttons">
                        <button data-action="reset-defaults">${t('resetDefaults')}</button>
                        <button data-action="cancel">${t('cancel')}</button>
                        <button data-action="save">${t('save')}</button>
                    </div>
                </div>`;
            host.style.display = 'flex';
        };

        const onClick = (e) => {
            const row = e.target.closest('.remap-row');
            if (row) {
                capturingAction = row.dataset.action;
                render();
                return;
            }
            const a = e.target.dataset?.action;
            if (a === 'cancel') {
                cleanup();
                onClose?.();
            } else if (a === 'save') {
                onSave?.(working);
                cleanup();
                onClose?.();
            } else if (a === 'reset-defaults') {
                working = cloneKeymap(DEFAULT_KEYMAP);
                capturingAction = null;
                render();
            }
        };

        const onKey = (e) => {
            if (!capturingAction) return;
            // Block the captured key from reaching gameplay handlers — we're
            // remapping, not playing.
            e.preventDefault();
            e.stopPropagation();
            const k = normaliseKey(e.key);
            if (!k) return;
            // Tab is reserved for focus navigation; refusing it lets the
            // user back out of capture mode without binding it.
            if (k === 'tab') {
                capturingAction = null;
                render();
                return;
            }
            working = bindKey(working, capturingAction, k, { replace: true });
            capturingAction = null;
            render();
        };

        const cleanup = () => {
            host.style.display = 'none';
            host.innerHTML = '';
            host.removeEventListener('click', onClick);
            window.removeEventListener('keydown', onKey, true);
        };

        host.addEventListener('click', onClick);
        // Capture phase so we receive the keydown before InputManager and
        // can swallow the binding press.
        window.addEventListener('keydown', onKey, true);
        render();
    }

    showGameOver(game) {
        const m = Math.floor(game.gameTime / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(game.gameTime % 60)
            .toString()
            .padStart(2, '0');
        this.els.finalTime.textContent = `${m}:${s}`;
        this.els.finalKills.textContent = game.kills;
        this.els.finalLevel.textContent = game.player.level;

        // Render leaderboard under the run summary.
        if (this.els.highScoreList) {
            const rows = game.save.highScores || [];
            // Speedrun splits block (if applicable).
            let splitsHtml = '';
            if (game.speedrunMode && game.speedrunSplits?.length) {
                splitsHtml =
                    `<div class="splits"><div class="splits-head">${t('splits')}</div>` +
                    game.speedrunSplits
                        .map((sp) => {
                            const mm = Math.floor(sp.mark / 60)
                                .toString()
                                .padStart(2, '0');
                            const ss = Math.floor(sp.mark % 60)
                                .toString()
                                .padStart(2, '0');
                            const rs = (sp.realMs / 1000).toFixed(2);
                            return `<div class="split-row"><span>${mm}:${ss}</span><span>${rs}s</span></div>`;
                        })
                        .join('') +
                    '</div>';
            }
            if (!rows.length) {
                this.els.highScoreList.innerHTML =
                    splitsHtml + `<div class="hs-empty">${t('noHighScores')}</div>`;
            } else {
                this.els.highScoreList.innerHTML =
                    splitsHtml +
                    `<div class="hs-head"><span>#</span><span>${t('time')}</span><span>${t('level')}</span><span>${t('kills')}</span><span>${t('date')}</span></div>` +
                    rows
                        .map((r, i) => {
                            const mm = Math.floor(r.timeSurvived / 60)
                                .toString()
                                .padStart(2, '0');
                            const ss = Math.floor(r.timeSurvived % 60)
                                .toString()
                                .padStart(2, '0');
                            const d = new Date(r.date || 0);
                            const dstr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                            return `<div class="hs-row"><span>${i + 1}</span><span>${mm}:${ss}</span><span>${r.level}</span><span>${r.kills}</span><span>${dstr}</span></div>`;
                        })
                        .join('');
            }
        }

        // Daily mode: render a "Share" button that copies a Wordle-style
        // result string to the clipboard. Inserted inline above the regular
        // retry/menu row so the share is the first call to action.
        if (game.dailyMode && game.dailyChallenge) {
            const card = this.els.gameOver.querySelector('.gameover');
            if (card && !card.querySelector('.daily-share-row')) {
                const wrap = document.createElement('div');
                wrap.className = 'daily-share-row';
                wrap.innerHTML = `<button id="btnShareDaily" class="btn ghost">${t('shareDaily')}</button><pre id="dailyShareText" class="share-preview" hidden></pre>`;
                // Insert before the .btn-row.
                const before = card.querySelector('.btn-row');
                if (before) card.insertBefore(wrap, before);
                else card.appendChild(wrap);
            }
            const btn = this.els.gameOver.querySelector('#btnShareDaily');
            const pre = this.els.gameOver.querySelector('#dailyShareText');
            const entry = {
                date: game.dailyChallenge.date,
                stage: game.stageId,
                timeSurvived: game.gameTime,
                kills: game.kills,
                level: game.player?.level || 1,
                won: !!game.run?.bossesDefeated?.void_lord
            };
            btn?.addEventListener('click', async () => {
                const text = buildShareText(entry);
                if (pre) {
                    pre.textContent = text;
                    pre.hidden = false;
                }
                try {
                    await navigator.clipboard?.writeText?.(text);
                    btn.textContent = t('copied');
                    setTimeout(() => (btn.textContent = t('shareDaily')), 2000);
                } catch {
                    // Fall back to selecting the preview text so the user can
                    // copy manually; clipboard write is blocked in some
                    // sandboxed iframe environments.
                    btn.textContent = t('copyManual');
                }
            });
        } else {
            // Non-daily run: strip a stale share row if any.
            const stale = this.els.gameOver.querySelector('.daily-share-row');
            stale?.remove();
        }

        this.els.gameOver.style.display = 'flex';
    }

    hideGameOver() {
        this.els.gameOver.style.display = 'none';
    }
    hideStart() {
        this.els.startScreen.style.display = 'none';
    }
    showStart() {
        this.els.startScreen.style.display = 'flex';
    }
}

function buildUpgradePool(player) {
    // Two tiers: live (selectable) upgrades first, then "maxed" cards as a
    // visible reminder of mastery. The level-up screen still prefers `live`,
    // so the player rarely sees a maxed card unless their build is full.
    const live = [];
    const maxed = [];
    for (const weapon of Object.values(WEAPONS)) {
        const existing = player.weapons.find((w) => w.id === weapon.id);
        if (existing) {
            if (existing.level < CONFIG.WEAPON_MAX_LEVEL) {
                live.push({ type: 'weapon', data: weapon });
            } else {
                maxed.push({ type: 'weapon', data: weapon });
            }
        } else if (player.weapons.length < CONFIG.MAX_WEAPONS) {
            live.push({ type: 'weapon', data: weapon });
        }
    }
    for (const passive of Object.values(PASSIVES)) {
        const existing = player.passives[passive.id];
        if (!existing) {
            if (Object.keys(player.passives).length < CONFIG.MAX_PASSIVES) {
                live.push({ type: 'passive', data: passive });
            }
        } else if (existing.count < CONFIG.PASSIVE_MAX_STACK) {
            live.push({ type: 'passive', data: passive });
        } else {
            maxed.push({ type: 'passive', data: passive });
        }
    }
    return live.concat(maxed);
}

function isUpgradeLive(player, up) {
    if (up.type === 'weapon') {
        const existing = player.weapons.find((w) => w.id === up.data.id);
        return !existing || existing.level < CONFIG.WEAPON_MAX_LEVEL;
    }
    const existing = player.passives[up.data.id];
    return !existing || existing.count < CONFIG.PASSIVE_MAX_STACK;
}

function pickN(arr, n) {
    const out = [];
    const copy = arr.slice();
    while (out.length < n && copy.length) {
        const i = Math.floor(Math.random() * copy.length);
        out.push(copy.splice(i, 1)[0]);
    }
    return out;
}

function sliderRow(key, value) {
    return `
        <label class="settings-row">
            <span>${t(key)}</span>
            <input type="range" min="0" max="1" step="0.05" value="${value}" data-key="${key}">
            <output>${Math.round(value * 100)}%</output>
        </label>`;
}

// Friendly labels for the language <select>, which otherwise falls back to
// showing the raw locale code (see availableLocales() in i18n.js).
const LOCALE_LABELS = { en: 'English', pt: 'Português', zh: '中文' };

// Friendly labels for the difficulty <select>, which otherwise shows the raw
// English option value ('easy', 'normal', ...) regardless of locale.
const DIFFICULTY_LABELS = { easy: 'Fácil', normal: 'Normal', hard: 'Difícil', nightmare: 'Pesadelo' };

function selectRow(key, value, values, labels) {
    return `
        <label class="settings-row">
            <span>${t(key)}</span>
            <select data-key="${key}">
                ${values.map((v) => `<option value="${v}" ${v === value ? 'selected' : ''}>${labels ? labels[v] || v : v}</option>`).join('')}
            </select>
        </label>`;
}

function checkboxRow(key, value) {
    return `
        <label class="settings-row">
            <span>${t(key)}</span>
            <input type="checkbox" data-key="${key}" ${value ? 'checked' : ''}>
        </label>`;
}

// Expose catalogue count for badges / tests.
export function totalAchievements() {
    return ACHIEVEMENTS.length;
}
