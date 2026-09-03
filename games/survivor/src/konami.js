/**
 * @module konami
 * @description Tiny standalone detector for the canonical Konami Code
 * (↑↑↓↓←→←→BA). Built as a pure state machine so we can unit-test it without
 * any DOM, then wire one keydown listener to the document on the main menu in
 * main.js. Nothing here touches save state — the caller decides what to do
 * with the unlock event (in our case: flip a per-run flag and let the
 * AchievementTracker handle the rest).
 *
 * Dependencies: none.
 *
 * Exports:
 *   - KONAMI_SEQUENCE       canonical sequence (lowercased keys)
 *   - class KonamiDetector  push(key) → boolean (true on the matching push)
 *   - normaliseKonamiKey(k) test helper for keyboard event values
 */

// Canonical sequence. Lowercased so we compare apples to apples — the DOM
// emits 'ArrowUp' / 'a' etc, and the detector lowercases on push.
export const KONAMI_SEQUENCE = Object.freeze([
    'arrowup',
    'arrowup',
    'arrowdown',
    'arrowdown',
    'arrowleft',
    'arrowright',
    'arrowleft',
    'arrowright',
    'b',
    'a'
]);

/**
 * Lowercase a KeyboardEvent.key value. Returns '' for non-strings so the
 * detector treats them as a reset rather than crashing the matcher.
 */
export function normaliseKonamiKey(k) {
    if (typeof k !== 'string' || !k) return '';
    return k.toLowerCase();
}

export class KonamiDetector {
    constructor(onUnlock = () => {}) {
        this._idx = 0;
        // Toggle so a second consecutive sequence on the same menu doesn't
        // re-fire the unlock (the achievement is already saved at that
        // point but we still want a clean idempotent contract).
        this._fired = false;
        this.onUnlock = onUnlock;
    }

    /**
     * Feed the next key. Returns true on the push that completes the
     * sequence. Wrong keys reset the matcher to either zero or 1 if the
     * wrong key happens to match the FIRST sequence step (so a stray
     * arrow up doesn't lose progress when the user hits it twice).
     */
    push(rawKey) {
        const k = normaliseKonamiKey(rawKey);
        if (!k) return false;
        const expected = KONAMI_SEQUENCE[this._idx];
        if (k === expected) {
            this._idx++;
            if (this._idx >= KONAMI_SEQUENCE.length) {
                this._idx = 0;
                if (!this._fired) {
                    this._fired = true;
                    try {
                        this.onUnlock();
                    } catch {
                        /* swallow — unlock side-effects are best-effort */
                    }
                }
                return true;
            }
            return false;
        }
        // Mismatched key — restart, but if it matched step 0 keep that
        // progress so chord retries feel responsive.
        this._idx = k === KONAMI_SEQUENCE[0] ? 1 : 0;
        return false;
    }

    reset() {
        this._idx = 0;
    }

    /** True if this detector has already fired its unlock callback. */
    hasFired() {
        return this._fired;
    }
}
