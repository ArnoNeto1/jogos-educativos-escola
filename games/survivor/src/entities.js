/**
 * @module entities
 * @description Runtime entity classes — everything with `update(dt)` /
 * `render(ctx)` lifecycle methods lives here. All physics is frame-rate
 * independent (delta-time in seconds), and per-class state is owned, never
 * shared.
 *
 * Dependencies: `./config.js`, `./data.js`. The Weapon class is injected at
 * boot via `registerWeaponClass()` to break a circular import.
 *
 * Exports:
 *   - class Player, Enemy, Projectile, EnemyProjectile, ExpOrb,
 *           Particle, FloatingText, OrbitShard, Mine
 *   - findEnemyDef(id) — lookup helper
 *   - registerWeaponClass(cls) — DI for Weapon to avoid circular imports
 */

import { CONFIG } from './config.js';
import { ENEMIES } from './data.js';

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.PLAYER_SIZE;
        this.baseMaxHp = 100;
        this.maxHp = this.baseMaxHp;
        this.hp = this.baseMaxHp;
        this.level = 1;
        this.exp = 0;
        this.expToNext = 50;
        this.weapons = [];
        this.passives = Object.create(null);
        this.invincible = false;
        this.invincibleTimer = 0;
        this.dead = false;
        this.unhitTimer = 0; // seconds since last damage taken
    }

    update(dt, game) {
        // Movement ---------------------------------------------------------
        const v = game.input.getMoveVector();
        // iter-14: stage modifier (e.g. tundra applies 0.9 here for icy
        // footing). Defaults to 1 when no stage modifiers are present so
        // forest/crypt and unit tests that don't construct a full Game still
        // behave identically to v2.6.
        const stageSpeedMult = game.stageMods?.playerSpeedMult ?? 1;
        const speed = CONFIG.PLAYER_SPEED * this.getSpeedMult() * stageSpeedMult;
        this.x += v.x * speed * dt;
        this.y += v.y * speed * dt;

        // Clamp to the playable arena. iter-10 introduced a scrolling camera,
        // so the bound is now the arena (2400×1600), not the viewport. Without
        // this clamp the player walks off into invisible space and the run
        // becomes unplayable. See docs/RUNTIME_QA_REPORT.md.
        const r = this.size;
        const W = CONFIG.ARENA_WIDTH ?? CONFIG.CANVAS_WIDTH;
        const H = CONFIG.ARENA_HEIGHT ?? CONFIG.CANVAS_HEIGHT;
        if (this.x < r) this.x = r;
        else if (this.x > W - r) this.x = W - r;
        if (this.y < r) this.y = r;
        else if (this.y > H - r) this.y = H - r;

        // Weapons ----------------------------------------------------------
        for (const w of this.weapons) w.update(dt, this, game);

        // I-frames ---------------------------------------------------------
        if (this.invincible) {
            this.invincibleTimer -= dt;
            if (this.invincibleTimer <= 0) this.invincible = false;
        }

        // Regen ------------------------------------------------------------
        const regen = this._passiveSum('hpRegen');
        if (regen) this.heal(regen * dt);

        // Untouchable streak timer.
        this.unhitTimer += dt;
        if (game.run) {
            if (this.unhitTimer > (game.run.longestUnhit || 0)) {
                game.run.longestUnhit = this.unhitTimer;
            }
        }
    }

    addPassive(def) {
        this.passives[def.id] ??= { def, count: 0 };
        if (this.passives[def.id].count >= CONFIG.PASSIVE_MAX_STACK) return;
        this.passives[def.id].count++;
        this.recalculateStats();
    }

    _passiveSum(key) {
        let total = 0;
        for (const id in this.passives) {
            const p = this.passives[id];
            if (p.def.effect[key] !== undefined) total += p.def.effect[key] * p.count;
        }
        return total;
    }

    _passiveMult(key) {
        let mult = 1;
        for (const id in this.passives) {
            const p = this.passives[id];
            if (p.def.effect[key] !== undefined) mult *= Math.pow(1 + p.def.effect[key], p.count);
        }
        return mult;
    }

    recalculateStats() {
        const prevMaxHp = this.maxHp;
        this.maxHp = this.baseMaxHp * this._passiveMult('maxHpMult');
        this.hp += this.maxHp - prevMaxHp;
        this.hp = Math.min(this.hp, this.maxHp);
    }

    getDamageMult() {
        return this._passiveMult('damageMult');
    }
    getAreaMult() {
        return this._passiveMult('areaMult');
    }
    getCooldownMult() {
        // cooldownMult.effect is negative (-0.08 => 8% faster). Multiply safely.
        let mult = 1;
        for (const id in this.passives) {
            const p = this.passives[id];
            const v = p.def.effect.cooldownMult;
            if (v !== undefined) mult *= Math.pow(1 + v, p.count);
        }
        return Math.max(0.2, mult);
    }
    getSpeedMult() {
        return this._passiveMult('speedMult');
    }
    getExpMult() {
        return this._passiveMult('expMult');
    }
    getMagnetRange() {
        let mult = 1;
        for (const id in this.passives) {
            const p = this.passives[id];
            const v = p.def.effect.magnetMult;
            if (v !== undefined) mult *= Math.pow(1 + v, p.count);
        }
        return CONFIG.MAGNET_BASE * mult;
    }
    getArmor() {
        return this._passiveSum('armor');
    }
    getCritChance() {
        return this._passiveSum('critChance');
    }
    /**
     * iter-14: dodge chance from the new Evasion passive. Soft-capped at 60%
     * so a player who stacks five copies still gets hit sometimes — full
     * immortality would break the late-game balance entirely.
     */
    getDodgeChance() {
        return Math.min(0.6, this._passiveSum('dodgeChance'));
    }
    /**
     * iter-14: percentage damage reduction (Bulwark). Multiplies *after*
     * armor subtraction, soft-capped at 60% for the same reason as dodge.
     */
    getDamageReduction() {
        return Math.min(0.6, this._passiveSum('damageReduction'));
    }

    gainExp(amount) {
        this.exp += amount * this.getExpMult();
        const levelUps = [];
        while (this.exp >= this.expToNext) {
            this.exp -= this.expToNext;
            this.level++;
            this.expToNext = Math.floor(this.expToNext * 1.2);
            this.hp = Math.min(this.hp + 20, this.maxHp);
            levelUps.push(this.level);
        }
        return levelUps;
    }

    takeDamage(damage, game) {
        if (this.invincible || this.dead) return;
        // iter-14: dodge fires *before* armor / damageReduction so a dodged
        // hit also doesn't burn an invincibility window — feels like the hit
        // missed entirely. We still emit a "Miss!" floater so the player
        // gets feedback that the passive triggered.
        const dodge = this.getDodgeChance();
        if (dodge > 0 && Math.random() < dodge) {
            game?.createFloatingText?.('Esquiva!', this.x, this.y - 30, '#88ffcc');
            return;
        }
        const afterArmor = Math.max(1, damage - this.getArmor());
        const taken = Math.max(1, afterArmor * (1 - this.getDamageReduction()));
        this.hp -= taken;
        this.invincible = true;
        this.invincibleTimer = CONFIG.INVINCIBILITY_TIME;
        this.unhitTimer = 0;
        // Authoritative no-hit flag: once set, it stays set for the rest of
        // the run. Replaces the older `unhitTimer >= gameTime` proxy which
        // could misfire on fractional-second deaths.
        if (game?.run) game.run.tookAnyDamage = true;
        game?.onPlayerHurt?.(taken);
        if (this.hp <= 0) {
            this.hp = 0;
            this.dead = true;
        }
    }

    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHp);
    }

    render(ctx) {
        // Don't make the player fully disappear during i-frames: strobe alpha.
        const strobe = this.invincible
            ? Math.floor(performance.now() / 60) % 2 === 0
                ? 0.4
                : 1
            : 1;
        ctx.save();
        ctx.globalAlpha = strobe;

        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.2);
        grad.addColorStop(0, 'rgba(100,200,255,0.35)');
        grad.addColorStop(1, 'rgba(100,200,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#44aaff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#cfeaff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // Garlic aura ring
        const garlic = this.weapons.find((w) => w.id === 'garlic');
        if (garlic) {
            const range = garlic.getRange(this);
            const t = performance.now() / 400;
            ctx.strokeStyle = `rgba(160,255,160,${0.25 + Math.sin(t) * 0.08})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, range, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
}

// Kept for API compatibility (previously injected the Weapon class).
export function registerWeaponClass(_cls) {
    /* noop */
}

// ---------------------------------------------------------------------------
// Enemy
// ---------------------------------------------------------------------------
export class Enemy {
    constructor(x, y, type, hpMult, dmgMult) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = type.size;
        this.maxHp = type.hp * hpMult;
        this.hp = this.maxHp;
        this.speed = type.speed;
        this.damage = type.damage * dmgMult;
        this.expValue = type.exp;
        this.color = type.color;
        this.id = type.id;
        this.boss = !!type.boss;
        this.flashTimer = 0;
        this.ability = type.ability;
        this.abilityTimer = 3;

        // Archetype state
        this.archetype = type.archetype || 'chaser';
        this.ranged = !!type.ranged;
        this.splitter = !!type.splitter;
        this.dasher = !!type.dasher;
        this.shielded = !!type.shielded;
        this.bomber = !!type.bomber;
        this.illusionist = !!type.illusionist;

        this.fireTimer = type.fireCooldown ? type.fireCooldown * (0.5 + Math.random() * 0.5) : 0;
        this.dashTimer = type.dashInterval ? type.dashInterval * (0.3 + Math.random() * 0.7) : 0;
        this.dashActive = 0;
        this.dashAngle = 0;
        this.shieldHp = type.shieldHp ? type.shieldHp * hpMult : 0;
        // Bomber fuse (armed only when close to player).
        this.fuseTimer = 0;
        this.fuseArmed = false;
        // Illusionist clone cooldown (jittered so the wave doesn't sync).
        this.cloneTimer = type.cloneCooldown ? type.cloneCooldown * (0.6 + Math.random() * 0.8) : 0;
        // Frost Nova slow. `slowTimer` > 0 scales movement by (1 - slowPct).
        this.slowTimer = 0;
        this.slowPct = 0;
        // Flag used to mark clone-spawned enemies so they don't re-clone.
        this.isClone = false;
    }

    update(dt, game) {
        const dx = game.player.x - this.x;
        const dy = game.player.y - this.y;
        const d = Math.hypot(dx, dy);
        let vx = 0,
            vy = 0;
        const tx = d > 0.01 ? dx / d : 0;
        const ty = d > 0.01 ? dy / d : 0;

        // Decay slow timer.
        if (this.slowTimer > 0) this.slowTimer -= dt;
        const slowMult = this.slowTimer > 0 ? 1 - (this.slowPct || 0) : 1;

        // --- Bomber: chase normally until close, then fuse + detonate. ---
        if (this.bomber) {
            const fuseRange = this.type.fuseRange || 80;
            if (d < fuseRange) {
                this.fuseArmed = true;
            }
            if (this.fuseArmed) {
                this.fuseTimer += dt;
                if (this.fuseTimer >= (this.type.fuseTime || 1.4)) {
                    const br = this.type.blastRadius || 120;
                    const bd = (this.type.blastDamage || 40) * (game.enemyDmgMult || 1);
                    // Damage player if in range.
                    const pd = Math.hypot(game.player.x - this.x, game.player.y - this.y);
                    if (pd < br && !game.player.invincible) {
                        game.player.takeDamage(bd, game);
                        game.createFloatingText(
                            Math.round(bd),
                            game.player.x,
                            game.player.y - 28,
                            '#ff4433'
                        );
                    }
                    game.createParticles(this.x, this.y, '#ff8833', 24);
                    game.shake?.(0.25);
                    game.audio?.explosion?.();
                    this.hp = 0; // self-destruct
                    return;
                }
            }
            vx = tx * this.speed * slowMult;
            vy = ty * this.speed * slowMult;
            this.x += vx * dt;
            this.y += vy * dt;
            if (this.flashTimer > 0) this.flashTimer -= dt;
            return;
        }

        // --- Illusionist: chaser that periodically spawns 2 clones. -----
        if (this.illusionist && !this.isClone) {
            this.cloneTimer -= dt;
            if (this.cloneTimer <= 0 && game.enemies.length < CONFIG.MAX_ENEMIES) {
                this.cloneTimer = this.type.cloneCooldown || 5.5;
                const n = this.type.cloneCount || 2;
                for (let i = 0; i < n; i++) {
                    const a = (i / n) * Math.PI * 2 + Math.random() * 0.4;
                    const clone = new Enemy(
                        this.x + Math.cos(a) * 24,
                        this.y + Math.sin(a) * 24,
                        this.type,
                        this.maxHp / Math.max(1, this.type.hp),
                        (game.enemyDmgMult || 1) * 0.6
                    );
                    clone.isClone = true;
                    clone.hp = Math.max(8, this.type.hp * 0.4);
                    clone.maxHp = clone.hp;
                    // Keep the signature purple, but a touch paler so they read as illusions.
                    clone.color = '#e0b0ff';
                    game.enemies.push(clone);
                }
                game.createParticles(this.x, this.y, '#cc88ff', 12);
            }
        }

        if (this.ranged && this.type.keepDistance) {
            // Stay at preferred range: advance when far, retreat when close.
            const keep = this.type.keepDistance;
            const dir = d > keep + 30 ? 1 : d < keep - 30 ? -1 : 0;
            vx = tx * this.speed * dir * slowMult;
            vy = ty * this.speed * dir * slowMult;
            // Fire if in range and off cooldown.
            this.fireTimer -= dt;
            if (this.fireTimer <= 0 && d < this.type.firingRange) {
                const ang = Math.atan2(dy, dx);
                const pspeed = this.type.projectileSpeed || 220;
                game.enemyProjectiles = game.enemyProjectiles || [];
                game.enemyProjectiles.push(
                    new EnemyProjectile(
                        this.x,
                        this.y,
                        ang,
                        pspeed,
                        this.type.projectileDamage * (game.enemyDmgMult || 1)
                    )
                );
                this.fireTimer = this.type.fireCooldown || 2;
                game.audio?.shoot?.();
            }
        } else if (this.dasher) {
            this.dashTimer -= dt;
            if (this.dashActive > 0) {
                this.dashActive -= dt;
                vx = Math.cos(this.dashAngle) * (this.type.dashSpeed || 300) * slowMult;
                vy = Math.sin(this.dashAngle) * (this.type.dashSpeed || 300) * slowMult;
            } else if (this.dashTimer <= 0) {
                this.dashAngle = Math.atan2(dy, dx);
                this.dashActive = this.type.dashDuration || 0.5;
                this.dashTimer = this.type.dashInterval || 3.5;
            } else {
                vx = tx * this.speed * slowMult;
                vy = ty * this.speed * slowMult;
            }
        } else {
            vx = tx * this.speed * slowMult;
            vy = ty * this.speed * slowMult;
        }

        this.x += vx * dt;
        this.y += vy * dt;

        if (this.flashTimer > 0) this.flashTimer -= dt;

        if (this.boss) {
            this.abilityTimer -= dt;
            if (this.abilityTimer <= 0) {
                this.abilityTimer = this.ability === 'summon' ? 6 : 4.5;
                game.onBossAbility?.(this);
            }
        }
    }

    takeDamage(damage) {
        let dmg = damage;
        if (this.shielded && this.shieldHp > 0) {
            const reduction = this.type.damageReduction ?? 0.5;
            dmg = damage * (1 - reduction);
            this.shieldHp -= damage * reduction;
            if (this.shieldHp <= 0) {
                this.shieldHp = 0;
                this.shielded = false;
            }
        }
        this.hp -= dmg;
        this.flashTimer = 0.08;
    }

    render(ctx) {
        ctx.save();
        // Slowed foes get a cold cast.
        if (this.flashTimer > 0) {
            ctx.fillStyle = '#ffffff';
        } else if (this.slowTimer > 0) {
            ctx.fillStyle = '#88ccff';
        } else if (this.bomber && this.fuseArmed) {
            // Blink red while the fuse is burning.
            const blink = Math.floor(performance.now() / 120) % 2 === 0;
            ctx.fillStyle = blink ? '#ffffff' : this.color;
        } else {
            ctx.fillStyle = this.color;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Shield ring
        if (this.shielded && this.shieldHp > 0) {
            ctx.strokeStyle = 'rgba(160,200,255,0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
            ctx.stroke();
        }

        // HP bar
        const pct = Math.max(0, this.hp / this.maxHp);
        const w = this.boss ? 80 : 30;
        ctx.fillStyle = '#222';
        ctx.fillRect(this.x - w / 2, this.y - this.size - 10, w, 4);
        ctx.fillStyle = pct > 0.5 ? '#44ff44' : pct > 0.25 ? '#ffaa33' : '#ff4444';
        ctx.fillRect(this.x - w / 2, this.y - this.size - 10, w * pct, 4);

        if (this.boss) {
            // iter-14: IceQueen wears a frosty cyan halo + a faint inner ring
            // so she reads as "the ice variant" at a glance even from across
            // the arena. Other bosses keep the original magenta crown.
            if (this.type?.iceQueen) {
                ctx.strokeStyle = 'rgba(170,220,255,0.85)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
                ctx.stroke();
                ctx.strokeStyle = 'rgba(220,240,255,0.45)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size + 10, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                ctx.strokeStyle = '#ff33aa';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        ctx.restore();
    }
}

// ---------------------------------------------------------------------------
// EnemyProjectile (fired by ranged archetypes). Simple straight-line shot.
// ---------------------------------------------------------------------------
export class EnemyProjectile {
    constructor(x, y, angle, speed, damage) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.damage = damage;
        this.life = 3;
        this.size = 6;
        this.shouldRemove = false;
    }
    update(dt, game) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt;
        if (this.life <= 0) {
            this.shouldRemove = true;
            return;
        }
        const p = game.player;
        const d = Math.hypot(this.x - p.x, this.y - p.y);
        if (d < p.size + this.size) {
            if (!p.invincible) {
                p.takeDamage(this.damage, game);
                game.createFloatingText(Math.round(this.damage), p.x, p.y - 30, '#ff6644');
            }
            this.shouldRemove = true;
        }
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = '#ff44aa';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ---------------------------------------------------------------------------
// Projectile
// ---------------------------------------------------------------------------
export class Projectile {
    constructor(x, y, angle, def, damage, level, player) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.angle = angle;
        this.def = def;
        this.damage = damage;
        this.level = level;
        this.size = 8;
        this.speed = def.speed || 300;
        this.piercing = !!def.piercing;
        this.homing = !!def.homing;
        this.arc = !!def.arc;
        this.boomerang = !!def.boomerang;
        this.explode = !!def.explode;
        this.explodeRadius = def.explodeRadius || 60;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.life = 4; // seconds
        this.hitEnemies = new Set();
        this.shouldRemove = false;
        this.travelDist = 0;
        this.maxDist = (def.baseRange || 300) * (player ? player.getAreaMult() : 1);
        this.id = def.id;
    }

    update(dt, game) {
        if (this.homing && this.hitEnemies.size === 0) {
            const target = game.spatial.findNearestEnemy(this.x, this.y, 9999);
            if (target) {
                const ta = Math.atan2(target.y - this.y, target.x - this.x);
                let diff = ta - this.angle;
                while (diff > Math.PI) diff -= Math.PI * 2;
                while (diff < -Math.PI) diff += Math.PI * 2;
                this.angle += diff * Math.min(1, 6 * dt);
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
            }
        }

        if (this.arc) {
            this.vy += 420 * dt; // gravity
        }

        if (this.boomerang) {
            const d = Math.hypot(this.x - this.startX, this.y - this.startY);
            if (d > this.maxDist * 0.5) {
                const ra = Math.atan2(game.player.y - this.y, game.player.x - this.x);
                this.vx = Math.cos(ra) * this.speed;
                this.vy = Math.sin(ra) * this.speed;
            }
        }

        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.travelDist += Math.hypot(this.vx, this.vy) * dt;
        this.life -= dt;

        if (this.travelDist > this.maxDist || this.life <= 0) {
            this._onEnd(game);
            this.shouldRemove = true;
        }

        if (this.boomerang) {
            const dp = Math.hypot(this.x - game.player.x, this.y - game.player.y);
            if (dp < 24 && this.travelDist > 60) {
                this._onEnd(game);
                this.shouldRemove = true;
            }
        }
    }

    _onEnd(game) {
        if (this.explode) {
            game.audio.explosion();
            // iter-16 perf: probe the spatial hash for the blast cells. The
            // explodeRadius is bounded (config BOMBER_DEFAULT_RADIUS = 120),
            // so only a handful of cells are visited even on very dense waves.
            const cands = game?.spatial
                ? game.spatial.queryRect(this.x, this.y, this.explodeRadius)
                : game.enemies;
            for (const enemy of cands) {
                const d = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                if (d < this.explodeRadius) enemy.takeDamage(this.damage * 0.6);
            }
            game.createParticles(this.x, this.y, '#ff8800', 20);
            game.shake(0.15);
        }
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        switch (this.id) {
            case 'knife':
                ctx.fillStyle = '#e0e6ee';
                ctx.fillRect(-12, -2, 24, 4);
                break;
            case 'magic_wand':
                ctx.fillStyle = '#aa66ff';
                ctx.beginPath();
                ctx.arc(0, 0, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.beginPath();
                ctx.arc(-2, -2, 2.2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'axe':
                ctx.fillStyle = '#b0b5b8';
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 'cross':
                ctx.fillStyle = '#fff3a0';
                ctx.fillRect(-10, -3, 20, 6);
                ctx.fillRect(-3, -10, 6, 20);
                break;
            case 'fire_wand':
                ctx.fillStyle = '#ff6600';
                ctx.beginPath();
                ctx.arc(0, 0, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffcc00';
                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, Math.PI * 2);
                ctx.fill();
                break;
            default:
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, Math.PI * 2);
                ctx.fill();
        }
        ctx.restore();
    }
}

// ---------------------------------------------------------------------------
// OrbitShard: circles the hero and deals damage on contact. Managed by the
// Orbit weapon, which owns a set of shards and updates them each tick.
// ---------------------------------------------------------------------------
export class OrbitShard {
    constructor(weapon, index, total, radius, damage) {
        this.weapon = weapon;
        this.index = index;
        this.total = total;
        this.radius = radius;
        this.damage = damage;
        this.angle = (index / total) * Math.PI * 2;
        this.hitTimers = new Map(); // enemy -> cooldown
        this.x = 0;
        this.y = 0;
    }
    update(dt, player, game) {
        this.angle += dt * 2.4; // rad/sec
        this.x = player.x + Math.cos(this.angle) * this.radius;
        this.y = player.y + Math.sin(this.angle) * this.radius;
        // Tick cooldowns down.
        for (const [enemy, t] of this.hitTimers) {
            const nt = t - dt;
            if (nt <= 0) this.hitTimers.delete(enemy);
            else this.hitTimers.set(enemy, nt);
        }
        // Broad-phase via spatial hash. The query radius adapts to whatever
        // the largest enemy in the bucket might be (boss is 64) plus the
        // shard's own visual radius — no more fixed 40 px that misses bosses.
        const SHARD_HIT = 10; // matches shard core in render()
        const queryR = SHARD_HIT + 64; // 64 = largest enemy.size in data.js
        for (const e of game.spatial.queryRect(this.x, this.y, queryR)) {
            if (this.hitTimers.has(e)) continue;
            const d = Math.hypot(e.x - this.x, e.y - this.y);
            if (d < (e.size || 12) + SHARD_HIT) {
                e.takeDamage(this.damage);
                this.hitTimers.set(e, 0.5);
                game.createFloatingText(Math.round(this.damage), e.x, e.y - 18, '#ffffcc');
            }
        }
    }
    render(ctx) {
        ctx.save();
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 14);
        g.addColorStop(0, 'rgba(255,240,180,0.85)');
        g.addColorStop(1, 'rgba(255,240,180,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff1a8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
// ---------------------------------------------------------------------------
// Mine: dropped at the hero's location, arms during `fuse` then detonates.
// ---------------------------------------------------------------------------
export class Mine {
    constructor(x, y, radius, damage, fuse) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.damage = damage;
        this.fuse = fuse;
        this.maxFuse = fuse;
        this.shouldRemove = false;
    }
    update(dt, game) {
        this.fuse -= dt;
        if (this.fuse <= 0) {
            // iter-16 perf: spatial probe instead of game.enemies walk.
            // A radius mine fired in a tundra cluster used to hypot()-test
            // every enemy alive — now we only test the cells overlapping
            // the blast radius.
            const cands = game?.spatial
                ? game.spatial.queryRect(this.x, this.y, this.radius)
                : game.enemies;
            for (const enemy of cands) {
                const d = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                if (d < this.radius) {
                    enemy.takeDamage(this.damage);
                    game.createFloatingText(
                        Math.round(this.damage),
                        enemy.x,
                        enemy.y - 20,
                        '#ff9944'
                    );
                }
            }
            game.createParticles(this.x, this.y, '#ff8833', 20);
            game.shake(0.25);
            game.audio?.explosion?.();
            this.shouldRemove = true;
        }
    }
    render(ctx) {
        const armed = this.fuse < this.maxFuse * 0.5;
        const pulse = armed ? 0.5 + Math.sin(performance.now() / 60) * 0.5 : 0.3;
        ctx.save();
        ctx.fillStyle = `rgba(255,80,80,${0.25 + pulse * 0.35})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = armed ? '#ff4444' : '#aa4444';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }
}

// ---------------------------------------------------------------------------
// Exp Orb
// ---------------------------------------------------------------------------
export class ExpOrb {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.size = 4 + Math.log(value + 1) * 1.5;
        this.shouldRemove = false;
        this.magnetSpeed = 0;
        this.life = CONFIG.EXP_ORB_LIFETIME;
    }

    update(dt, game) {
        this.life -= dt;
        if (this.life <= 0) {
            this.shouldRemove = true;
            return;
        }
        const p = game.player;
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        const d = Math.hypot(dx, dy);
        const mag = p.getMagnetRange();

        if (d < CONFIG.PICKUP_DISTANCE) {
            p.gainExp(this.value);
            game.createFloatingText(`+${this.value}XP`, p.x, p.y - 40, '#66bbff');
            game.audio.pickup();
            if (game.run) game.run.orbsCollected = (game.run.orbsCollected || 0) + 1;
            this.shouldRemove = true;
            return;
        }
        if (d < mag) {
            this.magnetSpeed = Math.min(this.magnetSpeed + 600 * dt, 560);
            this.x += (dx / d) * this.magnetSpeed * dt;
            this.y += (dy / d) * this.magnetSpeed * dt;
        }
    }

    render(ctx) {
        const a = this.life < 2 ? Math.max(0, this.life / 2) : 1;
        ctx.save();
        ctx.globalAlpha = a;
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.2);
        g.addColorStop(0, 'rgba(100,180,255,0.55)');
        g.addColorStop(1, 'rgba(100,180,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7ab8ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ---------------------------------------------------------------------------
// Particle / FloatingText
// ---------------------------------------------------------------------------
export class Particle {
    constructor(x, y, color, opts = {}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = opts.size ?? Math.random() * 4 + 2;
        this.life = opts.life ?? 1;
        this.decay = opts.decay ?? Math.random() * 1.5 + 1;
        const a = opts.angle ?? Math.random() * Math.PI * 2;
        const s = opts.speed ?? Math.random() * 180 + 60;
        this.vx = Math.cos(a) * s;
        this.vy = Math.sin(a) * s;
        this.friction = opts.friction ?? 0.2;
    }
    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vx *= Math.pow(this.friction, dt);
        this.vy *= Math.pow(this.friction, dt);
        this.life -= this.decay * dt;
        this.size *= Math.pow(0.3, dt);
    }
    render(ctx) {
        if (this.life <= 0) return;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

export class FloatingText {
    constructor(text, x, y, color, opts = {}) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = opts.life ?? 1;
        this.vy = opts.vy ?? -60;
        this.size = opts.size ?? 16;
        this.weight = opts.weight ?? 'bold';
        this.crit = !!opts.crit;
    }
    update(dt) {
        this.y += this.vy * dt;
        this.life -= 1.2 * dt;
    }
    render(ctx) {
        if (this.life <= 0) return;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        const sz = this.crit ? this.size * 1.6 : this.size;
        ctx.font = `${this.weight} ${sz}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        if (this.crit) {
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(this.text, this.x, this.y);
        }
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

// Helper: look up an enemy definition by id string.
export function findEnemyDef(id) {
    for (const def of Object.values(ENEMIES)) {
        if (def.id === id) return def;
    }
    return null;
}
