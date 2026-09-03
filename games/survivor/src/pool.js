/**
 * @module pool
 * @description Generic object pool used to tame GC pressure for the most
 * churny runtime entities — `FloatingText`, `Particle`, `EnemyProjectile`.
 * The game spawns and discards dozens of these per second; without a pool
 * the young-generation minor GCs add up to visible frame-time spikes on
 * low-end devices. A pool is a free-list: allocate once, recycle forever.
 *
 * The contract is intentionally thin:
 *   - `factory()`   -> a fresh instance, called only when the pool is empty.
 *   - `reset(obj)`  -> brings the instance back to a known-good initial
 *                      state; called just before handing it back to the
 *                      caller in `acquire()`.
 *
 * `release(obj)` is a no-op if the pool is already at `maxSize` so a burst
 * of late-game spawns won't blow up heap usage forever.
 *
 * Dependencies: none.
 *
 * Exports:
 *   - class Pool
 *   - function resetFloatingText, resetParticle, resetEnemyProjectile
 */

export class Pool {
    /**
     * @param {() => any} factory          builds a brand-new object
     * @param {(obj: any, ...args: any[]) => void} [reset]   re-inits before re-use
     * @param {{ maxSize?: number, prealloc?: number }} [opts]
     */
    constructor(factory, reset, opts = {}) {
        if (typeof factory !== 'function') {
            throw new TypeError('Pool: factory must be a function');
        }
        this.factory = factory;
        this.reset = typeof reset === 'function' ? reset : null;
        this.maxSize = opts.maxSize ?? 512;
        /** @type {any[]} */
        this.free = [];
        this.acquired = 0;
        this.created = 0;
        const pre = Math.min(opts.prealloc ?? 0, this.maxSize);
        for (let i = 0; i < pre; i++) {
            this.free.push(factory());
            this.created++;
        }
    }

    /**
     * Get an object. Uses a free-list entry when available, otherwise creates
     * a fresh instance via `factory()`. Any extra args are forwarded to the
     * optional `reset()` re-initialiser — mimic a constructor signature.
     */
    acquire(...args) {
        let obj = this.free.pop();
        if (!obj) {
            obj = this.factory();
            this.created++;
        }
        if (this.reset) this.reset(obj, ...args);
        this.acquired++;
        return obj;
    }

    /** Return an object to the pool. Drops the reference if we're at cap. */
    release(obj) {
        if (!obj) return;
        if (this.free.length >= this.maxSize) return;
        this.free.push(obj);
        this.acquired = Math.max(0, this.acquired - 1);
    }

    /** Snapshot of the pool state (handy for tests / dev HUD). */
    stats() {
        return {
            free: this.free.length,
            acquired: this.acquired,
            created: this.created,
            maxSize: this.maxSize
        };
    }

    /** Drop every pooled instance. The pool is still usable afterwards. */
    clear() {
        this.free.length = 0;
    }
}

// ---------------------------------------------------------------------------
// Reset helpers for the concrete entity classes. Placed here (rather than in
// entities.js) so the pool module is self-contained for unit testing.
// ---------------------------------------------------------------------------

export function resetFloatingText(obj, text, x, y, color, opts = {}) {
    obj.text = text;
    obj.x = x;
    obj.y = y;
    obj.color = color;
    obj.life = opts.life ?? 1;
    obj.vy = opts.vy ?? -60;
    obj.size = opts.size ?? 16;
    obj.weight = opts.weight ?? 'bold';
    obj.crit = !!opts.crit;
}

export function resetParticle(obj, x, y, color, opts = {}) {
    obj.x = x;
    obj.y = y;
    obj.color = color;
    obj.size = opts.size ?? Math.random() * 4 + 2;
    obj.life = opts.life ?? 1;
    obj.decay = opts.decay ?? Math.random() * 1.5 + 1;
    const a = opts.angle ?? Math.random() * Math.PI * 2;
    const s = opts.speed ?? Math.random() * 180 + 60;
    obj.vx = Math.cos(a) * s;
    obj.vy = Math.sin(a) * s;
    obj.friction = opts.friction ?? 0.2;
}

export function resetEnemyProjectile(obj, x, y, angle, speed, damage) {
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(angle) * speed;
    obj.vy = Math.sin(angle) * speed;
    obj.damage = damage;
    obj.life = 3;
    obj.size = 6;
    obj.shouldRemove = false;
}
