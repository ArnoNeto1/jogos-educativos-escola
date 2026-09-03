/**
 * @module keymap
 * @description User-customisable keyboard mapping for gameplay actions.
 * Maintains a one-to-many `action → key[]` table, persists to
 * `localStorage` under a dedicated slot, and surfaces helpers for conflict
 * detection and reverse lookup.
 *
 * iter-19 introduced this module as the source of truth for every keyboard
 * action InputManager and the global hotkey listener care about. Previously
 * those were string literals scattered through `input.js` and `main.js`; now
 * they consult the keymap so a remap UI can rebind any of them at runtime.
 *
 * Design notes:
 *   - Keys are stored as the lowercased `KeyboardEvent.key` value (`'w'`,
 *     `'arrowup'`, `'escape'`, `' '` for Space). This matches what
 *     `input.js` already lowercases on read so we don't have to decide
 *     between `code` and `key` — `key` is good enough for the seven actions
 *     we expose and produces a more user-readable label.
 *   - Multiple keys can be bound to the same action (the default has WASD
 *     and arrows both bound to movement). The remap UI replaces all keys
 *     for an action atomically when the user re-binds it.
 *   - Conflict detection is inclusive: a key bound to two different actions
 *     is a conflict and `detectConflicts` lists every offending pair. The
 *     remap flow uses this both to warn the user and to auto-strip the new
 *     key from any prior owner before it takes effect.
 *
 * Dependencies: none at runtime; localStorage access is feature-detected so
 * the module imports cleanly in Node tests.
 *
 * Exports:
 *   - DEFAULT_KEYMAP, KEYMAP_ACTIONS, KEYMAP_STORAGE_KEY
 *   - normaliseKey(rawKey)
 *   - cloneKeymap(map)
 *   - sanitiseKeymap(raw)
 *   - loadKeymap(), saveKeymap(map)
 *   - bindKey(map, action, key)
 *   - detectConflicts(map)
 *   - actionForKey(map, rawKey)
 *   - keyLabel(rawKey)
 */

export const KEYMAP_STORAGE_KEY = 'vs_keymap_v1';

/**
 * Canonical action set. Order matters for the remap UI (top to bottom). Any
 * code that needs a list of every supported action should iterate this
 * tuple rather than `Object.keys(DEFAULT_KEYMAP)` so additions land in a
 * deterministic position.
 */
export const KEYMAP_ACTIONS = Object.freeze([
    'up',
    'down',
    'left',
    'right',
    'pause',
    'help',
    'mute'
]);

/**
 * Default bindings. WASD + arrow keys for movement; Esc/P for pause; H/?
 * for help; M for mute. Frozen to prevent accidental mutation; the load
 * path always returns a deep clone.
 */
export const DEFAULT_KEYMAP = Object.freeze({
    up: Object.freeze(['w', 'arrowup']),
    down: Object.freeze(['s', 'arrowdown']),
    left: Object.freeze(['a', 'arrowleft']),
    right: Object.freeze(['d', 'arrowright']),
    pause: Object.freeze(['escape', 'p']),
    help: Object.freeze(['h', '?']),
    mute: Object.freeze(['m'])
});

/**
 * Normalise a raw `KeyboardEvent.key` value into the lowercased form we
 * store. Returns an empty string for nullish input so the call site can
 * cheaply skip it.
 * @param {string} rawKey
 * @returns {string}
 */
export function normaliseKey(rawKey) {
    if (typeof rawKey !== 'string' || rawKey.length === 0) return '';
    return rawKey.toLowerCase();
}

/**
 * Deep-clone a keymap into a plain mutable object. Used both on load (so
 * subsequent edits don't mutate the frozen default) and before persistence
 * (so the saved blob is a stable JSON snapshot).
 */
export function cloneKeymap(map) {
    const out = {};
    for (const action of KEYMAP_ACTIONS) {
        const list = Array.isArray(map?.[action]) ? map[action] : [];
        out[action] = list.slice();
    }
    return out;
}

/**
 * Coerce an arbitrary parsed value into a well-formed keymap. Drops unknown
 * actions, drops non-string entries, normalises everything to lowercase,
 * and falls back to the default for any action that ends up empty so the
 * player can never get into an unrecoverable "no keys bound" state by
 * editing localStorage by hand. Returns a fresh object.
 */
export function sanitiseKeymap(raw) {
    const out = {};
    for (const action of KEYMAP_ACTIONS) {
        const incoming = Array.isArray(raw?.[action]) ? raw[action] : null;
        if (!incoming) {
            out[action] = DEFAULT_KEYMAP[action].slice();
            continue;
        }
        const cleaned = [];
        for (const k of incoming) {
            const n = normaliseKey(k);
            if (n && !cleaned.includes(n)) cleaned.push(n);
        }
        out[action] = cleaned.length ? cleaned : DEFAULT_KEYMAP[action].slice();
    }
    return out;
}

/**
 * Bind a key to an action. Removes the key from every other action first
 * (so a remap is always conflict-free at rest) and, if the action's list
 * already contained the key, this is a no-op replacement that still ends
 * up with the key present. Always returns a fresh keymap; the input is
 * left untouched so the caller can keep an "old map" reference for undo.
 *
 * The helper accepts a `replace` flag so the remap dialog has a choice:
 *   - replace=true (default): the action's previous keys are wiped before
 *     the new key is installed. Matches the most common "press one key to
 *     bind" flow.
 *   - replace=false: the new key is appended (deduplicated). Useful for
 *     adding a second binding to an already-bound action.
 */
export function bindKey(map, action, rawKey, { replace = true } = {}) {
    const next = cloneKeymap(map);
    const key = normaliseKey(rawKey);
    if (!KEYMAP_ACTIONS.includes(action) || !key) return next;
    // Strip the key from every other action so the new binding is exclusive.
    for (const a of KEYMAP_ACTIONS) {
        if (a === action) continue;
        next[a] = next[a].filter((k) => k !== key);
    }
    if (replace) {
        next[action] = [key];
    } else if (!next[action].includes(key)) {
        next[action].push(key);
    }
    // Defensive: if `replace` left another action with no keys, restore its
    // default. Edge case only triggers if the user remapped that other
    // action's last key onto this one.
    for (const a of KEYMAP_ACTIONS) {
        if (next[a].length === 0) next[a] = DEFAULT_KEYMAP[a].slice();
    }
    return next;
}

/**
 * Inspect a keymap for any key bound to multiple actions. Returns an array
 * of `{ key, actions }` records, one per offending key. Empty array means
 * the map is clean.
 */
export function detectConflicts(map) {
    const owners = new Map(); // key → Set<action>
    for (const action of KEYMAP_ACTIONS) {
        for (const k of map?.[action] || []) {
            if (!owners.has(k)) owners.set(k, new Set());
            owners.get(k).add(action);
        }
    }
    const out = [];
    for (const [key, actions] of owners) {
        if (actions.size > 1) {
            out.push({ key, actions: Array.from(actions).sort() });
        }
    }
    return out;
}

/**
 * Reverse lookup: which action owns this raw key, if any? Returns the first
 * matching action in `KEYMAP_ACTIONS` order so the UI behaviour is
 * deterministic even if the map is dirty (multiple owners).
 */
export function actionForKey(map, rawKey) {
    const key = normaliseKey(rawKey);
    if (!key) return null;
    for (const action of KEYMAP_ACTIONS) {
        if ((map?.[action] || []).includes(key)) return action;
    }
    return null;
}

/**
 * Pretty-print a stored key for display in the remap UI. We capitalise
 * single letters, expand `arrowxx` to a Unicode arrow, and map a few
 * common control keys to readable labels.
 */
export function keyLabel(rawKey) {
    const k = normaliseKey(rawKey);
    if (!k) return '';
    switch (k) {
        case 'arrowup':
            return '↑';
        case 'arrowdown':
            return '↓';
        case 'arrowleft':
            return '←';
        case 'arrowright':
            return '→';
        case 'escape':
            return 'Esc';
        case ' ':
            return 'Space';
        case 'enter':
            return 'Enter';
        case 'tab':
            return 'Tab';
        case 'shift':
            return 'Shift';
        case 'control':
            return 'Ctrl';
        case 'alt':
            return 'Alt';
        case 'meta':
            return 'Meta';
        default:
            return k.length === 1 ? k.toUpperCase() : k;
    }
}

// ---------------------------------------------------------------------------
// Persistence. Memory fallback so Node tests and sandboxed iframes don't
// throw when localStorage is unavailable.
// ---------------------------------------------------------------------------
let _memory = null;

function hasLS() {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return false;
        return true;
    } catch {
        return false;
    }
}

export function loadKeymap() {
    try {
        const raw = hasLS() ? window.localStorage.getItem(KEYMAP_STORAGE_KEY) : _memory;
        if (!raw) return cloneKeymap(DEFAULT_KEYMAP);
        const parsed = JSON.parse(raw);
        return sanitiseKeymap(parsed);
    } catch {
        return cloneKeymap(DEFAULT_KEYMAP);
    }
}

export function saveKeymap(map) {
    const safe = sanitiseKeymap(map);
    let serialised;
    try {
        serialised = JSON.stringify(safe);
    } catch {
        return false;
    }
    if (hasLS()) {
        try {
            window.localStorage.setItem(KEYMAP_STORAGE_KEY, serialised);
            return true;
        } catch {
            _memory = serialised;
            return false;
        }
    }
    _memory = serialised;
    return true;
}

/** Test-only: flush the memory fallback + the persisted slot. */
export function _resetKeymapForTests() {
    _memory = null;
    if (hasLS()) {
        try {
            window.localStorage.removeItem(KEYMAP_STORAGE_KEY);
        } catch {
            /* ignore */
        }
    }
}
