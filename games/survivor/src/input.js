/**
 * @module input
 * @description Unified input layer — keyboard, mouse, gamepad, and a virtual
 * touch joystick — exposing a single normalised move vector to gameplay code.
 * Mobile polish: 15% inner deadzone, squared response curve on the outer
 * band, edge double-tap to toggle pause.
 *
 * iter-14 added a real Gamepad polling loop. The browser's Gamepad API is
 * pull-based: the page only sees current state when it reads
 * `navigator.getGamepads()`. We poll in `pollGamepad()` (called once per
 * frame from main.js — drop-in safe, never throws if the API or pad is
 * absent) and feed the left analog into a gamepad-move vector, the right
 * analog into `aimVec` (consumed by manual-aim weapons later) and synthesise
 * edge-triggered button events for menu navigation: A=select, B=cancel,
 * Start=pause, LB/RB=cycle menu options. We expose those edges via small
 * callbacks (`onGamepadConfirm`, `onGamepadCancel`, `onGamepadCycleNext`,
 * `onGamepadCyclePrev`) so the UI doesn't have to know about gamepad
 * indices.
 *
 * Dependencies: DOM (window/document event APIs); navigator.getGamepads is
 * feature-detected so this module imports cleanly in Node-side tests.
 *
 * Exports:
 *   - class InputManager
 *   - GAMEPAD_BUTTON   named indices for tests + UI bindings
 *   - applyGamepadDeadzone(value, dz?)
 */

import { DEFAULT_KEYMAP, cloneKeymap } from './keymap.js';

const JOYSTICK_DEADZONE = 0.15;
const DOUBLE_TAP_WINDOW_MS = 260;
const GAMEPAD_AXIS_DEADZONE = 0.18;

// Standard mapping (Xbox / DS4) — these indices are stable across the major
// browsers when the pad reports `mapping === 'standard'`. Names mirror Xbox
// labels for reader clarity. Exported so tests (and future remap UI) can
// reference them by name instead of by magic number.
export const GAMEPAD_BUTTON = Object.freeze({
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LB: 4,
    RB: 5,
    LT: 6,
    RT: 7,
    BACK: 8,
    START: 9
});

/**
 * Apply a symmetric deadzone to a single analog axis value. Values within
 * `±dz` collapse to 0; values outside remap linearly to [-1, 1] over the
 * live band so the player isn't stuck at a constant magnitude after the
 * deadzone clip. Exported for unit tests.
 * @param {number} v   raw axis value, -1..1
 * @param {number} [dz=GAMEPAD_AXIS_DEADZONE]
 * @returns {number}
 */
export function applyGamepadDeadzone(v, dz = GAMEPAD_AXIS_DEADZONE) {
    if (!Number.isFinite(v)) return 0;
    const a = Math.abs(v);
    if (a < dz) return 0;
    const sign = v < 0 ? -1 : 1;
    return sign * ((a - dz) / (1 - dz));
}

export class InputManager {
    constructor() {
        this.keys = Object.create(null);
        this.moveVec = { x: 0, y: 0 };
        this.touchVec = { x: 0, y: 0 };
        // Gamepad state: separate vector so both keyboard and pad can be
        // active at once and we resolve in `getMoveVector()` with kbd > pad.
        this.gamepadVec = { x: 0, y: 0 };
        // Right analog → aim. Manual-aim weapons read this directly.
        this.aimVec = { x: 0, y: 0 };
        this.paused = false;
        this.listeners = [];
        this.joystick = null;
        this.onTogglePause = () => {};
        // iter-14 menu hooks. Default to no-op so an attached UI can opt in
        // selectively. The poller calls these on edge transitions only.
        this.onGamepadConfirm = () => {};
        this.onGamepadCancel = () => {};
        this.onGamepadCycleNext = () => {};
        this.onGamepadCyclePrev = () => {};
        this._lastEdgeTapAt = 0;
        // Previous-frame button snapshot for edge detection.
        this._prevButtons = [];
        // Bookkeeping for the special-skill button on touch (iter-14).
        this.onTouchSpecial = () => {};
        // iter-19: customisable keymap. Kept on the InputManager so a remap
        // UI can call `setKeymap` with the persisted blob and the next
        // `getMoveVector` / `attach` keydown both pick it up. Also hold a
        // dedicated callback for "non-movement" actions (help/mute) so the
        // host can wire them without re-implementing key matching in
        // main.js. Pause stays on `onTogglePause` for backwards compat.
        this.keymap = cloneKeymap(DEFAULT_KEYMAP);
        this.onActionHelp = () => {};
        this.onActionMute = () => {};
    }

    /**
     * Replace the active keymap. Validates lightly — anything missing falls
     * back to the default for that action. Safe to call mid-run; the next
     * keydown sees the new bindings immediately.
     */
    setKeymap(nextMap) {
        this.keymap = cloneKeymap(nextMap || DEFAULT_KEYMAP);
    }

    /** True iff `keyLower` is currently bound to `action`. */
    _matches(action, keyLower) {
        const list = this.keymap?.[action];
        return Array.isArray(list) && list.includes(keyLower);
    }

    attach(target = window) {
        const kd = (e) => {
            const key = e.key.toLowerCase();
            this.keys[key] = true;
            // iter-19: action dispatch flows through the customisable keymap
            // rather than hard-coded literals. Pause is here (always was);
            // help and mute moved off the legacy global hotkey listener so
            // remapping reaches them too. We swallow preventDefault for
            // bound action keys so `H` doesn't open the browser's history
            // pane on Firefox, etc.
            if (this._matches('pause', key)) {
                e.preventDefault();
                this.onTogglePause();
            } else if (this._matches('help', key)) {
                e.preventDefault();
                this.onActionHelp();
            } else if (this._matches('mute', key)) {
                e.preventDefault();
                this.onActionMute();
            }
        };
        const ku = (e) => {
            this.keys[e.key.toLowerCase()] = false;
        };
        const blur = () => {
            this.keys = Object.create(null);
        };

        target.addEventListener('keydown', kd);
        target.addEventListener('keyup', ku);
        target.addEventListener('blur', blur);
        this.listeners.push(['keydown', kd, target]);
        this.listeners.push(['keyup', ku, target]);
        this.listeners.push(['blur', blur, target]);

        // Touch edge double-tap → pause. Registered on the document so the
        // gesture works anywhere outside the joystick pad.
        const onTouchStart = (e) => {
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            const w = window.innerWidth;
            const edgeLeft = t.clientX < w * 0.12;
            const edgeRight = t.clientX > w * 0.88;
            if (!edgeLeft && !edgeRight) return;
            const now = Date.now();
            if (now - this._lastEdgeTapAt < DOUBLE_TAP_WINDOW_MS) {
                this._lastEdgeTapAt = 0;
                this.onTogglePause();
            } else {
                this._lastEdgeTapAt = now;
            }
        };
        document.addEventListener('touchstart', onTouchStart, { passive: true });
        this.listeners.push(['touchstart', onTouchStart, document]);
    }

    detach() {
        for (const [event, fn, tgt] of this.listeners) tgt.removeEventListener(event, fn);
        this.listeners.length = 0;
        if (this.joystick) this.joystick.destroy();
    }

    attachJoystick(joystickEl, knobEl) {
        this.joystick = new VirtualJoystick(joystickEl, knobEl, (vx, vy) => {
            this.touchVec.x = vx;
            this.touchVec.y = vy;
        });
    }

    /**
     * iter-14: bind the right-hand "special skill" button on the mobile HUD.
     * The button is just a div; we install touchstart/click and forward
     * through `onTouchSpecial`. Caller wires that to whatever the special
     * action is for the current run.
     */
    attachSpecialButton(btnEl) {
        if (!btnEl) return;
        const fire = (e) => {
            e.preventDefault?.();
            this.onTouchSpecial();
        };
        btnEl.addEventListener('touchstart', fire, { passive: false });
        btnEl.addEventListener('click', fire);
        this.listeners.push(['touchstart', fire, btnEl]);
        this.listeners.push(['click', fire, btnEl]);
    }

    /**
     * iter-14: Gamepad polling. Call from the per-frame loop. Safely no-ops
     * when the API is absent (Node tests, Safari pre-15.4 mobile, etc.) or
     * when no pad is connected. The first connected pad with non-null state
     * wins; we don't try to merge multiple controllers.
     *
     * Edge-triggered: emits each button callback exactly once per press.
     */
    pollGamepad(getPads = _defaultGetGamepads) {
        const pads = getPads();
        if (!pads) return;
        let pad = null;
        for (const p of pads) {
            if (p) {
                pad = p;
                break;
            }
        }
        if (!pad) {
            this.gamepadVec.x = 0;
            this.gamepadVec.y = 0;
            this.aimVec.x = 0;
            this.aimVec.y = 0;
            this._prevButtons.length = 0;
            return;
        }
        // Axes 0/1 = left stick, 2/3 = right stick on the standard mapping.
        const lx = applyGamepadDeadzone(pad.axes[0] || 0);
        const ly = applyGamepadDeadzone(pad.axes[1] || 0);
        // Normalise the diagonal so a fully-pressed stick at 45° still gives
        // magnitude 1 rather than √2 (matches keyboard expectations).
        const lmag = Math.hypot(lx, ly);
        if (lmag > 1) {
            this.gamepadVec.x = lx / lmag;
            this.gamepadVec.y = ly / lmag;
        } else {
            this.gamepadVec.x = lx;
            this.gamepadVec.y = ly;
        }
        const rx = applyGamepadDeadzone(pad.axes[2] || 0);
        const ry = applyGamepadDeadzone(pad.axes[3] || 0);
        this.aimVec.x = rx;
        this.aimVec.y = ry;

        // Edge-triggered button → callback fan-out.
        const buttons = pad.buttons || [];
        const wasPressed = (i) => !!this._prevButtons[i];
        const isPressed = (i) => !!(buttons[i] && buttons[i].pressed);
        const edge = (i) => isPressed(i) && !wasPressed(i);

        if (edge(GAMEPAD_BUTTON.A)) this.onGamepadConfirm();
        if (edge(GAMEPAD_BUTTON.B)) this.onGamepadCancel();
        if (edge(GAMEPAD_BUTTON.START)) this.onTogglePause();
        if (edge(GAMEPAD_BUTTON.RB)) this.onGamepadCycleNext();
        if (edge(GAMEPAD_BUTTON.LB)) this.onGamepadCyclePrev();

        // Snapshot for next frame.
        this._prevButtons = buttons.map((b) => !!(b && b.pressed));
    }

    getMoveVector() {
        let x = 0,
            y = 0;
        const k = this.keys;
        // iter-19: every direction key consults the live keymap so
        // remapping (WASD → IJKL, etc) takes effect on the next frame.
        const anyDown = (action) => {
            const list = this.keymap?.[action];
            if (!Array.isArray(list)) return false;
            for (const key of list) if (k[key]) return true;
            return false;
        };
        if (anyDown('up')) y -= 1;
        if (anyDown('down')) y += 1;
        if (anyDown('left')) x -= 1;
        if (anyDown('right')) x += 1;
        // Resolve in priority order: keyboard > gamepad > touch joystick. We
        // already normalise touch and gamepad to magnitude ≤ 1, so the final
        // hypot clamp below is mostly a no-op except when keyboard supplies
        // a diagonal.
        if (x === 0 && y === 0) {
            if (this.gamepadVec.x !== 0 || this.gamepadVec.y !== 0) {
                x = this.gamepadVec.x;
                y = this.gamepadVec.y;
            } else {
                x = this.touchVec.x;
                y = this.touchVec.y;
            }
        }
        const len = Math.hypot(x, y);
        if (len > 1) {
            x /= len;
            y /= len;
        }
        this.moveVec.x = x;
        this.moveVec.y = y;
        return this.moveVec;
    }
}

/** Default gamepad accessor. Wrapped so tests can inject a mock. */
function _defaultGetGamepads() {
    if (typeof navigator === 'undefined' || typeof navigator.getGamepads !== 'function') {
        return null;
    }
    try {
        return navigator.getGamepads();
    } catch {
        return null;
    }
}

class VirtualJoystick {
    constructor(base, knob, cb) {
        this.base = base;
        this.knob = knob;
        this.cb = cb;
        this.active = false;
        this.cx = 0;
        this.cy = 0;
        this.maxR = 60;

        const start = (e) => {
            this.active = true;
            const t = e.touches ? e.touches[0] : e;
            const rect = base.getBoundingClientRect();
            this.cx = rect.left + rect.width / 2;
            this.cy = rect.top + rect.height / 2;
            this._update(t.clientX, t.clientY);
            e.preventDefault();
        };
        const move = (e) => {
            if (!this.active) return;
            const t = e.touches ? e.touches[0] : e;
            this._update(t.clientX, t.clientY);
            e.preventDefault();
        };
        const end = () => {
            this.active = false;
            knob.style.transform = 'translate(-50%, -50%)';
            cb(0, 0);
        };

        base.addEventListener('touchstart', start, { passive: false });
        window.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('touchend', end);
        base.addEventListener('mousedown', start);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', end);
        this._cleanup = () => {
            base.removeEventListener('touchstart', start);
            window.removeEventListener('touchmove', move);
            window.removeEventListener('touchend', end);
            base.removeEventListener('mousedown', start);
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', end);
        };
    }

    _update(x, y) {
        const dx = x - this.cx;
        const dy = y - this.cy;
        const d = Math.hypot(dx, dy);
        const clamp = Math.min(d, this.maxR);
        const nx = d === 0 ? 0 : (dx / d) * clamp;
        const ny = d === 0 ? 0 : (dy / d) * clamp;
        this.knob.style.transform = `translate(calc(-50% + ${nx}px), calc(-50% + ${ny}px))`;
        // Normalise and apply a dead-zone + squared curve on the outer band.
        const mag = clamp / this.maxR; // 0..1
        if (mag < JOYSTICK_DEADZONE) {
            this.cb(0, 0);
            return;
        }
        const liveRange = 1 - JOYSTICK_DEADZONE;
        const scaled = Math.pow((mag - JOYSTICK_DEADZONE) / liveRange, 1.3);
        const dirx = d === 0 ? 0 : dx / d;
        const diry = d === 0 ? 0 : dy / d;
        this.cb(dirx * scaled, diry * scaled);
    }

    destroy() {
        this._cleanup?.();
    }
}
