/**
 * @module replay
 * @description Iter-15 replay system. Records the *minimum* state needed to
 * reproduce a run: per-frame normalised player input vector and the run's
 * deterministic RNG seed. Playback re-feeds those inputs into the engine at
 * 1×, 2× or 4× speed.
 *
 * Storage shape (single slot to bound localStorage growth — only the latest
 * run is kept):
 *   {
 *     version: 1,                  // bump if shape changes
 *     savedAt: epoch ms,
 *     seed: number,                // SeededRng seed used (also drives spawns)
 *     stage: string,
 *     difficulty: string,
 *     dt: number,                  // fixed timestep used by the recorder
 *     frames: Array<[x, y]>,       // per-frame normalised move vectors
 *     finalKills: number,
 *     finalTime: number,
 *     finalLevel: number
 *   }
 *
 * Frames are stored as `[x, y]` tuple arrays rather than `{x, y}` objects so
 * the JSON payload stays small (a 12-minute run at 60 fps = ~43k frames; a
 * tuple form is ~30% smaller than the object form when run-length-encoded).
 *
 * We RLE the frame list — long stretches where the player isn't moving (or
 * holding the same direction) collapse to a single `[x, y, count]` triplet.
 * `expandFrames` inflates back to a flat per-frame array on load.
 *
 * Dependencies: ./config.js, ./storage.js (loadSpeedrunScores not used; we
 * own a separate localStorage slot to keep the replay payload outside the
 * normal save blob).
 */

// Distinct slot — keep this value stable across iterations so saved replays
// survive an upgrade. Suffixed with `v1` so a future shape change can roll
// to `v2` without colliding with old payloads.
export const REPLAY_STORAGE_KEY = 'vs_replay_last_v1';
export const REPLAY_VERSION = 1;
// Cap a recorded run at 30 minutes worth of frames at 60fps. Anything past
// the cap is truncated (record() returns false) so a runaway test loop never
// fills localStorage.
export const REPLAY_MAX_FRAMES = 60 * 60 * 30;

// -- minimal localStorage adapter (mirrors storage.js, kept local so replay --
// -- code doesn't pull in unrelated save defaults) -------------------------
let _memoryFallback = null;
let _usable = null;

function hasLS() {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return false;
        const probe = '__vs_replay_probe__';
        window.localStorage.setItem(probe, probe);
        window.localStorage.removeItem(probe);
        return true;
    } catch {
        return false;
    }
}

function usableLS() {
    if (_usable === null) _usable = hasLS();
    return _usable;
}

/** Test-only helper to flush both the in-memory fallback and the cache. */
export function _resetReplayForTests() {
    _memoryFallback = null;
    _usable = null;
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            window.localStorage.removeItem(REPLAY_STORAGE_KEY);
        } catch {
            /* ignore */
        }
    }
}

/**
 * Run-length-encode a flat array of `[x, y]` tuples into `[x, y, count]`
 * triplets. Two consecutive frames count as a "run" only when both axes
 * match exactly (we already store inputs at 2-decimal precision via
 * `quantize`), so we don't need an epsilon here. Returns the RLE array.
 */
export function compressFrames(frames) {
    const out = [];
    if (!frames || !frames.length) return out;
    let prevX = frames[0][0];
    let prevY = frames[0][1];
    let count = 1;
    for (let i = 1; i < frames.length; i++) {
        const [x, y] = frames[i];
        if (x === prevX && y === prevY) {
            count++;
        } else {
            out.push([prevX, prevY, count]);
            prevX = x;
            prevY = y;
            count = 1;
        }
    }
    out.push([prevX, prevY, count]);
    return out;
}

/** Inverse of `compressFrames`: expand RLE triplets back to a per-frame list. */
export function expandFrames(rle) {
    const out = [];
    if (!Array.isArray(rle)) return out;
    for (const entry of rle) {
        if (!Array.isArray(entry) || entry.length < 3) continue;
        const [x, y, count] = entry;
        for (let i = 0; i < count; i++) out.push([x, y]);
    }
    return out;
}

/**
 * Quantize a -1..1 axis value to 2 decimal places. The recorder uses this so
 * micro-jitter on a virtual joystick (or analog stick) doesn't blow up the
 * RLE compression. Values within 0.01 collapse to the same bucket.
 */
export function quantize(v) {
    if (!Number.isFinite(v)) return 0;
    return Math.round(v * 100) / 100;
}

/**
 * Recorder. Construct, then call `record(moveVec)` once per simulation tick.
 * `serialize()` produces the storage blob; `frameCount` exposes how many
 * frames have been pushed (cheaper than `frames.length` after compression).
 */
export class ReplayRecorder {
    constructor({ seed, stage, difficulty, dt }) {
        this.seed = seed >>> 0;
        this.stage = stage || 'forest';
        this.difficulty = difficulty || 'normal';
        this.dt = dt || 1 / 60;
        this.frames = [];
        this.finalKills = 0;
        this.finalTime = 0;
        this.finalLevel = 1;
        this._truncated = false;
    }

    /** Returns true if the frame was recorded, false if the cap was hit. */
    record(moveVec) {
        if (this.frames.length >= REPLAY_MAX_FRAMES) {
            this._truncated = true;
            return false;
        }
        this.frames.push([quantize(moveVec?.x || 0), quantize(moveVec?.y || 0)]);
        return true;
    }

    get frameCount() {
        return this.frames.length;
    }

    /** Snapshot final-run statistics into the recorder. */
    finalize({ kills, time, level }) {
        this.finalKills = kills | 0;
        this.finalTime = +time || 0;
        this.finalLevel = level | 0 || 1;
    }

    serialize() {
        return {
            version: REPLAY_VERSION,
            savedAt: Date.now(),
            seed: this.seed,
            stage: this.stage,
            difficulty: this.difficulty,
            dt: this.dt,
            frames: compressFrames(this.frames),
            finalKills: this.finalKills,
            finalTime: this.finalTime,
            finalLevel: this.finalLevel,
            truncated: this._truncated
        };
    }
}

/**
 * Persist a serialized replay blob to localStorage. Always overwrites the
 * single slot (we deliberately keep only the *last* run to avoid storage
 * growth — see CHANGELOG iter-15 notes). Returns true on success.
 */
export function saveReplay(blob) {
    try {
        const data = JSON.stringify(blob);
        if (usableLS()) {
            window.localStorage.setItem(REPLAY_STORAGE_KEY, data);
        } else {
            _memoryFallback = data;
        }
        return true;
    } catch (err) {
        console.warn('[replay] failed to persist replay', err);
        return false;
    }
}

/** Load the saved replay or `null` if none exists / version mismatch. */
export function loadReplay() {
    try {
        const raw = usableLS() ? window.localStorage.getItem(REPLAY_STORAGE_KEY) : _memoryFallback;
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== REPLAY_VERSION) return null;
        return parsed;
    } catch (err) {
        console.warn('[replay] failed to load replay', err);
        return null;
    }
}

/** Drop the saved replay (used by Settings → Reset). */
export function clearReplay() {
    if (usableLS()) {
        try {
            window.localStorage.removeItem(REPLAY_STORAGE_KEY);
        } catch {
            /* ignore */
        }
    } else {
        _memoryFallback = null;
    }
}

/**
 * Player. Holds an expanded frame list (per-frame `[x, y]` tuples) plus a
 * cursor and a speed multiplier. `tick(dt)` advances the cursor — at 1× the
 * cursor moves 1 frame per simulation tick, at 2× it moves 2, etc.
 *
 * The host engine calls `getMoveVector()` instead of reading real input each
 * frame while a replay is active. When `done` flips true the host should
 * fall back to the menu.
 */
export class ReplayPlayer {
    constructor(blob, { speed = 1 } = {}) {
        if (!blob) throw new Error('[replay] cannot construct player without blob');
        this.blob = blob;
        this.frames = expandFrames(blob.frames);
        this.cursor = 0;
        this.speed = ReplayPlayer.clampSpeed(speed);
        this.done = false;
    }

    /** Allowed speeds. Anything else snaps to the nearest legal value. */
    static get SPEEDS() {
        return [1, 2, 4];
    }

    static clampSpeed(s) {
        const n = Number(s) || 1;
        const opts = ReplayPlayer.SPEEDS;
        let best = opts[0];
        let bestDelta = Infinity;
        for (const o of opts) {
            const d = Math.abs(o - n);
            if (d < bestDelta) {
                bestDelta = d;
                best = o;
            }
        }
        return best;
    }

    setSpeed(s) {
        this.speed = ReplayPlayer.clampSpeed(s);
    }

    get totalFrames() {
        return this.frames.length;
    }

    get progress() {
        if (!this.frames.length) return 1;
        return Math.min(1, this.cursor / this.frames.length);
    }

    /**
     * Advance the cursor by `speed` frames per call. The caller is expected
     * to invoke `tick()` once per simulation step — the speed multiplier
     * means we *consume* more frames per real-time tick at 2× / 4×.
     */
    tick() {
        if (this.done) return;
        this.cursor += this.speed;
        if (this.cursor >= this.frames.length) {
            this.cursor = this.frames.length;
            this.done = true;
        }
    }

    /** Read the input vector for the *current* frame. Clamped to last frame. */
    getMoveVector() {
        if (!this.frames.length) return { x: 0, y: 0 };
        const idx = Math.min(this.cursor, this.frames.length - 1);
        const f = this.frames[idx] || [0, 0];
        return { x: f[0] || 0, y: f[1] || 0 };
    }
}
