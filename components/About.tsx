"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─ accent colour for highlighted spans ─ */
const AC = "#A0785A"; // warm brown accent matching reference


export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
        position: "relative",
      }}
    >
      <div className="section-wrap">

        {/* ── TOP TWO-COLUMN BLOCK ──────────────────────────── */}
        <div className="about-top-grid">

          {/* LEFT — label + headline */}
          <div style={{ paddingRight: 24 }}>
            <motion.p
              {...fade(0)}
              className="label"
              style={{ marginBottom: 20, color: "var(--ink-3)" }}
            >
              ABOUT ME
            </motion.p>

            <motion.h2
              {...fade(0.08)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.18,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Merging analytics and intelligent software.
            </motion.h2>
          </div>

          {/* RIGHT — paragraphs with accent highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            {/* P1 — bold intro */}
            <motion.p
              {...fade(0.12)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.9rem, 1.5vw, 1.0625rem)",
                fontWeight: 600,
                color: "var(--ink)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              I am an MSc IT student specializing in Data Analytics and AI at GLS
              University, Ahmedabad. My mission is to build highly functional{" "}
              <span style={{ color: AC }}>full-stack</span> and{" "}
              <span style={{ color: AC }}>ML-driven</span> applications that
              simplify workflows and provide actual,{" "}
              <span style={{ color: AC }}>local-first intelligence</span>.
            </motion.p>

            {/* P2 — stack detail */}
            <motion.p
              {...fade(0.18)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
                fontWeight: 400,
                color: "var(--ink-2)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              I&apos;m comfortable across the entire technical stack: building
              secure vector searches with{" "}
              <span style={{ color: AC }}>ChromaDB</span>, streaming responses
              from local LLMs with{" "}
              <span style={{ color: AC }}>FastAPI</span>, constructing modular
              mobile frontends with{" "}
              <span style={{ color: AC }}>Flutter</span>, and managing cloud
              deployments.
            </motion.p>

            {/* P3 — philosophy */}
            <motion.p
              {...fade(0.24)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
                fontWeight: 400,
                color: "var(--ink-2)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              My engineering philosophy focuses on{" "}
              <span style={{ color: AC }}>privacy-first systems</span>, robust
              local operations, and clean database designs. I enjoy building{" "}
              <span style={{ color: AC }}>
                things that are fast, useful, and fully responsive
              </span>
              , without adding unnecessary bloat.
            </motion.p>
          </div>
        </div>


      </div>

      <style>{`
        /* Default: single column */
        .about-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .about-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        /* Tablet+ */


        /* Desktop */
        @media (min-width: 900px) {
          .about-top-grid {
            grid-template-columns: 280px 1fr;
            gap: 80px;
            align-items: start;
          }
        }

        @media (min-width: 1100px) {
          .about-top-grid {
            grid-template-columns: 320px 1fr;
            gap: 100px;
          }
        }
      `}</style>
    </section>
  );
}
