"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      {mounted && (
        <motion.div
          className="scroll-bar"
          style={{ scaleX, width: "100%" }}
        />
      )}

      {/* Page content */}
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--ink)",
        }}
      >
        {children}
      </div>
    </>
  );
}
