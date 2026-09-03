/**
 * @module data
 * @description Pure-data catalogue: weapons, passives, enemies, bosses, wave
 * director timeline, achievement definitions and unlock map. Behaviour lives
 * elsewhere (`weapons.js`, `entities.js`, `achievements.js`); this module is
 * intentionally side-effect free so it can be diffed during balancing.
 *
 * Dependencies: none.
 *
 * Exports:
 *   - {Record<string, WeaponDef>} WEAPONS
 *   - {Record<string, PassiveDef>} PASSIVES
 *   - {Record<string, EnemyDef>} ENEMIES
 *   - {Record<string, BossDef>} BOSSES
 *   - {WaveDef[]} WAVES
 *   - {AchievementDef[]} ACHIEVEMENTS
 *   - {Record<string, UnlockDef>} UNLOCKS
 */

// ---------------------------------------------------------------------------
// Weapons
// Level scaling is uniform: damage +20% per level, cooldown ×0.92, range +10%.
// Level 5 triggers a weapon's "evolution" flag (see weapons.js).
// ---------------------------------------------------------------------------
export const WEAPONS = {
    WHIP: {
        id: 'whip',
        name: 'Chicote',
        icon: '⚔️',
        description: 'Golpeia os dois lados do herói. Evolui: varredura em círculo completo.',
        baseDamage: 20,
        baseCooldown: 1.5,
        baseRange: 90,
        projectileCount: 1,
        piercing: false,
        type: 'melee',
        evolveLevel: 5,
        evolveName: 'Varredura Sangrenta'
    },
    MAGIC_WAND: {
        id: 'magic_wand',
        name: 'Varinha Mágica',
        icon: '🔮',
        description: 'Projétil teleguiado que busca o inimigo mais próximo. Evolui: rajada tripla.',
        baseDamage: 15,
        baseCooldown: 1.2,
        baseRange: 320,
        projectileCount: 1,
        piercing: false,
        type: 'projectile',
        speed: 420,
        homing: true,
        evolveLevel: 5,
        evolveName: 'Tempestade Buscadora'
    },
    KNIFE: {
        id: 'knife',
        name: 'Faca',
        icon: '🗡️',
        description: 'Lâmina perfurante arremessada para frente. Evolui: leque largo de 5 lâminas.',
        baseDamage: 12,
        baseCooldown: 0.4,
        baseRange: 420,
        projectileCount: 1,
        piercing: true,
        type: 'projectile',
        speed: 620,
        evolveLevel: 5,
        evolveName: 'Leque de Lâminas',
        // iter-14 evolution micro-tweak: the fan also gets a flat +10% crit
        // chance on top of the player's current critChance roll. Picked up
        // by Weapon._rollCrit when the weapon `isEvolved()`.
        evolveBonusCrit: 0.1
    },
    ORBIT: {
        id: 'orbit',
        name: 'Orbitador',
        icon: '💫',
        description: 'Fragmentos giram em torno do herói. Evolui: dois anéis girando.',
        baseDamage: 16,
        baseCooldown: 0.4, // used as "tick" for damage re-hit window
        baseRange: 120, // orbit radius
        projectileCount: 2,
        piercing: true,
        type: 'orbit',
        evolveLevel: 5,
        evolveName: 'Duplo Halo',
        // iter-14: evolved Twin Halo also boosts shard damage by +10%.
        evolveDamageMult: 1.1
    },
    LIGHTNING: {
        id: 'lightning',
        name: 'Raio',
        icon: '⚡',
        description: 'Atinge um inimigo aleatório. Nv3+ encadeia. Evolui: explosão de tempestade.',
        baseDamage: 35,
        baseCooldown: 3.0,
        baseRange: 420,
        piercing: true,
        type: 'instant',
        chain: true,
        chainCount: 3,
        evolveLevel: 5,
        evolveName: 'Chamado do Trovão',
        // iter-14: evolved Thunder Call rolls a +15% crit on the strikes.
        evolveBonusCrit: 0.15
    },
    MINE: {
        id: 'mine',
        name: 'Mina de Área',
        icon: '💣',
        description: 'Solta uma mina que arma e detona. Evolui: pilha dupla.',
        baseDamage: 45,
        baseCooldown: 2.2,
        baseRange: 100, // explosion radius
        projectileCount: 1,
        piercing: true,
        type: 'mine',
        fuse: 1.2,
        evolveLevel: 5,
        evolveName: 'Mina em Cluster'
    },
    GARLIC: {
        id: 'garlic',
        name: 'Alho',
        icon: '🧄',
        description: 'Aura de dano ao redor do herói.',
        baseDamage: 5,
        baseCooldown: 0.2,
        baseRange: 110,
        piercing: true,
        type: 'aura',
        continuous: true
    },
    // --- v2.4 additions ---------------------------------------------------
    FROST_NOVA: {
        id: 'frost_nova',
        name: 'Nova de Gelo',
        icon: '❄️',
        description: 'Anel de gelo em expansão retarda os inimigos atingidos. Evolui: anel duplo.',
        baseDamage: 28,
        baseCooldown: 3.2,
        baseRange: 200, // blast radius
        projectileCount: 1,
        piercing: true,
        type: 'nova',
        slowPct: 0.5,
        slowDuration: 1.2,
        evolveLevel: 5,
        evolveName: 'Cascata Glacial'
    },
    SOUL_DRAIN: {
        id: 'soul_drain',
        name: 'Dreno de Alma',
        icon: '🩸',
        description: 'Feixe que prende o inimigo mais próximo e cura a cada pulso. Evolui: dupla lâmina.',
        baseDamage: 8,
        baseCooldown: 0.25, // tick rate
        baseRange: 260,
        projectileCount: 1,
        piercing: true,
        type: 'drain',
        lifestealPct: 0.25,
        evolveLevel: 5,
        evolveName: 'Acorde Vampírico'
    },
    BOOMERANG: {
        id: 'boomerang',
        name: 'Bumerangue',
        icon: '🪃',
        description: 'Lançado para frente, retorna sozinho ao herói. Evolui: arco duplo.',
        baseDamage: 18,
        baseCooldown: 1.1,
        baseRange: 340,
        projectileCount: 1,
        piercing: true,
        type: 'projectile',
        speed: 380,
        boomerang: true,
        evolveLevel: 5,
        evolveName: 'Arco Duplo',
        // iter-14: Twin Arc fires 5% faster than its base cooldown formula.
        evolveCooldownMult: 0.95
    },
    // --- iter-20: Konami Code unlock --------------------------------------
    // Hidden weapon awarded on the first time the player enters the Konami
    // Code on the main menu. Behaves like a fast piercing projectile (a nod
    // to retro shoot-'em-ups). Not part of the regular drop pool — only
    // available as a starter once UNLOCKS.konami_code is earned.
    RETRO_BLASTER: {
        id: 'retro_blaster',
        name: 'Lança Retrô',
        icon: '👾',
        description: 'Feixe arcade 8-bit. Perfura para frente em rajada compacta. Evolui: feixe triplo.',
        baseDamage: 14,
        baseCooldown: 0.5,
        baseRange: 480,
        projectileCount: 2,
        piercing: true,
        type: 'projectile',
        speed: 700,
        evolveLevel: 5,
        evolveName: 'Tempestade de Pixels'
    }
};

// ---------------------------------------------------------------------------
// Passives (stackable up to CONFIG.PASSIVE_MAX_STACK)
// ---------------------------------------------------------------------------
export const PASSIVES = {
    MAX_HP: {
        id: 'max_hp',
        name: 'Vitalidade',
        icon: '❤️',
        description: 'Vida máx. +20%',
        effect: { maxHpMult: 0.2 }
    },
    RECOVERY: {
        id: 'recovery',
        name: 'Recuperação',
        icon: '💚',
        description: 'Regeneração +0,5 vida/s',
        effect: { hpRegen: 0.5 }
    },
    ARMOR: {
        id: 'armor',
        name: 'Armadura',
        icon: '🛡️',
        description: 'Dano recebido -1',
        effect: { armor: 1 }
    },
    MOVESPEED: {
        id: 'movespeed',
        name: 'Agilidade',
        icon: '👟',
        description: 'Velocidade de movimento +10%',
        effect: { speedMult: 0.1 }
    },
    MIGHT: {
        id: 'might',
        name: 'Poder',
        icon: '💪',
        description: 'Dano +10%',
        effect: { damageMult: 0.1 }
    },
    AREA: {
        id: 'area',
        name: 'Área',
        icon: '📏',
        description: 'Alcance das armas +10%',
        effect: { areaMult: 0.1 }
    },
    COOLDOWN: {
        id: 'cooldown',
        name: 'Recarga',
        icon: '⏱️',
        description: 'Velocidade de ataque +8%',
        effect: { cooldownMult: -0.08 }
    },
    MAGNET: {
        id: 'magnet',
        name: 'Ímã',
        icon: '🧲',
        description: 'Alcance de coleta +25%',
        effect: { magnetMult: 0.25 }
    },
    GROWTH: {
        id: 'growth',
        name: 'Crescimento',
        icon: '📈',
        description: 'Ganho de XP +10%',
        effect: { expMult: 0.1 }
    },
    LUCK: {
        id: 'luck',
        name: 'Sorte',
        icon: '🍀',
        description: 'Chance de crítico +5%',
        effect: { critChance: 0.05 }
    },
    // --- iter-14 passives -------------------------------------------------
    // The three new passives all hook into existing player stats so the level-
    // up roller pool grows without any new code path. `dodgeChance` is summed
    // (capped at 0.6 in entities.js) and consulted before damage is applied;
    // `magnetMult` is reused for Pickup Magnet+ which stacks multiplicatively
    // on the existing MAGNET passive; `damageReduction` is summed and clamped
    // to a soft 0.6 cap on the consumer side so the player can't go fully
    // immortal even with five stacks.
    DODGE: {
        id: 'dodge',
        name: 'Esquiva',
        icon: '💨',
        description: 'Chance de esquiva +5%',
        effect: { dodgeChance: 0.05 }
    },
    MAGNET_PLUS: {
        id: 'magnet_plus',
        name: 'Ímã de Coleta+',
        icon: '🧲',
        description: 'Alcance de coleta +35%',
        effect: { magnetMult: 0.35 }
    },
    DAMAGE_REDUCTION: {
        id: 'damage_reduction',
        name: 'Baluarte',
        icon: '🛡️',
        description: 'Dano recebido -8%',
        effect: { damageReduction: 0.08 }
    }
};

// ---------------------------------------------------------------------------
// Enemies
// Five distinct archetypes + legacy types kept for backwards compat.
// New archetype flags (all optional):
//   ranged:     fires projectiles at the player
//   splitter:   on death, spawns splitChildren × ENEMIES.splitInto
//   dasher:     charges forward in short bursts
//   shielded:   takes reduced damage until shield breaks
// ---------------------------------------------------------------------------
export const ENEMIES = {
    BAT: {
        id: 'bat',
        name: 'Morcego',
        archetype: 'chaser',
        hp: 15,
        speed: 110,
        damage: 10,
        exp: 10,
        color: '#8844ff',
        size: 12
    },
    ZOMBIE: {
        id: 'zombie',
        name: 'Zumbi',
        archetype: 'chaser',
        hp: 30,
        speed: 70,
        damage: 15,
        exp: 15,
        color: '#44aa44',
        size: 18
    },
    SKELETON: {
        id: 'skeleton',
        name: 'Esqueleto',
        archetype: 'chaser',
        hp: 25,
        speed: 95,
        damage: 12,
        exp: 12,
        color: '#dddddd',
        size: 14
    },
    WOLF: {
        id: 'wolf',
        name: 'Lobo Feroz',
        archetype: 'dasher',
        dasher: true,
        dashSpeed: 320,
        dashInterval: 3.5,
        dashDuration: 0.6,
        hp: 40,
        speed: 150,
        damage: 20,
        exp: 20,
        color: '#aa6644',
        size: 16
    },
    GOLEM: {
        id: 'golem',
        name: 'Golem',
        archetype: 'shielded',
        shielded: true,
        shieldHp: 60,
        damageReduction: 0.5,
        hp: 120,
        speed: 45,
        damage: 30,
        exp: 50,
        color: '#888888',
        size: 28
    },
    GHOST: {
        id: 'ghost',
        name: 'Fantasma',
        archetype: 'chaser',
        hp: 20,
        speed: 130,
        damage: 18,
        exp: 18,
        color: '#88ccff',
        size: 15,
        ghost: true
    },
    // --- New archetypes --------------------------------------------------
    MAGE: {
        id: 'mage',
        name: 'Cultista',
        archetype: 'ranged',
        ranged: true,
        firingRange: 360,
        keepDistance: 260,
        projectileSpeed: 220,
        projectileDamage: 14,
        fireCooldown: 2.4,
        hp: 28,
        speed: 70,
        damage: 8,
        exp: 22,
        color: '#cc44cc',
        size: 14
    },
    SLIME: {
        id: 'slime',
        name: 'Gosma',
        archetype: 'splitter',
        splitter: true,
        splitCount: 2,
        hp: 55,
        speed: 65,
        damage: 14,
        exp: 24,
        color: '#33cc88',
        size: 20
    },
    SLIMELING: {
        id: 'slimeling',
        name: 'Gosminha',
        archetype: 'chaser',
        hp: 18,
        speed: 105,
        damage: 8,
        exp: 6,
        color: '#66ddaa',
        size: 10
    },
    // --- v2.4 additions: bomber (self-destructs) + illusionist (clone) ---
    BOMBER: {
        id: 'bomber',
        name: 'Bombardeiro',
        archetype: 'bomber',
        bomber: true,
        fuseRange: 80, // begins countdown when within this distance
        fuseTime: 1.4, // seconds before detonation
        blastRadius: 120,
        blastDamage: 40,
        hp: 35,
        speed: 120,
        damage: 10,
        exp: 28,
        color: '#ff6644',
        size: 14
    },
    ILLUSIONIST: {
        id: 'illusionist',
        name: 'Ilusionista',
        archetype: 'illusionist',
        illusionist: true,
        cloneCooldown: 5.5,
        cloneCount: 2,
        hp: 42,
        speed: 95,
        damage: 12,
        exp: 30,
        color: '#cc88ff',
        size: 15
    }
};

// Splitter produces this type (lookup by id to avoid circular assignment).
ENEMIES.SLIME.splitInto = 'slimeling';

// ---------------------------------------------------------------------------
// Bosses
// Mid-boss at 5:00, final boss at 10:00 (default). Each has a signature ability.
// ---------------------------------------------------------------------------
export const BOSSES = {
    REAPER: {
        id: 'reaper',
        name: 'O Ceifador',
        hp: 2500,
        speed: 80,
        damage: 40,
        exp: 500,
        color: '#220033',
        size: 48,
        boss: true,
        ability: 'summon',
        spawnAt: 300 // 5 minutes
    },
    VOID_LORD: {
        id: 'void_lord',
        name: 'Senhor do Vazio',
        hp: 6000,
        speed: 60,
        damage: 60,
        exp: 1200,
        color: '#550077',
        size: 64,
        boss: true,
        ability: 'charge',
        spawnAt: 600 // 10 minutes
    },
    // --- v2.4 mid/late bosses --------------------------------------------
    NECROMANCER: {
        id: 'necromancer',
        name: 'Necromante',
        hp: 4200,
        speed: 70,
        damage: 50,
        exp: 850,
        color: '#3a1a4a',
        size: 54,
        boss: true,
        ability: 'summon',
        spawnAt: 450 // 7:30
    },
    CHRONO_LICH: {
        id: 'chrono_lich',
        name: 'Lich do Tempo',
        hp: 10000,
        speed: 55,
        damage: 75,
        exp: 2000,
        color: '#0b2a4a',
        size: 72,
        boss: true,
        ability: 'charge',
        spawnAt: 720 // 12:00
    },
    // --- iter-14 tundra final boss ---------------------------------------
    // IceQueen is a frost-palette variant of the 10-minute boss. The tundra
    // stage swaps her in for VoidLord via `bossOverrides`; on other stages she
    // never auto-spawns. Listed here so the boss list, daily-mode replays and
    // achievement registry can reference her by id without a special case.
    ICE_QUEEN: {
        id: 'ice_queen',
        name: 'A Rainha do Gelo',
        hp: 6200,
        speed: 55,
        damage: 60,
        exp: 1300,
        color: '#88ccff',
        size: 66,
        boss: true,
        ability: 'charge',
        // Listed at 660 to keep the BOSSES timeline strictly ascending
        // (Reaper 300 < Necro 450 < VoidLord 600 < IceQueen 660 < ChronoLich
        // 720). Tundra's `bossOverrides` swaps her into VoidLord's 600 slot
        // at runtime; this raw value is never read on tundra (the override
        // path uses the source boss's spawnAt + offset).
        spawnAt: 660,
        iceQueen: true // visual flag, read by entities renderer for frost halo
    }
};

// ---------------------------------------------------------------------------
// Wave director: each entry is a window [from, to) (seconds) listing the pool
// of enemies that may spawn, plus a spawn-rate multiplier. The director falls
// back to the final entry once gameTime exceeds the last window.
// ---------------------------------------------------------------------------
export const WAVES = [
    { from: 0, to: 30, pool: ['bat', 'zombie'], spawnMult: 1.0, label: 'Abertura' },
    { from: 30, to: 60, pool: ['bat', 'zombie', 'skeleton'], spawnMult: 1.1, label: 'Onda 2' },
    {
        from: 60,
        to: 90,
        pool: ['zombie', 'skeleton', 'mage'],
        spawnMult: 1.15,
        label: 'Cultistas'
    },
    {
        from: 90,
        to: 120,
        pool: ['skeleton', 'wolf', 'ghost', 'mage'],
        spawnMult: 1.2,
        label: 'Matilha'
    },
    {
        from: 120,
        to: 180,
        pool: ['wolf', 'ghost', 'slime', 'mage', 'bomber'],
        spawnMult: 1.3,
        label: 'Divisores'
    },
    {
        from: 180,
        to: 240,
        pool: ['wolf', 'golem', 'ghost', 'slime', 'bomber'],
        spawnMult: 1.4,
        label: 'Vanguarda'
    },
    {
        from: 240,
        to: 300,
        pool: ['golem', 'ghost', 'slime', 'mage', 'illusionist'],
        spawnMult: 1.5,
        label: 'Pressão'
    },
    {
        from: 300,
        to: 420,
        pool: ['wolf', 'golem', 'ghost', 'slime', 'mage', 'bomber', 'illusionist'],
        spawnMult: 1.6,
        label: 'Pós-Ceifador'
    },
    {
        from: 420,
        to: 600,
        pool: ['golem', 'slime', 'mage', 'ghost', 'wolf', 'illusionist'],
        spawnMult: 1.75,
        label: 'Escalada'
    },
    {
        from: 600,
        to: Infinity,
        pool: ['golem', 'slime', 'mage', 'ghost', 'wolf', 'skeleton', 'bomber', 'illusionist'],
        spawnMult: 2.0,
        label: 'Fim de Jogo'
    }
];

// ---------------------------------------------------------------------------
// Achievements: condition evaluated at end-of-run + continuously in-game.
// `check(ctx)` returns true when unlocked. `ctx` = { game, run }
// ---------------------------------------------------------------------------
export const ACHIEVEMENTS = [
    {
        id: 'first_blood',
        name: 'Primeiro Sangue',
        icon: '🗡️',
        description: 'Derrote seu primeiro inimigo.',
        check: (c) => c.game.kills >= 1
    },
    {
        id: 'slayer_100',
        name: 'Centurião',
        icon: '🎯',
        description: 'Derrote 100 inimigos em uma única partida.',
        check: (c) => c.game.kills >= 100
    },
    {
        id: 'slayer_1000',
        name: 'Destruidor de Legiões',
        icon: '🏆',
        description: 'Derrote 1000 inimigos em uma única partida.',
        check: (c) => c.game.kills >= 1000
    },
    {
        id: 'boss_slayer',
        name: 'Ceifador Derrotado',
        icon: '☠️',
        description: 'Derrote o chefe intermediário O Ceifador.',
        check: (c) => !!c.run.bossesDefeated?.reaper
    },
    {
        id: 'void_breaker',
        name: 'Quebrador do Vazio',
        icon: '🌌',
        description: 'Derrote o Senhor do Vazio.',
        check: (c) => !!c.run.bossesDefeated?.void_lord
    },
    {
        id: 'survive_5min',
        name: 'Chama de Cinco Minutos',
        icon: '⏱️',
        description: 'Sobreviva 5 minutos.',
        check: (c) => c.game.gameTime >= 300
    },
    {
        id: 'survive_10min',
        name: 'Titã de Dez Minutos',
        icon: '🔥',
        description: 'Sobreviva 10 minutos.',
        check: (c) => c.game.gameTime >= 600
    },
    {
        id: 'survive_15min',
        name: 'Quinze Minutos',
        icon: '⌛',
        description: 'Sobreviva 15 minutos.',
        check: (c) => c.game.gameTime >= 900
    },
    {
        id: 'weapon_max',
        name: 'Maestria',
        icon: '🌟',
        description: 'Alcance o nível máximo em qualquer arma.',
        check: (c) => !!c.run.maxedWeapon
    },
    {
        id: 'untouchable',
        name: 'Intocável',
        icon: '🛡️',
        description: 'Evite dano por 60 segundos seguidos.',
        check: (c) => (c.run.longestUnhit || 0) >= 60
    },
    {
        id: 'xp_hoarder',
        name: 'Acumulador de XP',
        icon: '💎',
        description: 'Colete 100 esferas de XP em uma partida.',
        check: (c) => (c.run.orbsCollected || 0) >= 100
    },
    {
        id: 'level_20',
        name: 'Grande Apostador',
        icon: '📈',
        description: 'Alcance o nível 20 do herói.',
        check: (c) => c.game.player?.level >= 20
    },
    // --- v2.4 additions ---------------------------------------------------
    {
        id: 'speed_demon',
        name: 'Demônio da Velocidade',
        icon: '💨',
        description: 'Derrote o Senhor do Vazio em menos de 5 minutos reais.',
        check: (c) =>
            !!c.run.bossesDefeated?.void_lord && (c.run.realSecondsToVoidLord || Infinity) < 300
    },
    {
        id: 'no_hit_boss',
        name: 'Duelo Impecável',
        icon: '🕊️',
        description: 'Derrote qualquer chefe sem tomar dano durante a luta.',
        check: (c) => !!c.run.noHitBoss
    },
    {
        id: 'max_all',
        name: 'Tudo no Máximo',
        icon: '👑',
        description: 'Alcance o nível máximo em todos os slots de arma em uma única partida.',
        check: (c) => (c.run.maxedWeaponCount || 0) >= 6
    },
    {
        id: 'early_evolve',
        name: 'Evolução Precoce',
        icon: '🔮',
        description: 'Evolua uma arma antes dos 7 minutos.',
        check: (c) => !!c.run.evolvedBefore?.sevenMin
    },
    {
        id: 'triple_build',
        name: 'Ameaça Tripla',
        icon: '🎲',
        description: 'Termine 3 partidas com combinações de armas diferentes (ao longo do tempo).',
        check: (c) => (c.game.save?.totals?.uniqueBuilds || 0) >= 3
    },
    {
        id: 'zen_5min',
        name: 'Andarilho Zen',
        icon: '🧘',
        description: 'Sobreviva 5 minutos sem pegar nenhuma passiva.',
        check: (c) => c.game.gameTime >= 300 && (c.run.passivesPicked || 0) === 0
    },
    // --- iter-20: hidden / easter-egg achievements ------------------------
    // These three are intentionally undocumented in the gallery's tooltip
    // copy until they're earned (the UI reveals them once unlocked). Their
    // `hidden: true` flag is read by ui.js to gate the description preview.
    {
        id: 'konami_code',
        name: 'Código Konami',
        icon: '🎮',
        description: 'Encontrou o lendário código secreto. Desbloqueia a Lança Retrô.',
        hidden: true,
        check: (c) => !!c.run.konamiCode
    },
    {
        id: 'speedrun_plus',
        name: 'Speedrunner Plus',
        icon: '⚡',
        description:
            'Derrotou um chefe importante em menos de 5 minutos reais. Desbloqueia um rastro visual.',
        hidden: true,
        // The tracker sets `run.fastBossClear` whenever any boss falls in
        // under 300 wall-clock seconds. Reaper on the Crypt stage (4:00
        // spawn) is the only viable path; on Forest it's intentionally
        // unreachable without pause-abuse, which the speedrun anchor
        // already filters out.
        check: (c) => !!c.run.fastBossClear
    },
    {
        id: 'pacifist_provoked',
        name: 'Pacifista Provocado',
        icon: '🕊️',
        description:
            'Sobreviveu 60 segundos sem nenhum abate — deixe o mundo fazer o trabalho. Desbloqueia um título especial de chefe.',
        hidden: true,
        check: (c) => (c.run.pacifistTimer || 0) >= 60 && c.game.kills === 0
    }
];

// ---------------------------------------------------------------------------
// Unlocks: achievement id → weapon id granted as starter-weapon option.
// ---------------------------------------------------------------------------
export const UNLOCKS = {
    first_blood: { weapon: 'magic_wand' },
    slayer_100: { weapon: 'knife' },
    survive_5min: { weapon: 'orbit' },
    boss_slayer: { weapon: 'lightning' },
    survive_10min: { weapon: 'mine' },
    // v2.4 unlocks
    survive_15min: { weapon: 'boomerang' },
    void_breaker: { weapon: 'frost_nova' },
    speed_demon: { weapon: 'soul_drain' },
    // iter-20: easter-egg unlocks. Konami grants a starter weapon, the
    // other two unlock cosmetic flags consumed by the renderer / UI but
    // are still surfaced as standard UNLOCKS entries so the achievement
    // gallery can show their reward chip consistently.
    konami_code: { weapon: 'retro_blaster' },
    speedrun_plus: { cosmetic: 'sprite_trail' },
    pacifist_provoked: { cosmetic: 'boss_title_pacifist' }
};
