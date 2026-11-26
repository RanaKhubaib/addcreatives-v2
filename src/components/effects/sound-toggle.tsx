'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PadNodes {
  oscillators: OscillatorNode[];
  gain: GainNode;
  context: AudioContext;
}

/**
 * Ambient sound toggle — OFF by default. Only after the user enables it
 * does it build a soft pad with the WebAudio API (detuned sine oscillators
 * through a low-pass filter, slow LFO). No audio files, never autoplays.
 */
export function AmbientSoundToggle() {
  const [on, setOn] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const padRef = useRef<PadNodes | null>(null);

  useEffect(() => {
    return () => {
      const pad = padRef.current;
      if (pad) {
        pad.oscillators.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // Already stopped.
          }
        });
        void pad.context.close();
      }
    };
  }, []);

  const toggle = async () => {
    if (on) {
      const pad = padRef.current;
      if (pad) {
        pad.gain.gain.setTargetAtTime(0, pad.context.currentTime, 0.4);
        const oscillators = pad.oscillators;
        window.setTimeout(() => {
          oscillators.forEach((osc) => {
            try {
              osc.stop();
            } catch {
              // Already stopped.
            }
          });
        }, 1200);
        padRef.current = null;
      }
      setOn(false);
      return;
    }

    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) {
      setUnsupported(true);
      return;
    }

    const context = new AudioContext();
    await context.resume();

    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.setTargetAtTime(0.045, context.currentTime, 1.2);

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(620, context.currentTime);
    filter.Q.setValueAtTime(0.6, context.currentTime);

    // Slow LFO breathing on the filter cutoff.
    const lfo = context.createOscillator();
    lfo.frequency.setValueAtTime(0.08, context.currentTime);
    const lfoGain = context.createGain();
    lfoGain.gain.setValueAtTime(240, context.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Soft pad: root + fifth + octave, slightly detuned.
    const oscillators = [110, 164.81, 220].map((freq, index) => {
      const osc = context.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, context.currentTime);
      osc.detune.setValueAtTime(index === 1 ? 4 : -3, context.currentTime);
      osc.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(gain);
    gain.connect(context.destination);
    padRef.current = { oscillators: [...oscillators, lfo], gain, context };
    setOn(true);
  };

  if (unsupported) return null;

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-pressed={on}
      aria-label={on ? 'Turn ambient sound off' : 'Turn ambient sound on'}
      title={on ? 'Ambient sound on' : 'Ambient sound off'}
      className={cn(
        'fixed bottom-5 left-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border shadow-lg backdrop-blur transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2',
        on
          ? 'border-royal bg-royal text-white'
          : 'border-ink/10 bg-white/80 text-ink hover:text-royal dark:border-white/10 dark:bg-ink/80 dark:text-white',
      )}
    >
      {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
