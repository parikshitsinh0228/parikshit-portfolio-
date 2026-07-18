"use client";

import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if on touch screen
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Track links, buttons, and custom cursor pointer targets
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .cursor-pointer"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Add hover listeners immediately & observe DOM for changes
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : linkHovered ? 1.5 : 1})`,
        transition: "transform 0.15s ease",
      }}
      className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference hidden md:block ${
        linkHovered 
          ? "w-8 h-8 bg-cyan-400/25 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]" 
          : "w-4 h-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      }`}
    />
  );
}
