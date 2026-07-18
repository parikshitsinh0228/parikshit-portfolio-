"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Work",      target: "projects" },
  { label: "About",     target: "about" },
  { label: "Skills",    target: "skills" },
  { label: "Education", target: "education" },
  { label: "Contact",   target: "contact" },
];

export default function Navbar() {
  const [active, setActive]         = useState("");
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const offset = window.scrollY + 140;
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.target);
        if (el && offset >= el.offsetTop) {
          setActive(item.target);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(245,244,241,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div
        className="section-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        {/* Logo / Name */}
        <button
          onClick={() => scrollTo("hero")}
          className="label"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--ink)",
            letterSpacing: "0.08em",
            padding: 0,
          }}
        >
          PC
        </button>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`nav-pill${active === item.target ? " active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="mailto:champavatparikshit@gmail.com"
          className="btn btn-primary hidden-mobile"
          style={{ padding: "8px 18px", fontSize: "0.8125rem" }}
        >
          Hire me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: 8,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexDirection: "column",
            gap: 4,
            padding: 8,
          }}
          aria-label="Menu"
        >
          <span
            style={{
              display: "block",
              width: 16,
              height: 1.5,
              background: "var(--ink)",
              transition: "all 0.2s",
              transform: menuOpen ? "rotate(45deg) translateY(3px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 16,
              height: 1.5,
              background: "var(--ink)",
              opacity: menuOpen ? 0 : 1,
              transition: "all 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 16,
              height: 1.5,
              background: "var(--ink)",
              transition: "all 0.2s",
              transform: menuOpen ? "rotate(-45deg) translateY(-3px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 24px",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "var(--ink-2)",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:champavatparikshit@gmail.com"
            className="btn btn-primary"
            style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
          >
            Hire me
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 639px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
