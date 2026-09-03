/**
 * @module stages
 * @description Stage / map registry. A stage is a *modifier set* on top of the
 * base wave director: it overrides the enemy pools, the boss timing, the
 * background palette and the music style without changing the underlying
 * spawn engine. The default stage `forest` is a no-op that mirrors the
 * v2.5 balance; `crypt` is the second map introduced in iter-12 — darker,
 * ranged-heavy, and the Reaper shows up at 4:00 instead of 5:00.
 *
 * Dependencies: `./data.js` (WAVES, BOSSES) for the defaults the modifiers
 * sit on top of. We deliberately don't touch the originals — `getWavesFor`
 * returns a frozen copy. This makes stages cheap to swap mid-session and
 * keeps the catalogue diff-friendly.
 *
 * Exports:
 *   - {Record<string, StageDef>} STAGES
 *   - getStage(id)               → StageDef (defaults to forest if unknown)
 *   - getWavesFor(id)            → WaveDef[]   (cloned + remapped)
 *   - getBossesFor(id)           → BossDef[]   (cloned + spawnAt remapped)
 *   - getBackgroundFor(id)       → { fill, gridAlpha }
 *   - listStages()               → StageDef[]  (stable order)
 *   - getStageModifiers(id)      → { playerSpeedMult, enemyHpMult,
 *                                    coldTickInterval, coldTickDamage }
 *
 * iter-14 introduces the third stage `tundra`. On top of the existing pool
 * / boss / palette knobs, tundra ships three brand-new gameplay levers,
 * exposed under `getStageModifiers(id)` so the consumer (`main.js`) can apply
 * them generically rather than hard-coding string checks:
 *   - playerSpeedMult: multiplier baked into player speed (0.9 = -10%).
 *   - enemyHpMult:      multiplier baked into enemy HP at spawn (1.2 = +20%).
 *   - coldTickInterval: seconds between cold ticks (0 = disabled).
 *   - coldTickDamage:   HP drained per tick (1 by default).
 * The IceQueen boss replaces VoidLord on tundra to give a visually distinct
 * 10-minute fight (see `bossOverrides`).
 */

import { BOSSES, WAVES } from './data.js';

/**
 * @typedef {Object} StageDef
 * @property {string} id             unique key, used in storage / URL
 * @property {string} name           display name
 * @property {string} icon           emoji shown on the picker
 * @property {string} description    one-line tagline shown on the picker
 * @property {Object} background     palette overrides for the renderer
 * @property {string} background.fill        CSS hex for the canvas backdrop
 * @property {number} background.gridAlpha   0..1 opacity of the grid
 * @property {string} musicStyle     'menu' | 'combat' | 'crypt' | 'forest' — hint for AudioEngine
 * @property {Object} [poolOverrides] map of enemyId -> weight bias (0..2)
 *                                    Applied per-spawn to bias the random pick.
 *                                    Missing ids default to 1.
 * @property {string[]} [extraEnemies] enemy ids appended to every wave's pool
 * @property {Record<string, number>} [bossOffsets] bossId -> seconds to add
 *                                                  (negative = earlier)
 */

/** @type {Record<string, StageDef>} */
export const STAGES = Object.freeze({
    FOREST: Object.freeze({
        id: 'forest',
        name: 'Bosque Sussurrante',
        icon: '🌲',
        description: 'A floresta padrão. Mistura equilibrada de inimigos, chefes no horário.',
        background: { fill: '#1a1a2e', gridAlpha: 0.04 },
        musicStyle: 'forest',
        poolOverrides: {},
        extraEnemies: [],
        bossOffsets: {}
    }),
    CRYPT: Object.freeze({
        id: 'crypt',
        name: 'Cripta Submersa',
        icon: '🪦',
        description: 'Mais escura. Mais conjuradores à distância. O Ceifador ataca aos 4:00.',
        background: { fill: '#0c0816', gridAlpha: 0.025 },
        musicStyle: 'crypt',
        // Bias spawns: more mages and illusionists, fewer melee chasers.
        poolOverrides: {
            mage: 1.8,
            illusionist: 1.6,
            ghost: 1.4,
            skeleton: 1.2,
            bat: 0.6,
            zombie: 0.5,
            wolf: 0.7
        },
        // Add mage to every wave so the ranged-heavy promise holds in the
        // first 90 seconds where vanilla pools have no caster.
        extraEnemies: ['mage'],
        bossOffsets: {
            // Reaper arrives 60s earlier (5:00 -> 4:00).
            reaper: -60,
            // Necromancer also pulled in slightly so the 4:00→7:30 gap is healthier.
            necromancer: -30
        }
    }),
    // ----------------------------------------------------------------------
    // iter-14 — Tundra
    //
    // The third map. Bosses keep the same schedule as forest, but the entire
    // map applies three soft pressure modifiers:
    //   - playerSpeedMult 0.9   (ice underfoot, -10% movement)
    //   - enemyHpMult     1.2   (thicker furred enemies, +20% HP)
    //   - cold tick       1 HP / 10 s (slow attrition)
    // The cold tick is implemented in main.js (`_applyColdTick`) and reads
    // its config from `getStageModifiers(id)` so the modifier surface stays
    // declarative. The "warmth-source" pickup that temporarily disables the
    // cold tick is *intentionally disabled this iteration* — see
    // `warmthSourceEnabled: false` — so we ship the harder difficulty without
    // the relief item until the pickup pipeline is hooked up properly.
    //
    // Visual: cold blue palette (#2a3a4f) with a slightly more visible grid
    // so the snow lines read on the canvas. The 10-minute boss is replaced
    // with IceQueen (see data.js BOSSES.ICE_QUEEN) via `bossOverrides`.
    // ----------------------------------------------------------------------
    TUNDRA: Object.freeze({
        id: 'tundra',
        name: 'Tundra Congelada',
        icon: '❄️',
        description:
            'Neve escorregadia (-10% velocidade), feras mais resistentes (+20% vida), frio que avança.',
        background: { fill: '#2a3a4f', gridAlpha: 0.05 },
        musicStyle: 'forest',
        poolOverrides: {
            // Wolves and golems thrive in snow, mages and bats less so.
            wolf: 1.5,
            golem: 1.4,
            zombie: 1.1,
            skeleton: 1.1,
            bat: 0.5,
            mage: 0.7
        },
        extraEnemies: [],
        // Bosses keep their forest-default timings — the difficulty comes
        // from the always-on modifiers, not from rushing the schedule.
        bossOffsets: {},
        // 10-minute boss reskin: replace VoidLord with IceQueen on tundra.
        bossOverrides: { void_lord: 'ice_queen' },
        modifiers: Object.freeze({
            playerSpeedMult: 0.9,
            enemyHpMult: 1.2,
            coldTickInterval: 10, // seconds
            coldTickDamage: 1, // HP per tick
            // Pickup item placeholder. Disabled this iteration (no spawn
            // logic, no pickup handler) — surfaced in the schema so the UI
            // and tests can assert the flag exists.
            warmthSourceEnabled: false
        })
    })
});

const DEFAULT_STAGE_ID = 'forest';

/** @returns {StageDef} */
export function getStage(id) {
    if (!id) return STAGES.FOREST;
    for (const s of Object.values(STAGES)) {
        if (s.id === id) return s;
    }
    return STAGES.FOREST;
}

/** Stable ordering for the stage picker UI. */
export function listStages() {
    return [STAGES.FOREST, STAGES.CRYPT, STAGES.TUNDRA];
}

/**
 * Default modifier set used as the floor for any stage that doesn't define
 * its own. Forest + Crypt rely on these defaults so existing balance is
 * untouched. Frozen on first construction so callers can `Object.assign`
 * over a copy without mutating the source.
 */
const DEFAULT_MODIFIERS = Object.freeze({
    playerSpeedMult: 1,
    enemyHpMult: 1,
    coldTickInterval: 0,
    coldTickDamage: 0,
    warmthSourceEnabled: false
});

/**
 * Return the gameplay modifier bundle for a stage. Always returns a complete
 * object (defaults filled in for stages that don't declare every field), so
 * callers can read `mods.coldTickInterval` without `?? 0` everywhere.
 * @param {string} id
 * @returns {{playerSpeedMult:number, enemyHpMult:number, coldTickInterval:number, coldTickDamage:number, warmthSourceEnabled:boolean}}
 */
export function getStageModifiers(id) {
    const stage = getStage(id);
    return { ...DEFAULT_MODIFIERS, ...(stage.modifiers || {}) };
}

/**
 * Return a copy of the WAVES array with the stage's `extraEnemies` appended
 * to each wave's pool. We keep the original `from`/`to`/`spawnMult`/`label`
 * intact — only the `pool` array is mutated, and only on the copy.
 * @returns {Array}
 */
export function getWavesFor(id) {
    const stage = getStage(id);
    const extra = stage.extraEnemies || [];
    return WAVES.map((w) => {
        const pool = extra.length ? Array.from(new Set(w.pool.concat(extra))) : w.pool.slice();
        return { ...w, pool };
    });
}

/**
 * Return a copy of BOSSES with `spawnAt` shifted by the stage's per-boss
 * offset. The offset is clamped to a minimum of 30s so a stage cannot try
 * to spawn the boss before the player has any weapons online.
 *
 * `bossOverrides` (added in iter-14 for tundra) lets a stage swap one boss
 * id for another at the same `spawnAt`. We look up the replacement by id in
 * the BOSSES table; an unknown override is ignored (caller still sees the
 * original entry) so a typo can't drop a boss from the schedule entirely.
 * Any boss whose own id is the *target* of an override on this stage is
 * skipped — otherwise tundra would spawn both VoidLord and IceQueen at the
 * 10-minute mark.
 * @returns {Array<{id:string, spawnAt:number, def:object}>}
 */
export function getBossesFor(id) {
    const stage = getStage(id);
    const offsets = stage.bossOffsets || {};
    const overrides = stage.bossOverrides || {};
    // Set of replacement target ids to skip when we hit them in the source
    // table directly (e.g. ICE_QUEEN.spawnAt would otherwise duplicate-spawn).
    const replacementTargets = new Set(Object.values(overrides));
    const bossesById = {};
    for (const b of Object.values(BOSSES)) bossesById[b.id] = b;

    // Bosses that are *only* spawned via a stage's `bossOverrides` mapping
    // and never on their own. Currently just IceQueen (tundra-exclusive).
    // Skipping these on stages that don't override into them keeps the
    // forest/crypt boss timelines pristine.
    const overrideOnlyIds = new Set(['ice_queen']);

    const out = [];
    for (const b of Object.values(BOSSES)) {
        if (overrideOnlyIds.has(b.id) && !replacementTargets.has(b.id)) {
            continue;
        }
        if (replacementTargets.has(b.id) && !overrides[b.id]) {
            // This boss is *only* spawned via override on this stage.
            continue;
        }
        let def = b;
        if (overrides[b.id]) {
            const replacement = bossesById[overrides[b.id]];
            if (replacement) def = replacement;
        }
        const off = offsets[b.id] || 0;
        const spawnAt = Math.max(30, b.spawnAt + off);
        // Carry the *original* id key for boss-spawned tracking sets so
        // `_bossesSpawned.has('void_lord')` doesn't double-fire on tundra.
        out.push({ ...def, spawnAt, sourceId: b.id });
    }
    return out;
}

/** Background palette helper; the renderer reads this once per frame. */
export function getBackgroundFor(id) {
    const s = getStage(id);
    return s.background;
}

/**
 * Bias a uniform random pick by the stage's `poolOverrides` weights. Missing
 * ids default to weight 1; weights of 0 effectively remove that enemy from
 * the spawn pool for this stage.
 * @param {string[]} pool
 * @param {string} stageId
 * @param {() => number} rnd  random source [0, 1)
 * @returns {string}
 */
export function pickWeighted(pool, stageId, rnd = Math.random) {
    if (!pool.length) return null;
    const stage = getStage(stageId);
    const weights = stage.poolOverrides || {};
    let total = 0;
    const cum = pool.map((id) => {
        const w = weights[id] ?? 1;
        total += Math.max(0, w);
        return total;
    });
    if (total <= 0) return pool[Math.floor(rnd() * pool.length)];
    const r = rnd() * total;
    for (let i = 0; i < pool.length; i++) {
        if (r < cum[i]) return pool[i];
    }
    return pool[pool.length - 1];
}

export { DEFAULT_STAGE_ID };
