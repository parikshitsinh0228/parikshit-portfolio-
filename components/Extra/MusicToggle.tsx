"use client";

import { useState, useRef } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);

  const startDrone = () => {
    try {
      // 1. Initialize Audio Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 2. Main Volume Control with Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Fade in master volume to avoid abrupt pop clicks
      masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 3. Lowpass Filter to create a warm, dark, sub-bass feel
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);
      filter.connect(masterGain);

      // 4. Fundamental drone (55Hz - A1 note)
      const osc1 = ctx.createOscillator();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      
      // 5. Fifth interval harmony (82.4Hz - E2 note)
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime);

      // 6. Slow pitch modulator (0.1Hz LFO) to warp oscillators slightly over time
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.4, ctx.currentTime); // modulate pitch by 0.4 Hz
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc2.frequency); // modulate second oscillator pitch

      // Connect sources to filter
      osc1.connect(filter);
      osc2.connect(filter);

      // Start all nodes
      osc1.start(0);
      osc2.start(0);
      lfo.start(0);

      // Cache references
      oscsRef.current = [osc1, osc2, lfo];
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to initialize Web Audio API:", err);
    }
  };

  const stopDrone = () => {
    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    if (!ctx || !gain) return;

    // Fade out volume to avoid clicks
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);

    setTimeout(() => {
      oscsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      ctx.close();
      audioCtxRef.current = null;
      gainNodeRef.current = null;
      oscsRef.current = [];
      setIsPlaying(false);
    }, 900);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  return (
    <button
      onClick={togglePlayback}
      className={`fixed bottom-8 left-8 z-[4900] p-3 rounded-full border backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer ${
        isPlaying
          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse"
          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20"
      }`}
      title={isPlaying ? "Mute Ambient Synth" : "Play Ambient Synth"}
    >
      {isPlaying ? (
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold px-1">
          <Volume2 className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">Vibe ON</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs font-mono px-1">
          <VolumeX className="w-4 h-4" />
          <span className="hidden sm:inline">Vibe OFF</span>
        </div>
      )}
    </button>
  );
}
