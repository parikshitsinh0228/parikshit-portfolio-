"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "Initializing core quantum systems...",
  "Mapping synaptic network coordinates...",
  "Loading vector indexing framework...",
  "Compiling WebGL vertex shader materials...",
  "Initializing local model: Llama-3-8B-Instruct (4-bit)...",
  "Resolving WebRTC peer transmission interfaces...",
  "System diagnostics: 100% operational.",
  "Booting creative user experience...",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Increment loading progress
    const duration = 2500; // 2.5 seconds total
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment + Math.random() * 2, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 800); // Wait for exit animations to finish
          }, 400);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Cycle boot logs based on progress percentage
  useEffect(() => {
    const step = 100 / BOOT_LOGS.length;
    const currentLogIndex = Math.min(
      Math.floor(progress / step),
      BOOT_LOGS.length - 1
    );
    setLogIndex(currentLogIndex);
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020205] text-[#f8fafc] select-none font-mono px-6"
        >
          {/* Subtle grid background for high-tech look */}
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          <div className="absolute inset-0 radial-mask pointer-events-none" />

          {/* Central Neural Loader Animation */}
          <div className="relative mb-12 flex items-center justify-center">
            {/* Glowing neon rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border border-cyan-500/20 border-t-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute w-20 h-20 rounded-full border border-purple-500/20 border-b-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            />
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {Math.floor(progress)}%
            </div>
          </div>

          {/* Technical Terminal Diagnostics */}
          <div className="w-full max-w-lg h-36 bg-black/40 border border-white/5 rounded-lg p-5 flex flex-col justify-end backdrop-blur-md relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {/* Ambient terminal lights */}
            <div className="absolute top-2 left-2 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            
            <div className="space-y-1 font-mono text-xs overflow-hidden max-h-full">
              {BOOT_LOGS.slice(0, logIndex + 1).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-2 ${
                    index === logIndex
                      ? "text-cyan-400"
                      : "text-slate-500"
                  }`}
                >
                  <span className="text-purple-500 font-bold">&gt;</span>
                  <span className="truncate">{log}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Custom Horizontal Bar */}
          <div className="w-full max-w-lg mt-6 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            />
          </div>

          <div className="mt-8 text-slate-600 text-xxs tracking-widest uppercase">
            ANTIGRAVITY // ENGINE v1.2.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
