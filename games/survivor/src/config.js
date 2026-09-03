/**
 * @module config
 * @description Engine-wide constants and enumerations. Single source of truth
 * for canvas size, max entity counts, weapon/passive caps, version string and
 * the localStorage key. Tweaking gameplay balance starts here (see also
 * `BALANCE.md`).
 *
 * Dependencies: none.
 *
 * Exports:
 *   - {object} CONFIG          numeric constants + version
 *   - {object} GameState       finite-state-machine labels (frozen)
 *   - {object} Difficulty      per-tier multipliers (frozen)
 *   - {string} STORAGE_KEY     localStorage slot name
 */

export const CONFIG = {
    CANVAS_WIDTH: 1200, // viewport width (camera projection size)
    CANVAS_HEIGHT: 800, // viewport height
    // World/arena bounds (iter-10): the player roams a 2400×1600 arena and the
    // camera follows them, keeping them centred unless they bump up against an
    // arena edge. The renderer translates by `-camera.worldX + viewport/2` so
    // entity coords stay in arena space everywhere except `_drawGrid` (which
    // intentionally tiles in screen space). See `_updateCamera()` in main.js.
    ARENA_WIDTH: 2400,
    ARENA_HEIGHT: 1600,
    PLAYER_SPEED: 240, // px / second (was 4 px/frame => 240 @ 60fps)
    PLAYER_SIZE: 20,
    MAX_ENEMIES: 300,
    SPAWN_RADIUS: 900,
    DESPAWN_RADIUS: 1200,
    EXP_ORB_LIFETIME: 30, // seconds
    INVINCIBILITY_TIME: 0.5, // seconds
    PICKUP_DISTANCE: 24,
    MAGNET_BASE: 120,
    MAX_WEAPONS: 6,
    MAX_PASSIVES: 6,
    WEAPON_MAX_LEVEL: 5,
    WEAPON_EVOLVE_LEVEL: 5,
    PASSIVE_MAX_STACK: 5,
    TARGET_FPS: 60,
    GRID_SIZE: 50, // background grid overlay step
    SPATIAL_CELL_SIZE: 64, // spatial-hash cell size for broad-phase collision
    DT_CLAMP: 0.05, // max dt per frame (s); guards against tab-resume explosions
    WAVE_DURATION: 30, // seconds per wave announcement
    HIGHSCORE_SLOTS: 10,
    // --- v2.4: speedrun + launch tuning ---------------------------------
    SPEEDRUN_SEED: 0x5357524e, // 'SPRN' — deterministic per run
    SPEEDRUN_SPLITS: [60, 180, 300, 450, 600, 720], // secs: 1,3,5,7.5,10,12 min
    SPEEDRUN_MAX_SLOTS: 10,
    LEADERBOARD_PAGE_SIZE: 20, // how many rows the scroll UI renders at a time
    EARLY_EVOLVE_THRESHOLD: 420, // seconds — used by Early Evolve achievement
    NOVA_SLOW_DEFAULT: 0.5, // fallback slow % when def omits slowPct
    BOMBER_DEFAULT_RADIUS: 120, // used if data.js omits blastRadius
    // --- v2.5: polish + reflection -------------------------------------
    SEEN_BUILDS_CAP: 1000, // hard upper bound on unique builds tracked in totals
    VERSION: '2.8.0'
};

export const GameState = Object.freeze({
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    LEVEL_UP: 'levelup',
    GAMEOVER: 'gameover',
    SETTINGS: 'settings'
});

export const Difficulty = Object.freeze({
    EASY: { id: 'easy', label: 'Fácil', hpMult: 0.75, dmgMult: 0.75, spawnMult: 0.8 },
    NORMAL: { id: 'normal', label: 'Normal', hpMult: 1.0, dmgMult: 1.0, spawnMult: 1.0 },
    HARD: { id: 'hard', label: 'Difícil', hpMult: 1.3, dmgMult: 1.25, spawnMult: 1.25 },
    NIGHTMARE: { id: 'nightmare', label: 'Pesadelo', hpMult: 1.75, dmgMult: 1.5, spawnMult: 1.6 }
});

export const STORAGE_KEY = 'vs_clone_save_v2';
export const SPEEDRUN_STORAGE_KEY = 'speedrun_highscores';
