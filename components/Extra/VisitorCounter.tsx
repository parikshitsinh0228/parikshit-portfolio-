"use client";

import { useEffect, useState } from "react";
import { Terminal, RefreshCw } from "lucide-react";

export default function VisitorCounter() {
  const [visitorIndex, setVisitorIndex] = useState(0);
  const [queriesProcessed, setQueriesProcessed] = useState(0);

  useEffect(() => {
    // Check localStorage for static seed increment to keep count consistent for client
    let localSeed = localStorage.getItem("telemetry_visitor_index");
    let currentIdx = 8421;

    if (localSeed) {
      currentIdx = parseInt(localSeed, 10) + 1;
    } else {
      currentIdx = Math.floor(8000 + Math.random() * 800);
    }
    localStorage.setItem("telemetry_visitor_index", currentIdx.toString());
    setVisitorIndex(currentIdx);

    // Initial query seed
    const initialQueries = currentIdx * 12 + Math.floor(Math.random() * 100);
    setQueriesProcessed(initialQueries);

    // Simulate real-time queries being processed by AI models
    const timer = setInterval(() => {
      setQueriesProcessed((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[4900] hidden sm:block">
      <div className="glassmorphism rounded-xl px-4 py-2.5 flex items-center gap-3 border border-white/5 shadow-lg select-none text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-white font-bold">Node online</span>
        </div>
        
        <div className="w-[1px] h-3 bg-white/10" />

        <div className="flex flex-col gap-0.5">
          <span className="text-slate-500">Telemetry count</span>
          <span className="text-slate-200 font-bold">{visitorIndex} visits</span>
        </div>

        <div className="w-[1px] h-3 bg-white/10" />

        <div className="flex flex-col gap-0.5">
          <span className="text-slate-500 flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: "8s" }} /> Inference Queries
          </span>
          <span className="text-cyan-400 font-bold">{queriesProcessed.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
