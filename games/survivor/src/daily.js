/**
 * @module daily
 * @description Daily-challenge scaffolding. Builds a deterministic seed from
 * the UTC date, pins the stage + boss schedule, and persists per-day results
 * in localStorage with a 14-day rolling window. The Wordle-style share string
 * is generated here too so the UI module stays render-only.
 *
 * Dependencies: `./stages.js` (default stage when none supplied), `./storage.js`
 * (only the in-memory fallback usable check — we read/write the daily slot
 * directly so the regular save isn't bloated).
 *
 * Exports:
 *   - cyrb53(str, seed)            → 53-bit hash (uint53)
 *   - todayKey()                   → 'YYYY-MM-DD' in UTC
 *   - dailySeed(dateStr)           → uint32 seed for SeededRng
 *   - dailyChallenge(dateStr)      → { date, seed, stage, bossOffsets, ... }
 *   - loadDailyHistory()           → { 'YYYY-MM-DD-stage': entry, ... }
 *   - saveDailyResult(entry)       → void (also prunes >14d)
 *   - buildShareText(entry, all)   → string, ASCII-art Wordle-style
 */

const DAILY_STORAGE_KEY = 'vs_daily_history_v1';
const DAILY_KEEP_DAYS = 14;

/**
 * cyrb53 by bryc — small, fast, public-domain non-crypto hash that returns
 * a 53-bit positive integer. We use it to fold a date string into a seed for
 * `SeededRng`. Reference:
 *   https://stackoverflow.com/a/52171480
 * This is intentionally not crypto — daily challenges don't need it, and we
 * want the same JS source to produce the same number on every browser.
 */
export function cyrb53(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/** Return today's UTC date as 'YYYY-MM-DD'. */
export function todayKey(now = new Date()) {
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, '0');
    const d = String(now.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/** Fold the date into a 32-bit seed suitable for SeededRng. */
export function dailySeed(dateStr) {
    // Mask to 32 bits — SeededRng coerces with >>> 0 anyway, this just makes
    // the test asserts cleaner.
    return cyrb53(dateStr, 0xd417) & 0xffffffff;
}

/**
 * Build a deterministic challenge spec for the given date. The stage rotates
 * daily based on the seed so players can't cheese a single map every day.
 * @param {string} [dateStr] defaults to UTC today
 */
export function dailyChallenge(dateStr) {
    const date = dateStr || todayKey();
    const seed = dailySeed(date);
    // iter-14: rotation expands from 2 → 3 stages so tundra also gets daily
    // play. Use Math.abs to avoid negative-modulo surprises (cyrb53 is
    // unsigned but we mask through |0 elsewhere, so be defensive).
    const stages = ['forest', 'crypt', 'tundra'];
    const stage = stages[Math.abs(seed) % stages.length];
    // Boss timing pin: pull every boss in by a deterministic 0–60s offset.
    // Same date → same offset everywhere.
    const bossOffset = -((seed >>> 8) % 61); // -60..0
    return {
        date,
        seed: seed >>> 0,
        stage,
        bossOffset,
        label: `Diário ${date}`
    };
}

// ---------------------------------------------------------------------------
// Persistence — kept off the main save so daily history can grow/shrink
// without churning the save schema. 14 days is enough to render a streak
// without bloating localStorage past a few KB even with verbose entries.
// ---------------------------------------------------------------------------
let _memory = null;

function usableLS() {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return false;
        const probe = '__vs_daily_probe__';
        window.localStorage.setItem(probe, probe);
        window.localStorage.removeItem(probe);
        return true;
    } catch {
        return false;
    }
}

export function loadDailyHistory() {
    try {
        const raw = usableLS() ? window.localStorage.getItem(DAILY_STORAGE_KEY) : _memory;
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
}

function writeDailyHistory(history) {
    try {
        const s = JSON.stringify(history);
        if (usableLS()) window.localStorage.setItem(DAILY_STORAGE_KEY, s);
        else _memory = s;
    } catch {
        /* quota / private mode — silently drop */
    }
}

/**
 * Persist one daily run result and prune entries older than 14 calendar days.
 * Only one entry per (date, stage) is kept — the most recent overwrite wins.
 * @param {{date:string, stage:string, timeSurvived:number, kills:number,
 *          level:number, weapons:string[], won:boolean, noHit:boolean,
 *          seed:number}} entry
 */
export function saveDailyResult(entry) {
    if (!entry || !entry.date || !entry.stage) return;
    const history = loadDailyHistory();
    const key = `${entry.date}-${entry.stage}`;
    history[key] = { ...entry, savedAt: Date.now() };

    // Prune anything older than DAILY_KEEP_DAYS by comparing the stored date
    // string. We deliberately don't trust `savedAt` for the cutoff because a
    // user could have a clock skew across runs.
    const cutoff = todayKey(new Date(Date.now() - DAILY_KEEP_DAYS * 86400 * 1000));
    for (const k of Object.keys(history)) {
        const d = k.slice(0, 10); // 'YYYY-MM-DD'
        if (d < cutoff) delete history[k];
    }
    writeDailyHistory(history);
}

export function _resetDailyForTests() {
    _memory = null;
    if (usableLS()) window.localStorage.removeItem(DAILY_STORAGE_KEY);
}

/**
 * Compute a streak summary for the daily challenge. We treat *any* recorded
 * day as a played day (regardless of stage), build a sorted unique-date list,
 * then count the trailing run of consecutive UTC days ending at today as the
 * "current" streak, and the longest consecutive run anywhere in the window
 * as the "best" streak. The 14-day calendar list is returned ready-to-render
 * (newest first) with `played` / `won` flags so the UI is just a `.map`.
 *
 * @param {object} [history] loadDailyHistory() output; defaults to live
 * @param {Date} [now] override for tests
 * @returns {{ current:number, best:number, days:Array<{date:string, played:boolean, won:boolean, timeSurvived:number, kills:number}> }}
 */
export function dailyStreakSummary(history, now = new Date()) {
    const all = history || loadDailyHistory();
    // Collapse all entries to one record per date (best timeSurvived wins
    // when multiple stages share a date) so the streak is "did the player
    // play that day at all?" rather than per-stage.
    const byDate = new Map();
    for (const e of Object.values(all)) {
        if (!e || !e.date) continue;
        const prev = byDate.get(e.date);
        if (!prev || (e.timeSurvived || 0) > (prev.timeSurvived || 0)) {
            byDate.set(e.date, e);
        }
    }
    // Build the 14-day calendar window ending at `now` (UTC).
    const days = [];
    for (let i = 0; i < 14; i++) {
        const d = new Date(now.getTime() - i * 86400 * 1000);
        const key = todayKey(d);
        const entry = byDate.get(key);
        days.push({
            date: key,
            played: !!entry,
            won: !!entry?.won,
            timeSurvived: entry?.timeSurvived || 0,
            kills: entry?.kills || 0
        });
    }
    // Current streak: walk forward from today (i=0) while consecutive days
    // were played. Stops at the first gap.
    let current = 0;
    for (const d of days) {
        if (d.played) current++;
        else break;
    }
    // Best streak: longest run anywhere in the unique-date set, not just the
    // 14-day window — guarantees the badge stays correct as days roll out.
    const sortedKeys = Array.from(byDate.keys()).sort();
    let best = 0;
    let run = 0;
    let prevKey = null;
    for (const k of sortedKeys) {
        if (prevKey && nextDayKey(prevKey) === k) run++;
        else run = 1;
        if (run > best) best = run;
        prevKey = k;
    }
    return { current, best, days };
}

/** Add one UTC day to a 'YYYY-MM-DD' string. */
function nextDayKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d) + 86400 * 1000);
    return todayKey(dt);
}

// ---------------------------------------------------------------------------
// Wordle-style share. We don't have a public reference cohort to compare
// against, so the "grid" instead encodes the player's *own* recent days as
// emoji tiles: 🟩 = top quartile vs their 14-day median, 🟨 = above median,
// 🟫 = below, ⬛ = far below. This keeps the share fully offline and
// deterministic from the user's own history.
// ---------------------------------------------------------------------------
function tileFor(value, median) {
    if (median <= 0) return value > 0 ? '🟩' : '⬛';
    const r = value / median;
    if (r >= 1.5) return '🟩';
    if (r >= 1.0) return '🟨';
    if (r >= 0.5) return '🟫';
    return '⬛';
}

/**
 * Build a short, copy-pasteable share string. The first line names the day
 * + result, the second is the ASCII tile grid showing how this run compares
 * to the player's last 14 days. Designed to be ~280 characters max so it
 * fits in any social text box.
 * @param {Object} entry         the result we just produced
 * @param {Object} [history]     loadDailyHistory() output; defaults to live
 */
export function buildShareText(entry, history) {
    const all = history || loadDailyHistory();
    const sameStage = Object.values(all).filter((e) => e.stage === entry.stage);
    const times = sameStage
        .map((e) => e.timeSurvived || 0)
        .filter((t) => t > 0)
        .sort((a, b) => a - b);
    const median = times.length ? times[Math.floor(times.length / 2)] : entry.timeSurvived || 1;

    // Build a 7-tile grid of the last seven recorded days for that stage so
    // the share visually echoes Wordle's compact layout. Pad with ⬛ if we
    // have fewer entries than that.
    const recent = sameStage
        .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
        .slice(-7);
    // Each tile is a multi-code-unit emoji; slice/substring would truncate
    // mid-surrogate-pair. Use Array.from + array slice to operate on user-
    // perceived characters and rejoin afterwards.
    const tiles = recent.map((e) => tileFor(e.timeSurvived || 0, median));
    while (tiles.length < 7) tiles.push('⬛');
    const padded = tiles.slice(0, 7).join('');

    const mm = Math.floor((entry.timeSurvived || 0) / 60)
        .toString()
        .padStart(2, '0');
    const ss = Math.floor((entry.timeSurvived || 0) % 60)
        .toString()
        .padStart(2, '0');
    const stageLabel =
        entry.stage === 'crypt' ? 'Cripta' : entry.stage === 'tundra' ? 'Tundra' : 'Floresta';
    const result = entry.won ? '🏆 VITÓRIA' : `⏱ ${mm}:${ss}`;
    const lines = [
        `Survivor Diário ${entry.date} · ${stageLabel}`,
        `${result} · Nív.${entry.level || 1} · ${entry.kills || 0} abates`,
        padded,
        'https://ricardo-foundry.github.io/canvas-vampire-survivors/'
    ];
    return lines.join('\n');
}
