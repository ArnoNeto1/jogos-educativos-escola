/**
 * @module weapons
 * @description Single `Weapon` class that consumes a definition from
 * `data.js` and dispatches to the appropriate `_fire*` strategy each tick.
 * Level scaling formulas:
 *   damage   = base * (1 + (lvl-1) * 0.2) * player.damageMult * critMult
 *   cooldown = base * 0.92^(lvl-1) * player.cooldownMult
 *   range    = base * (1 + (lvl-1) * 0.1) * player.areaMult
 * At `lvl === def.evolveLevel` (5) the weapon enters its shape-changing
 * evolution — see `isEvolved()` and per-type handling below.
 *
 * Dependencies: `./entities.js` (Mine, OrbitShard, Projectile).
 *
 * Exports:
 *   - class Weapon
 */

import { Mine, OrbitShard, Projectile } from './entities.js';

export class Weapon {
    constructor(def) {
        this.def = def;
        this.id = def.id;
        this.name = def.name;
        this.icon = def.icon;
        this.level = 1;
        this.cooldown = 0;
        this._shards = null; // orbit-only
    }

    levelUp() {
        this.level++;
    }

    isEvolved() {
        return !!this.def.evolveLevel && this.level >= this.def.evolveLevel;
    }

    update(dt, player, game) {
        // Orbit weapon ticks every frame (maintains shards), but re-fires on cooldown
        // to refresh damage state. Everything else fires on its cooldown.
        if (this.def.type === 'orbit') {
            this._ensureShards(player);
            for (const s of this._shards) s.update(dt, player, game);
            return;
        }
        this.cooldown -= dt;
        if (this.cooldown <= 0) {
            this.fire(player, game);
            this.cooldown = this.getCooldown(player);
        }
    }

    getDamage(player) {
        let base = this.def.baseDamage * (1 + (this.level - 1) * 0.2) * player.getDamageMult();
        // iter-14 evolution micro-tweak: a per-weapon evolved damage scalar.
        if (this.isEvolved() && this.def.evolveDamageMult) {
            base *= this.def.evolveDamageMult;
        }
        return base;
    }

    _rollCrit(player, game, baseDamage, x, y, color) {
        // iter-14: evolved weapons may add a flat crit-chance bonus on top
        // of the player's passive-derived crit chance. Stacks additively
        // because the player's crit chance is already a sum of LUCK stacks.
        let chance = player.getCritChance();
        if (this.isEvolved() && this.def.evolveBonusCrit) {
            chance += this.def.evolveBonusCrit;
        }
        if (chance > 0 && Math.random() < chance) {
            const dmg = baseDamage * 2;
            game.createFloatingText(Math.round(dmg), x, y, '#ffee44', { crit: true });
            return dmg;
        }
        game.createFloatingText(Math.round(baseDamage), x, y, color);
        return baseDamage;
    }

    getCooldown(player) {
        let cd = this.def.baseCooldown * Math.pow(0.92, this.level - 1) * player.getCooldownMult();
        // iter-14: evolution can shave additional cooldown (Twin Arc).
        if (this.isEvolved() && this.def.evolveCooldownMult) {
            cd *= this.def.evolveCooldownMult;
        }
        return cd;
    }

    getRange(player) {
        return this.def.baseRange * (1 + (this.level - 1) * 0.1) * player.getAreaMult();
    }

    getOrbitShardCount(player) {
        // Each 2 weapon levels adds a shard; evolved doubles and mirrors.
        let n = this.def.projectileCount + Math.floor((this.level - 1) / 2);
        if (this.isEvolved()) n = n * 2;
        // Extra shard for every 2 cooldown passives (just a fun passive synergy).
        const extra = Math.floor((player.passives?.cooldown?.count || 0) / 2);
        return Math.min(12, n + extra);
    }

    _ensureShards(player) {
        const count = this.getOrbitShardCount(player);
        const radius = this.getRange(player);
        const dmg = this.getDamage(player);
        if (!this._shards || this._shards.length !== count) {
            this._shards = [];
            for (let i = 0; i < count; i++) {
                this._shards.push(new OrbitShard(this, i, count, radius, dmg));
            }
        } else {
            // Update params in place.
            for (const s of this._shards) {
                s.radius = radius;
                s.damage = dmg;
                s.total = count;
            }
        }
    }

    renderExtras(ctx) {
        if (this.def.type === 'orbit' && this._shards) {
            for (const s of this._shards) s.render(ctx);
        }
    }

    fire(player, game) {
        switch (this.def.type) {
            case 'melee':
                return this._fireMelee(player, game);
            case 'projectile':
                return this._fireProjectile(player, game);
            case 'instant':
                return this._fireInstant(player, game);
            case 'aura':
                return this._fireAura(player, game);
            case 'mine':
                return this._fireMine(player, game);
            case 'nova':
                return this._fireNova(player, game);
            case 'drain':
                return this._fireDrain(player, game);
        }
    }

    _fireMelee(player, game) {
        const range = this.getRange(player);
        const baseDmg = this.getDamage(player);
        const hit = new Set();
        const evolved = this.isEvolved();
        // iter-16 perf: query the spatial hash for the bounding-box of the
        // sweep instead of walking every enemy. With 200 enemies on screen
        // the linear scan was ~200 hypot calls per fire — the hash trims it
        // to whatever lives in the overlapping cells (typically <30 in a
        // forest spawn cluster).
        const candidates = game?.spatial
            ? game.spatial.queryRect(player.x, player.y, Math.max(range, 40))
            : game.enemies;
        for (const enemy of candidates) {
            const dx = enemy.x - player.x;
            const dy = enemy.y - player.y;
            if (evolved) {
                // Full circular sweep
                if (Math.hypot(dx, dy) > range) continue;
            } else {
                if (Math.abs(dx) > range) continue;
                if (Math.abs(dy) > 40) continue;
            }
            if (hit.has(enemy)) continue;
            hit.add(enemy);
            const dmg = this._rollCrit(player, game, baseDmg, enemy.x, enemy.y - 20, '#ffaa00');
            enemy.takeDamage(dmg);
        }
        if (evolved) {
            game.createParticles(player.x, player.y, '#ff6644', 12);
        } else {
            game.createParticles(player.x - range / 2, player.y, '#ffaa00', 5);
            game.createParticles(player.x + range / 2, player.y, '#ffaa00', 5);
        }
        game.audio.shoot();
    }

    _fireProjectile(player, game) {
        let count = this.def.projectileCount + Math.floor((this.level - 1) / 2);
        if (this.isEvolved() && this.id === 'knife') count = Math.max(count, 5);
        if (this.isEvolved() && this.id === 'magic_wand') count += 2;
        const spreadDeg = count > 1 ? (this.isEvolved() ? 24 : 14) : 0;
        const target = game.spatial.findNearestEnemy(player.x, player.y, this.getRange(player));
        if (!target) return;
        const base = Math.atan2(target.y - player.y, target.x - player.x);
        for (let i = 0; i < count; i++) {
            const offset = ((i - (count - 1) / 2) * spreadDeg * Math.PI) / 180;
            game.projectiles.push(
                new Projectile(
                    player.x,
                    player.y,
                    base + offset,
                    this.def,
                    this.getDamage(player),
                    this.level,
                    player
                )
            );
        }
        game.audio.shoot();
    }

    _fireInstant(player, game) {
        const range = this.getRange(player);
        const baseDmg = this.getDamage(player);
        // iter-16 perf: spatial probe + materialise into an array (we still
        // need indexed access for the random-pick loop and the chain hops).
        const candIter = game?.spatial
            ? game.spatial.queryRect(player.x, player.y, range)
            : game.enemies;
        const targets = [];
        for (const e of candIter) {
            if (Math.hypot(e.x - player.x, e.y - player.y) < range) targets.push(e);
        }
        if (!targets.length) return;
        const evolved = this.isEvolved();
        const strikes = evolved ? Math.min(3, targets.length) : 1;
        const picked = new Set();
        for (let i = 0; i < strikes; i++) {
            let target = null;
            while (picked.size < targets.length) {
                const cand = targets[Math.floor(Math.random() * targets.length)];
                if (!picked.has(cand)) {
                    target = cand;
                    picked.add(cand);
                    break;
                }
            }
            if (!target) break;
            const dmg = this._rollCrit(player, game, baseDmg, target.x, target.y - 20, '#ffff66');
            target.takeDamage(dmg);
            game.createParticles(target.x, target.y, '#ffff66', 14);

            if (this.def.chain && this.level >= 3) {
                let current = target;
                const chained = new Set([current]);
                const chainCount = evolved ? this.def.chainCount + 2 : this.def.chainCount;
                for (let c = 0; c < chainCount; c++) {
                    let nearest = null,
                        minD = Infinity;
                    // iter-16 perf: Lightning chain hops within 180 px, so
                    // a per-hop spatial probe of the same radius is the
                    // exact set we want. Drops chain cost from O(C × N) to
                    // O(C × cells_in_180px) which is small-constant on
                    // even the densest waves.
                    const hopCands = game?.spatial
                        ? game.spatial.queryRect(current.x, current.y, 180)
                        : game.enemies;
                    for (const e of hopCands) {
                        if (chained.has(e)) continue;
                        const d = Math.hypot(e.x - current.x, e.y - current.y);
                        if (d < 180 && d < minD) {
                            minD = d;
                            nearest = e;
                        }
                    }
                    if (!nearest) break;
                    nearest.takeDamage(dmg * 0.7);
                    game.createParticles(nearest.x, nearest.y, '#ffff66', 8);
                    chained.add(nearest);
                    current = nearest;
                }
            }
        }
        game.audio.shoot();
    }

    _fireAura(player, game) {
        const range = this.getRange(player);
        const dmg = this.getDamage(player);
        // iter-16 perf: cells overlapping the aura radius only. Aura is
        // called every cooldown tick (~1s default) so the savings stack up.
        const candidates = game?.spatial
            ? game.spatial.queryRect(player.x, player.y, range)
            : game.enemies;
        for (const enemy of candidates) {
            const d = Math.hypot(enemy.x - player.x, enemy.y - player.y);
            if (d < range) enemy.takeDamage(dmg);
        }
        if (Math.random() < 0.4) {
            const a = Math.random() * Math.PI * 2;
            const r = Math.random() * range;
            game.createParticles(
                player.x + Math.cos(a) * r,
                player.y + Math.sin(a) * r,
                '#88ff88',
                1
            );
        }
    }

    _fireMine(player, game) {
        const radius = this.getRange(player);
        const dmg = this.getDamage(player);
        const fuse = this.def.fuse || 1.2;
        game.mines = game.mines || [];
        game.mines.push(new Mine(player.x, player.y, radius, dmg, fuse));
        if (this.isEvolved()) {
            // Cluster: second mine offset slightly
            const a = Math.random() * Math.PI * 2;
            game.mines.push(
                new Mine(
                    player.x + Math.cos(a) * 60,
                    player.y + Math.sin(a) * 60,
                    radius * 0.8,
                    dmg,
                    fuse
                )
            );
        }
        game.audio?.shoot?.();
    }

    /**
     * Frost Nova: radial burst centred on the hero that damages every foe
     * within `range` and applies a timed slow. Evolved variant fires a
     * second delayed ring at 60% strength for a staggered AOE.
     */
    _fireNova(player, game) {
        const range = this.getRange(player);
        const baseDmg = this.getDamage(player);
        const slowPct = this.def.slowPct ?? 0.5;
        const slowDur = this.def.slowDuration ?? 1.2;
        // iter-16 perf: spatial probe instead of a full enemy walk. Nova has
        // a fairly wide range (~range+nova default), so several cells are
        // visited each fire — but in dense waves this still shaves >70%
        // of the per-enemy hypot() calls.
        const candidates = game?.spatial
            ? game.spatial.queryRect(player.x, player.y, range)
            : game.enemies;
        for (const enemy of candidates) {
            const d = Math.hypot(enemy.x - player.x, enemy.y - player.y);
            if (d < range) {
                const dmg = this._rollCrit(player, game, baseDmg, enemy.x, enemy.y - 20, '#88ddff');
                enemy.takeDamage(dmg);
                // Slow is cooperative: entities.js reads `slowTimer` / `slowPct`.
                if (!enemy.slowTimer || enemy.slowTimer < slowDur) {
                    enemy.slowTimer = slowDur;
                    enemy.slowPct = slowPct;
                }
            }
        }
        game.createParticles(player.x, player.y, '#aaeeff', 24);
        if (this.isEvolved()) {
            // Queue a follow-up pulse ~0.4s later, at 60% damage. Goes through
            // the effects layer so it pauses with the game / tab visibility,
            // unlike a wall-clock setTimeout. Captures `range`/`baseDmg` at
            // fire-time so a stat change between pulses doesn't retro-buff.
            const r = range;
            const d2 = baseDmg * 0.6;
            game.effects?.schedule?.(0.4, () => {
                if (!game.player || game.player.dead) return;
                // iter-16 perf: spatial probe for the delayed pulse too —
                // by the time it fires the enemy roster may have grown,
                // and the linear scan was the dominant cost on tundra
                // when the player held an evolved nova during a heavy wave.
                const cands = game?.spatial
                    ? game.spatial.queryRect(player.x, player.y, r)
                    : game.enemies;
                for (const e of cands) {
                    const d = Math.hypot(e.x - player.x, e.y - player.y);
                    if (d < r) e.takeDamage(d2);
                }
                game.createParticles(player.x, player.y, '#88ccff', 16);
            });
        }
        game.audio?.shoot?.();
    }

    /**
     * Soul Drain: short-range tether to the nearest foe. Ticks damage each
     * fire, and heals the hero for `lifestealPct × damageDealt`. Evolved
     * variant drains two foes simultaneously.
     */
    _fireDrain(player, game) {
        const range = this.getRange(player);
        const baseDmg = this.getDamage(player);
        const steal = this.def.lifestealPct ?? 0.25;
        const targetCount = this.isEvolved() ? 2 : 1;
        const targets = [];
        // Pick nearest N enemies within range.
        const nearby = game.enemies
            .filter((e) => Math.hypot(e.x - player.x, e.y - player.y) < range)
            .sort(
                (a, b) =>
                    Math.hypot(a.x - player.x, a.y - player.y) -
                    Math.hypot(b.x - player.x, b.y - player.y)
            );
        for (let i = 0; i < targetCount && i < nearby.length; i++) targets.push(nearby[i]);
        if (!targets.length) return;
        let totalDmg = 0;
        for (const e of targets) {
            const dmg = this._rollCrit(player, game, baseDmg, e.x, e.y - 16, '#ff66aa');
            e.takeDamage(dmg);
            totalDmg += dmg;
            // Cheap "tether" visual = particle streak.
            game.createParticles((player.x + e.x) / 2, (player.y + e.y) / 2, '#ff88cc', 2);
        }
        if (player.heal) player.heal(totalDmg * steal);
    }
}
