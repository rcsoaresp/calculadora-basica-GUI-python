// Web Audio API lightweight sound synthesizer for tactile button clicks

let audioCtx: AudioContext | null = null;

export function playKeyClick(type: 'num' | 'op' | 'enter' | 'clear' = 'num') {
  try {
    if (typeof window === 'undefined') return;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';

    let freq = 600;
    let duration = 0.035;

    if (type === 'op') {
      freq = 750;
      duration = 0.045;
    } else if (type === 'enter') {
      freq = 920;
      duration = 0.06;
    } else if (type === 'clear') {
      freq = 420;
      duration = 0.05;
    }

    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // AudioContext blocked or not supported
  }
}
