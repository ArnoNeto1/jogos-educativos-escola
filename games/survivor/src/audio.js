/**
 * @module audio
 * @description Web Audio synthesised SFX plus a procedural music loop.
 * Zero external assets — every sound is generated at playback time from
 * oscillators and noise buffers. Music is a step sequencer that walks a root
 * note around a minor progression with an arpeggiator on top.
 *
 * Dependencies: browser Web Audio API. Degrades silently when unavailable.
 *
 * Exports:
 *   - class AudioEngine
 */

export class AudioEngine {
    constructor(settings) {
        this.settings = settings;
        this.ctx = null;
        this.masterGain = null;
        this.sfxGain = null;
        this.musicGain = null;
        this.musicInterval = null;
        this.enabled = true;
        this.unlocked = false;
    }

    init() {
        if (this.ctx) return;
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) {
                this.enabled = false;
                return;
            }
            this.ctx = new AC();
            this.masterGain = this.ctx.createGain();
            this.sfxGain = this.ctx.createGain();
            this.musicGain = this.ctx.createGain();
            this.sfxGain.connect(this.masterGain);
            this.musicGain.connect(this.masterGain);
            this.masterGain.connect(this.ctx.destination);
            this.applyVolumes();
        } catch (err) {
            console.warn('[audio] disabled', err);
            this.enabled = false;
        }
    }

    unlock() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {
                /* ignore */
            });
        }
        this.unlocked = true;
    }

    applyVolumes() {
        if (!this.ctx) return;
        const s = this.settings;
        // iter-13: a global `muted` flag (toggled by the M hotkey) zeroes the
        // master gain without overwriting masterVolume so unmute restores
        // exactly what the player had before.
        const muteMult = s.muted ? 0 : 1;
        this.masterGain.gain.value = (s.masterVolume ?? 0.6) * muteMult;
        this.sfxGain.gain.value = s.sfxVolume ?? 0.8;
        this.musicGain.gain.value = (s.musicEnabled === false ? 0 : 1) * (s.musicVolume ?? 0.4);
    }

    /** Toggle a global mute (zeroes master gain, leaves volumes intact). */
    setMuted(flag) {
        this.settings.muted = !!flag;
        this.applyVolumes();
    }

    // Generic tone helper --------------------------------------------------
    tone({
        freq = 440,
        dur = 0.08,
        type = 'sine',
        volume = 0.2,
        attack = 0.005,
        release = 0.05,
        sweep = 0,
        noise = false
    }) {
        if (!this.enabled || !this.ctx || !this.unlocked) return;
        const now = this.ctx.currentTime;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur + release);
        gain.connect(this.sfxGain);

        let source;
        if (noise) {
            source = this.ctx.createBufferSource();
            source.buffer = this._noiseBuffer();
        } else {
            const osc = this.ctx.createOscillator();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            if (sweep) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + sweep), now + dur);
            }
            source = osc;
        }
        source.connect(gain);
        source.start(now);
        source.stop(now + dur + release + 0.01);
    }

    _noiseBuffer() {
        if (this._noise) return this._noise;
        const len = this.ctx.sampleRate * 0.4;
        const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        this._noise = buf;
        return buf;
    }

    // High-level SFX -------------------------------------------------------
    hit() {
        this.tone({ freq: 320, dur: 0.05, type: 'square', volume: 0.12, sweep: -120 });
    }
    shoot() {
        this.tone({ freq: 780, dur: 0.04, type: 'triangle', volume: 0.08, sweep: -200 });
    }
    explosion() {
        this.tone({ noise: true, dur: 0.25, volume: 0.22, release: 0.15 });
    }
    pickup() {
        this.tone({ freq: 1200, dur: 0.06, type: 'sine', volume: 0.12, sweep: 400 });
    }
    levelUp() {
        this.tone({ freq: 660, dur: 0.1, type: 'triangle', volume: 0.2 });
        setTimeout(() => this.tone({ freq: 990, dur: 0.12, type: 'triangle', volume: 0.22 }), 90);
        setTimeout(() => this.tone({ freq: 1320, dur: 0.18, type: 'triangle', volume: 0.24 }), 200);
    }
    damage() {
        this.tone({ freq: 180, dur: 0.18, type: 'sawtooth', volume: 0.18, sweep: -80 });
    }
    death() {
        this.tone({ freq: 220, dur: 0.4, type: 'sawtooth', volume: 0.25, sweep: -180 });
        setTimeout(
            () => this.tone({ freq: 110, dur: 0.6, type: 'sawtooth', volume: 0.2, sweep: -80 }),
            200
        );
    }
    bossSpawn() {
        this.tone({ noise: true, dur: 0.4, volume: 0.3, release: 0.25 });
        setTimeout(() => this.tone({ freq: 80, dur: 0.6, type: 'sawtooth', volume: 0.3 }), 100);
    }
    bossWarn() {
        // Three-note descending "alert" — used in the boss banner lead-in.
        this.tone({ freq: 480, dur: 0.12, type: 'square', volume: 0.2 });
        setTimeout(() => this.tone({ freq: 360, dur: 0.12, type: 'square', volume: 0.2 }), 140);
        setTimeout(() => this.tone({ freq: 240, dur: 0.2, type: 'square', volume: 0.22 }), 280);
    }
    achievement() {
        this.tone({ freq: 880, dur: 0.08, type: 'triangle', volume: 0.18 });
        setTimeout(() => this.tone({ freq: 1174, dur: 0.1, type: 'triangle', volume: 0.2 }), 70);
        setTimeout(() => this.tone({ freq: 1567, dur: 0.14, type: 'triangle', volume: 0.22 }), 150);
    }

    // Procedural music: arpeggiated minor progression. Four bars of 8 steps.
    // Chord roots walk i - VI - III - VII (A minor relative: A, F, C, G).
    startMusic() {
        if (!this.enabled || !this.ctx || this.musicInterval) return;
        if (this.settings.musicEnabled === false) return;
        this.unlock();
        const rootHz = 220; // A3
        const minorArp = [0, 3, 7, 12, 7, 3]; // semitones
        const progression = [0, -4, -9, -2]; // i, VI, iii, VII in semitones from root
        const stepMs = 180;
        let bar = 0;
        let step = 0;
        const totalStepsPerBar = minorArp.length;
        const schedule = () => {
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const rootSemis = progression[bar % progression.length];
            const arpSemi = minorArp[step % minorArp.length];
            const freq = rootHz * Math.pow(2, (rootSemis + arpSemi) / 12);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
            osc.connect(gain).connect(this.musicGain);
            osc.start(now);
            osc.stop(now + 0.34);

            // Every 4 steps add a softer bass pedal tone one octave down.
            if (step % 4 === 0) {
                const bass = this.ctx.createOscillator();
                const bgain = this.ctx.createGain();
                bass.type = 'sine';
                bass.frequency.value = (rootHz / 2) * Math.pow(2, rootSemis / 12);
                bgain.gain.setValueAtTime(0.0001, now);
                bgain.gain.linearRampToValueAtTime(0.04, now + 0.03);
                bgain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
                bass.connect(bgain).connect(this.musicGain);
                bass.start(now);
                bass.stop(now + 0.62);
            }

            step++;
            if (step >= totalStepsPerBar) {
                step = 0;
                bar++;
            }
        };
        this.musicInterval = setInterval(schedule, stepMs);
    }

    stopMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
    }

    toggleMusic(on) {
        this.settings.musicEnabled = !!on;
        this.applyVolumes();
        if (on) this.startMusic();
        else this.stopMusic();
    }
}
