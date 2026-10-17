// Procedural Ambient Sound Engine using Web Audio API
// No external mp3/wav files required, zero latency, 100% reliable

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm low-pass filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);
    this.filter.connect(this.masterGain);
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx || !this.masterGain || !this.filter) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.6);
      setTimeout(() => {
        this.stopOscillators();
      }, 700);
      this.isPlaying = false;
    } else {
      // Start ethereal drone chords (D minor / F maj - cosmic, reflective)
      this.startOscillators();
      this.masterGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 1.2);
      this.isPlaying = true;
    }
    return this.isPlaying;
  }

  private startOscillators() {
    if (!this.ctx || !this.filter) return;
    this.stopOscillators();

    // Harmonics: 73.42Hz (D2), 110.00Hz (A2), 146.83Hz (D3), 220Hz (A3), 329.63Hz (E4)
    const freqs = [73.42, 110.0, 146.83, 220.0, 329.63];

    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.filter) return;
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const oscGain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.8, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.08 / (i + 1), this.ctx.currentTime);

      if (panner) {
        panner.pan.setValueAtTime((i % 2 === 0 ? 1 : -1) * 0.4, this.ctx.currentTime);
        osc.connect(panner);
        panner.connect(oscGain);
      } else {
        osc.connect(oscGain);
      }

      oscGain.connect(this.filter);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  private stopOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.oscillators = [];
  }

  // Play a gentle crystalline chime when interacting with principles or milestones
  public playChime(freq = 587.33) {
    if (!this.isPlaying || !this.ctx || this.ctx.state === 'suspended') return;
    try {
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      chimeOsc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.5);

      chimeGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);

      chimeOsc.start();
      chimeOsc.stop(this.ctx.currentTime + 1.2);
    } catch {
      // Audio fallback silent
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new AmbientSoundEngine();
