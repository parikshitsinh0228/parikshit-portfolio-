"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      if (scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Top sticky progress line */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-950 z-[9990] p-[0.5px]">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
        />
      </div>

      {/* Floating Go To Top button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-24 left-8 md:bottom-8 md:left-[50%] md:-translate-x-1/2 z-[4900] p-3 rounded-full border border-white/5 bg-slate-950/40 backdrop-blur-md text-slate-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-all cursor-pointer shadow-lg"
            title="Teleport to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
