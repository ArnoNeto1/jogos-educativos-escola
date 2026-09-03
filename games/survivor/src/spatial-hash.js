/**
 * @module spatial-hash
 * @description Uniform-grid spatial hash for 2D broad-phase collision queries.
 * Insertion is O(1) per item (bucket push) and range queries are O(k) in the
 * number of items in the overlapping cells — a dramatic improvement over the
 * O(n²) pairwise scan that the game used in v1.x. Cell size is tuned to be
 * ~2× the largest common entity diameter so a single-cell probe usually
 * suffices. The module is decoupled from game types: buckets just store
 * whatever object you hand them, as long as each has numeric `.x` and `.y`.
 *
 * Layered on top of this class, `src/systems.js` re-exports a thin wrapper
 * tuned for enemies. This file is the authoritative implementation and is
 * the one exercised by the unit tests.
 *
 * Dependencies: none.
 *
 * Exports:
 *   - class SpatialHash
 */

export class SpatialHash {
    /**
     * @param {number} cell - cell edge length in world units (px). 64 is a
     *     good default for this game: matches the biggest non-boss enemy
     *     bounding box so most queries hit a single cell.
     */
    constructor(cell = 64) {
        this.cell = cell;
        /** @type {Map<string, Array<object>>} */
        this.map = new Map();
        this._size = 0;
    }

    /** Empty every bucket. Cheap and allocation-free. */
    clear() {
        this.map.clear();
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    _key(x, y) {
        return `${Math.floor(x / this.cell)},${Math.floor(y / this.cell)}`;
    }

    /**
     * Insert a single item. The caller owns the item reference; the hash just
     * indexes it for fast neighbour lookup. Items are NOT de-duplicated.
     */
    insert(item) {
        const k = this._key(item.x, item.y);
        let bucket = this.map.get(k);
        if (!bucket) {
            bucket = [];
            this.map.set(k, bucket);
        }
        bucket.push(item);
        this._size++;
    }

    /** Bulk-insert after a `clear()`. */
    insertAll(items) {
        this.clear();
        for (const it of items) this.insert(it);
    }

    /** @deprecated alias kept for backwards compatibility with v2.x callers. */
    insertEnemies(enemies) {
        this.insertAll(enemies);
    }

    /**
     * Iterate every item whose cell overlaps the square `(x±r, y±r)`. Results
     * may include items further than `r` from the query centre — callers must
     * do the exact distance check. The generator yields each item at most
     * once (cells don't overlap by construction).
     *
     * iter-16 perf: returns a plain array instead of a generator. V8 inlines
     * tight `for (const e of arr)` loops aggressively, and avoiding the
     * generator suspend/resume bookkeeping is measurably faster on hot
     * weapon-fire paths (Lightning's chain hops alone can call this dozens
     * of times per fire). Callers that destructure to `[...sh.queryRect()]`
     * still work because Array is iterable.
     */
    queryRect(x, y, r) {
        const c = this.cell;
        const x0 = Math.floor((x - r) / c);
        const x1 = Math.floor((x + r) / c);
        const y0 = Math.floor((y - r) / c);
        const y1 = Math.floor((y + r) / c);
        const out = [];
        for (let gx = x0; gx <= x1; gx++) {
            for (let gy = y0; gy <= y1; gy++) {
                const b = this.map.get(`${gx},${gy}`);
                if (b) {
                    for (let i = 0; i < b.length; i++) out.push(b[i]);
                }
            }
        }
        return out;
    }

    /**
     * Return the single closest item within `maxRange` (Euclidean distance),
     * or `null` if no bucket is populated within the search square.
     */
    findNearest(x, y, maxRange) {
        let best = null;
        let bestD = maxRange;
        for (const e of this.queryRect(x, y, maxRange)) {
            const d = Math.hypot(e.x - x, e.y - y);
            if (d < bestD) {
                bestD = d;
                best = e;
            }
        }
        return best;
    }

    /** Alias used throughout `weapons.js`/`entities.js`. */
    findNearestEnemy(x, y, maxRange) {
        return this.findNearest(x, y, maxRange);
    }

    /** Count cells currently holding at least one item (for diagnostics). */
    occupiedCellCount() {
        return this.map.size;
    }
}
