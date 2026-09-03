/**
 * @module storage
 * @description Persistent save layer backed by `localStorage` with an
 * in-memory fallback for sandboxed contexts (private browsing, embedded
 * iframes). Also owns the leaderboard helper and the cumulative `totals`
 * accumulator. Forwards-compatible: `mergeDeep` lets us add new save fields
 * without invalidating older slots.
 *
 * Dependencies: `./config.js` (CONFIG, STORAGE_KEY).
 *
 * Exports:
 *   - loadSave(), saveSave(), resetSave()
 *   - recordHighScore(save, entry) → rank
 *   - accumulateTotals(save, run)
 */

import { CONFIG, SPEEDRUN_STORAGE_KEY, STORAGE_KEY } from './config.js';

const DEFAULT_SAVE = {
    // Legacy single-slot best-of. Kept for backwards compatibility with v2.0 saves.
    highScore: {
        kills: 0,
        timeSurvived: 0,
        level: 1
    },
    // v2.1: top-N leaderboard and cumulative stats.
    highScores: [], // { kills, timeSurvived, level, date (epoch ms) }
    totals: {
        kills: 0,
        timePlayed: 0,
        runs: 0,
        bossKills: 0
    },
    achievements: {},
    // v2.6 (iter-12): per-stage leaderboards. Each key is a stage id; the
    // value is a top-N array shaped like `highScores`. The legacy global
    // `highScores` field is retained as the union-of-all-stages view so old
    // UI paths keep working.
    stageHighScores: {},
    settings: {
        masterVolume: 0.6,
        sfxVolume: 0.8,
        musicVolume: 0.4,
        difficulty: 'normal',
        showFps: false,
        screenShake: true,
        reducedMotion: false,
        colorblind: false,
        musicEnabled: true,
        damageNumbers: true,
        locale: 'pt',
        stage: 'forest',
        // iter-13: global mute toggle, persisted so refresh keeps the choice.
        muted: false,
        // iter-14: touch UI scaling. 0.8 = small, 1.0 = default, 1.2 = large.
        // Applied by ui.js as CSS custom properties on the document root
        // (--touch-button-size etc) so the joystick + special button grow
        // together. Clamped to the 0.8–1.4 range on read.
        touchButtonScale: 1,
        // iter-15: optional red flash on critical hits. Defaults to on; the
        // user can toggle off in Settings if they find it disruptive.
        criticalFlash: true,
        // iter-19: mobile haptic feedback toggle. Defaults to on; the
        // engine silently no-ops on platforms without `navigator.vibrate`
        // (Safari iOS, desktop Firefox), so leaving this on costs nothing
        // for non-mobile players. The Settings UI hides the row entirely
        // when the API is missing so the toggle isn't dead-end on desktop.
        vibration: true
    },
    runs: 0,
    // iter-13: one-time flags. `howToSeen` flips on the first dismiss of the
    // /howtoplay overlay; we only auto-show it for new players.
    // iter-14 adds `pwaPromptSeen` so the install pop-up only floats once.
    // iter-15 adds `tutorialDone` so the 5-step tutorial only auto-offers once.
    flags: { howToSeen: false, pwaPromptSeen: false, tutorialDone: false }
};

let memoryFallback = null;

function hasLocalStorage() {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return false;
        const probe = '__vs_probe__';
        window.localStorage.setItem(probe, probe);
        window.localStorage.removeItem(probe);
        return true;
    } catch {
        return false;
    }
}

// Evaluate lazily so Node-side tests can import this module without a DOM.
let _usable = null;
function usableLS() {
    if (_usable === null) _usable = hasLocalStorage();
    return _usable;
}

export function loadSave() {
    try {
        const raw = usableLS() ? window.localStorage.getItem(STORAGE_KEY) : memoryFallback;
        if (!raw) return structuredCloneCompat(DEFAULT_SAVE);
        const parsed = JSON.parse(raw);
        return mergeDeep(structuredCloneCompat(DEFAULT_SAVE), parsed);
    } catch (err) {
        console.warn('[storage] Failed to load save, resetting.', err);
        return structuredCloneCompat(DEFAULT_SAVE);
    }
}

export function saveSave(data) {
    let serialised;
    try {
        serialised = JSON.stringify(data);
    } catch (err) {
        console.warn('[storage] Failed to serialise save.', err);
        return false;
    }
    if (usableLS()) {
        try {
            window.localStorage.setItem(STORAGE_KEY, serialised);
            return true;
        } catch (err) {
            // iter-16 bug-bash: when localStorage runs out of room (Safari
            // private mode caps at ~5 MB; iframes can be tighter still),
            // demote to the in-memory fallback for the rest of the session.
            // Previously we just warned and lost every subsequent write —
            // the player would see their progress vanish on refresh with no
            // explanation. Now subsequent saves at least survive a tab
            // refresh-within-tab via the JS-side fallback, and the warning
            // only fires once per session instead of per save.
            if (!_quotaWarned) {
                console.warn('[storage] localStorage write failed, switching to memory.', err);
                _quotaWarned = true;
            }
            _usable = false;
            memoryFallback = serialised;
            return false;
        }
    }
    memoryFallback = serialised;
    return true;
}

let _quotaWarned = false;

export function resetSave() {
    if (usableLS()) {
        window.localStorage.removeItem(STORAGE_KEY);
    } else {
        memoryFallback = null;
    }
}

// Test-only helper: flush the in-memory fallback + cached usability probe.
export function _resetStorageForTests() {
    memoryFallback = null;
    _usable = null;
    _quotaWarned = false;
}

// ---------------------------------------------------------------------------
// Leaderboard helpers
// ---------------------------------------------------------------------------
/**
 * Insert a run result into the top-N leaderboard (sorted by timeSurvived
 * descending, then by kills). Returns the 1-based rank of the new entry, or 0
 * if it did not qualify.
 */
export function recordHighScore(save, entry) {
    const list = Array.isArray(save.highScores) ? save.highScores : [];
    const withNew = list.concat([entry]);
    withNew.sort((a, b) => {
        if (b.timeSurvived !== a.timeSurvived) return b.timeSurvived - a.timeSurvived;
        return (b.kills || 0) - (a.kills || 0);
    });
    const top = withNew.slice(0, CONFIG.HIGHSCORE_SLOTS);
    save.highScores = top;
    const rank = top.indexOf(entry) + 1;

    // v2.6: per-stage leaderboard slot. Default to 'forest' so old runs
    // without a stage field still land in the canonical bucket.
    if (entry && typeof entry === 'object') {
        const stageId = entry.stage || 'forest';
        save.stageHighScores ??= {};
        const sList = Array.isArray(save.stageHighScores[stageId])
            ? save.stageHighScores[stageId]
            : [];
        const withNewStage = sList.concat([entry]);
        withNewStage.sort((a, b) => {
            if (b.timeSurvived !== a.timeSurvived) return b.timeSurvived - a.timeSurvived;
            return (b.kills || 0) - (a.kills || 0);
        });
        save.stageHighScores[stageId] = withNewStage.slice(0, CONFIG.HIGHSCORE_SLOTS);
    }

    // Also update legacy best-of for backwards compat.
    if (entry.timeSurvived > (save.highScore?.timeSurvived || 0)) {
        save.highScore.timeSurvived = entry.timeSurvived;
    }
    if (entry.kills > (save.highScore?.kills || 0)) save.highScore.kills = entry.kills;
    if (entry.level > (save.highScore?.level || 0)) save.highScore.level = entry.level;
    return rank;
}

/** Stage-scoped leaderboard read; falls back to [] for unknown stages. */
export function getStageHighScores(save, stageId) {
    if (!save || !save.stageHighScores) return [];
    return Array.isArray(save.stageHighScores[stageId]) ? save.stageHighScores[stageId] : [];
}

/**
 * iter-14: read the touch-button scale, clamped to a sane band. Defaults to
 * 1.0 if the field is missing (older saves) or out of range. Exposed as a
 * helper rather than a raw read so the UI never has to apply the clamp
 * inline.
 */
export function getTouchButtonScale(save) {
    const v = Number(save?.settings?.touchButtonScale);
    if (!Number.isFinite(v)) return 1;
    return Math.min(1.4, Math.max(0.8, v));
}

export function accumulateTotals(save, run) {
    save.totals ??= { kills: 0, timePlayed: 0, runs: 0, bossKills: 0 };
    save.totals.kills += run.kills || 0;
    save.totals.timePlayed += run.gameTime || 0;
    save.totals.runs += 1;
    save.totals.bossKills += run.bossKills || 0;
}

export function structuredCloneCompat(obj) {
    if (typeof structuredClone === 'function') return structuredClone(obj);
    return JSON.parse(JSON.stringify(obj));
}

export function mergeDeep(target, source) {
    for (const key of Object.keys(source)) {
        if (Array.isArray(source[key])) {
            target[key] = source[key];
        } else if (source[key] && typeof source[key] === 'object') {
            target[key] = mergeDeep(target[key] ?? {}, source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

// ---------------------------------------------------------------------------
// Speedrun high-score helpers. Kept in a separate slot so the normal
// leaderboard and the deterministic runs never commingle. Each entry
// records: { timeMs, splits[], level, kills, date, weapons, noHit }.
// ---------------------------------------------------------------------------
export function loadSpeedrunScores() {
    try {
        const raw = usableLS()
            ? window.localStorage.getItem(SPEEDRUN_STORAGE_KEY)
            : _speedrunMemory;
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.warn('[storage] Failed to load speedrun scores.', err);
        return [];
    }
}

let _speedrunMemory = null;

export function saveSpeedrunScores(scores) {
    try {
        const serialised = JSON.stringify(scores);
        if (usableLS()) window.localStorage.setItem(SPEEDRUN_STORAGE_KEY, serialised);
        else _speedrunMemory = serialised;
    } catch (err) {
        console.warn('[storage] Failed to write speedrun scores.', err);
    }
}

/** Insert a speedrun result; returns 1-based rank or 0 if it didn't qualify. */
export function recordSpeedrunScore(entry) {
    const list = loadSpeedrunScores().concat([entry]);
    list.sort((a, b) => (a.timeMs || Infinity) - (b.timeMs || Infinity));
    const capped = list.slice(0, CONFIG.SPEEDRUN_MAX_SLOTS);
    saveSpeedrunScores(capped);
    const rank = capped.indexOf(entry) + 1;
    return rank;
}

export function _resetSpeedrunForTests() {
    _speedrunMemory = null;
    if (usableLS()) window.localStorage.removeItem(SPEEDRUN_STORAGE_KEY);
}

// ---------------------------------------------------------------------------
// Deterministic 32-bit LCG for Speedrun mode. `nextInt`/`nextFloat` are cheap
// and predictable; seeding with the same value always produces the same
// stream, which is the whole point of speedruns.
// ---------------------------------------------------------------------------
export class SeededRng {
    constructor(seed = 1) {
        // Force unsigned 32-bit; 0 seed is illegal (collapses to 0 forever).
        this.state = seed >>> 0 || 1;
    }
    nextInt() {
        // LCG parameters from Numerical Recipes.
        this.state = (Math.imul(this.state, 1664525) + 1013904223) >>> 0;
        return this.state;
    }
    nextFloat() {
        return this.nextInt() / 0x100000000;
    }
    pick(arr) {
        if (!arr.length) return null;
        return arr[this.nextInt() % arr.length];
    }
}
