/**
 * @module haptics
 * @description Mobile haptic feedback layer wrapping `navigator.vibrate`.
 * Provides distinct vibration patterns for the four "felt" gameplay events:
 * player damage, boss spawn, level up, and game over. Silently no-ops in any
 * environment that does not implement the API (Safari iOS, desktop Firefox,
 * Node tests) — the call shape always returns a boolean so callers can write
 * `haptics.vibrate(...)` without a try/catch.
 *
 * iter-19 added the user-facing toggle. The engine is constructed with the
 * persisted save settings and reads `settings.vibration` on every fire so
 * flipping the checkbox in Settings takes effect immediately, without any
 * re-wiring. Default is on; the Safari "no API at all" case still returns
 * a clean `false` instead of throwing.
 *
 * Patterns are short by design — anything longer than ~250 ms feels like a
 * notification rather than a game tick on Android. We use slightly different
 * shapes per event so the player can tell, eyes-closed, what happened:
 *   - hurt:      single 30 ms tap  → "ouch"
 *   - boss:      80-50-80 ms triple-pulse → "warning"
 *   - level up:  20-40-60 ms ascending ramp → "reward"
 *   - game over: 200-100-200 ms long double → "death knell"
 *
 * Dependencies: navigator (feature-detected). Pure-Node tests inject a fake
 * navigator via the constructor's optional second argument.
 *
 * Exports:
 *   - VIBRATION_PATTERNS  frozen pattern table (also used in tests)
 *   - class HapticEngine
 */

/**
 * Canonical vibration patterns. Frozen so a typo at a call site can't mutate
 * the table for everyone else. Values are arrays of milliseconds in the
 * standard `[on, off, on, off, ...]` interleaved form expected by
 * `navigator.vibrate`. A single number is also legal but the array form keeps
 * the shape consistent across events.
 */
export const VIBRATION_PATTERNS = Object.freeze({
    hurt: Object.freeze([30]),
    bossSpawn: Object.freeze([80, 50, 80]),
    levelUp: Object.freeze([20, 40, 60]),
    gameOver: Object.freeze([200, 100, 200])
});

/**
 * Resolve the vibrate function from the host environment. Returns `null` if
 * the API is missing entirely. Uses a getter rather than caching the function
 * so tests can swap `navigator` between calls.
 * @param {object} nav  navigator-like object (defaults to globalThis.navigator)
 */
function resolveVibrate(nav) {
    if (!nav) return null;
    if (typeof nav.vibrate !== 'function') return null;
    return nav.vibrate.bind(nav);
}

export class HapticEngine {
    /**
     * @param {{vibration?: boolean}} [settings]  live save.settings reference;
     *   the engine reads `.vibration` on every fire so toggling in the UI
     *   takes effect without reconstruction. Treated as opt-in default-on:
     *   only an explicit `false` disables it.
     * @param {object} [navOverride]  test-only navigator stub. When omitted we
     *   reach for `globalThis.navigator` lazily so the engine imports cleanly
     *   in Node-side tests with no DOM at all.
     */
    constructor(settings = {}, navOverride = null) {
        this.settings = settings;
        this._navOverride = navOverride;
        this._lastPattern = null; // exposed for tests
    }

    /**
     * @returns {boolean} true iff the host has navigator.vibrate. Independent
     *   of the user toggle so a UI can say "your device does not support
     *   haptic feedback" instead of just hiding the row.
     */
    isSupported() {
        const nav = this._navOverride || (typeof navigator !== 'undefined' ? navigator : null);
        return !!resolveVibrate(nav);
    }

    /**
     * @returns {boolean} true iff the user has not explicitly disabled the
     *   feature. Default is on (undefined treated as enabled).
     */
    isEnabled() {
        return this.settings?.vibration !== false;
    }

    /**
     * Fire a named pattern. Returns true if the call reached the host vibrate
     * function (or was suppressed by the user toggle while on a supported
     * device — both are "expected silent" paths). Returns false only if the
     * API is missing entirely. Never throws.
     * @param {keyof VIBRATION_PATTERNS} name
     * @returns {boolean}
     */
    vibrate(name) {
        const pattern = VIBRATION_PATTERNS[name];
        if (!pattern) return false;
        this._lastPattern = pattern;
        if (!this.isEnabled()) return true; // user-disabled but recognised
        const nav = this._navOverride || (typeof navigator !== 'undefined' ? navigator : null);
        const fn = resolveVibrate(nav);
        if (!fn) return false;
        try {
            // Spread the frozen tuple to a fresh array — some browser
            // implementations historically mutated the input.
            fn(pattern.slice());
            return true;
        } catch {
            // Any throw (rare; some embedded webviews block vibrate behind a
            // user-gesture gate) is silenced. The game must not crash because
            // a phone disagreed with us.
            return false;
        }
    }

    /** Convenience wrappers — kept thin so the call sites read fluently. */
    hurt() {
        return this.vibrate('hurt');
    }
    bossSpawn() {
        return this.vibrate('bossSpawn');
    }
    levelUp() {
        return this.vibrate('levelUp');
    }
    gameOver() {
        return this.vibrate('gameOver');
    }
}
