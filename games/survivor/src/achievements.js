/**
 * @module achievements
 * @description Evaluates the achievement catalogue against per-run + lifetime
 * state, persists unlocks into the save object and queues toast notifications
 * for the UI. Cheap to call: most checks short-circuit on the persistent
 * "already unlocked" flag.
 *
 * Dependencies: `./data.js` (ACHIEVEMENTS, UNLOCKS).
 *
 * Exports:
 *   - class AchievementTracker
 */

import { ACHIEVEMENTS, UNLOCKS } from './data.js';

export class AchievementTracker {
    constructor(save) {
        this.save = save;
        this.run = AchievementTracker._freshRun();
        this.queue = [];
    }

    /** Per-run state defaults. Centralised so constructor + resetRun match. */
    static _freshRun() {
        return {
            bossesDefeated: {},
            maxedWeapon: false,
            orbsCollected: 0,
            longestUnhit: 0,
            tookAnyDamage: false,
            // iter-20 easter eggs ------------------------------------------------
            // konamiCode: flipped when the player enters the Konami sequence
            //   from the main menu, persisted across runs via the achievement.
            // fastBossClear: flipped by main.js when ANY boss dies before 300s
            //   real-time, used by the hidden Speedrunner Plus achievement.
            // pacifistTimer: rolling seconds-without-a-kill window, capped at
            //   60s. Resets the moment kills > 0.
            konamiCode: false,
            fastBossClear: false,
            pacifistTimer: 0
        };
    }

    resetRun() {
        this.run = AchievementTracker._freshRun();
    }

    onBossDefeated(bossId) {
        this.run.bossesDefeated[bossId] = true;
    }

    onWeaponMaxed() {
        this.run.maxedWeapon = true;
    }

    check(game) {
        const ctx = { game, run: this.run };
        const newly = [];
        for (const ach of ACHIEVEMENTS) {
            if (this.save.achievements[ach.id]) continue;
            try {
                if (ach.check(ctx)) {
                    this.save.achievements[ach.id] = Date.now();
                    newly.push(ach);
                    this.queue.push(ach);
                }
            } catch (err) {
                console.warn('[achievements] check failed', ach.id, err);
            }
        }
        return newly;
    }

    takeToasts() {
        const q = this.queue;
        this.queue = [];
        return q;
    }

    /** List weapon ids unlocked by earned achievements. */
    unlockedStartingWeapons() {
        const out = new Set();
        for (const id of Object.keys(UNLOCKS)) {
            if (this.save.achievements[id] && UNLOCKS[id].weapon) {
                out.add(UNLOCKS[id].weapon);
            }
        }
        return out;
    }

    /**
     * iter-20: list of cosmetic flags earned through achievements (sprite
     * trail, alternate boss title, etc). Mirrors `unlockedStartingWeapons`
     * but reads `UNLOCKS[id].cosmetic` instead. Renderers / UI consumers
     * call this lazily (no caching needed — the set is tiny).
     */
    unlockedCosmetics() {
        const out = new Set();
        for (const id of Object.keys(UNLOCKS)) {
            if (this.save.achievements[id] && UNLOCKS[id].cosmetic) {
                out.add(UNLOCKS[id].cosmetic);
            }
        }
        return out;
    }
}
