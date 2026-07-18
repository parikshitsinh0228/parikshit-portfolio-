"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "AI Developer",
  "Python Developer",
  "Full Stack Developer",
  "ML Enthusiast",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // no video needed, just animate the roles
  useEffect(() => {
    /* placeholder for any future effect */
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 0 64px",
        overflow: "hidden",
      }}
    >
      {/* ── Oversized background word ─────────────────────── */}
      <span
        className="bg-word"
        style={{
          bottom: "-4%",
          left: "-2%",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        champavat
      </span>

      {/* ── Content ─────────────────────────────────────────── */}
      <div
        className="section-wrap"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="hero-grid">
          <div className="hero-text">
            {/* Eyebrow label */}
            <motion.p
              className="label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginBottom: 24, color: "var(--ink-3)" }}
            >
              Based in Ahmedabad, India
            </motion.p>

            {/* Giant headline */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 32 }}
            >
              Parikshitsinh
              <br />
              Champavat
            </motion.h1>

            {/* Roles row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: 40,
              }}
            >
              {ROLES.map((role) => (
                <span
                  key={role}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "5px 14px",
                    border: "1px solid var(--border-md)",
                    borderRadius: 100,
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--ink-2)",
                    background: "var(--bg-raised)",
                  }}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Blurb + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 24,
              }}
            >
              <p
                className="body-lg"
                style={{ maxWidth: 560, color: "var(--ink-2)", marginBottom: 24 }}
              >
                Building intelligent applications at the intersection of
                Python, FastAPI, RAG systems, LangChain and modern web
                technologies.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo("projects")}
                  className="btn btn-primary"
                >
                  View Work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="btn btn-ghost"
                >
                  Get in touch
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Circular Avatar */}
          <div className="hero-avatar-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="avatar-ring-outer"
            >
              <div className="avatar-ring-inner">
                <img
                  src="/profile.jpg"
                  alt="Parikshitsinh Champavat"
                  className="avatar-img"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 32,
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
          }}
        >
          <a
            href="https://github.com/parikshitsinh0228"
            target="_blank"
            rel="noopener noreferrer"
            className="label"
            style={{ color: "var(--ink-3)", textDecoration: "none" }}
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/parikshit-champavat"
            target="_blank"
            rel="noopener noreferrer"
            className="label"
            style={{ color: "var(--ink-3)", textDecoration: "none" }}
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:champavatparikshit@gmail.com"
            className="label"
            style={{ color: "var(--ink-3)", textDecoration: "none" }}
          >
            Email ↗
          </a>

          <span
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            <span className="label" style={{ color: "var(--ink-3)" }}>
              Open to opportunities
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
