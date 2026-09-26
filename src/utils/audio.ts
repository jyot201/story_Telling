/**
 * Audio service for Mythos & Quill:
 * 1. Web Speech Synthesis for reading aloud story passages
 * 2. Web Audio procedural ambient soundscape (clock tick + pine wind)
 */

class StoryAudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private onStateChange: ((playing: boolean, paused: boolean) => void) | null = null;
  
  // Ambient Soundscape Web Audio Context
  private audioCtx: AudioContext | null = null;
  private ambientInterval: number | null = null;
  private windNode: AudioNode | null = null;
  private isAmbientPlaying = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setListener(cb: (playing: boolean, paused: boolean) => void) {
    this.onStateChange = cb;
  }

  public speak(text: string, rate: number = 0.95) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 0.95; // Slightly deeper, literary bedtime narrator tone

    // Try to pick a natural English voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Google UK English Female'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.onStateChange?.(true, false);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.onStateChange?.(false, false);
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.onStateChange?.(false, false);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.onStateChange?.(true, true);
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.onStateChange?.(true, false);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.onStateChange?.(false, false);
    }
  }

  public toggle(text: string, rate: number = 0.95) {
    if (this.isSpeaking) {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
    } else {
      this.speak(text, rate);
    }
  }

  // --- Procedural Ambient Soundscape ---
  public toggleAmbientSoundscape(enable?: boolean): boolean {
    if (typeof window === 'undefined') return false;
    
    const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;
    
    if (!shouldPlay) {
      this.stopAmbientSoundscape();
      return false;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isAmbientPlaying = true;
      this.startClockTicking();
      return true;
    } catch {
      return false;
    }
  }

  private startClockTicking() {
    if (!this.audioCtx) return;

    // Gentle mechanical clock tick tick tick
    this.ambientInterval = window.setInterval(() => {
      if (!this.audioCtx || this.audioCtx.state !== 'running') return;
      
      const now = this.audioCtx.currentTime;
      
      // Ticking osc
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }, 1000);
  }

  public stopAmbientSoundscape() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.isAmbientPlaying = false;
  }

  public getAmbientState() {
    return this.isAmbientPlaying;
  }
}

export const storyAudio = new StoryAudioService();
