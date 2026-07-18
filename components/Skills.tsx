"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─ All skills for the auto-scrolling marquee ────────────────────────── */
const MARQUEE_SKILLS = [
  "Python", "FastAPI", "LangChain", "ChromaDB", "RAG", "Ollama", "Llama 3",
  "Sentence Transformers", "Scikit-learn", "Pandas", "NumPy", "Matplotlib",
  "React", "Flutter", "Tailwind CSS", "Node.js", "PHP", "SQL", "MySQL",
  "Supabase", "AWS S3", "Railway", "Netlify", "Git", "Jupyter Notebook",
  "Android Studio", "VS Code", "PyMuPDF", "REST APIs", "WebRTC", "Dart",
];

/* ─ Skill groups for the detailed breakdown ──────────────────────────── */
const GROUPS = [
  {
    title: "AI & Machine Learning",
    skills: [
      "Python", "LangChain", "RAG", "ChromaDB", "Ollama / Llama 3",
      "Sentence Transformers", "Scikit-learn", "Pandas", "NumPy",
      "Matplotlib", "PyMuPDF",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "FastAPI", "PHP", "Node.js", "REST APIs", "SQL", "MySQL",
      "Supabase", "WebRTC",
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: ["React", "Flutter / Dart", "HTML & CSS", "Tailwind CSS"],
  },
  {
    title: "Cloud & Tooling",
    skills: ["AWS S3", "Railway", "Netlify", "Git & GitHub", "Jupyter Notebook", "VS Code", "Android Studio"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Duplicate for seamless marquee
  const marqueeItems = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Oversized bg word */}
      <span
        className="bg-word"
        style={{ top: "10%", right: "-5%", zIndex: 0, fontSize: "clamp(5rem, 18vw, 18rem)" }}
        aria-hidden="true"
      >
        skills
      </span>

      <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Label + heading */}
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 10 }}
        >
          Capabilities
        </motion.p>
        <motion.h2
          className="display-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          Technical Stack
        </motion.h2>

        {/* Skill groups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
            marginBottom: 72,
          }}
          className="skills-grid"
        >
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card"
              style={{ padding: "24px 24px 20px" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--ink)",
                  marginBottom: 14,
                  letterSpacing: "-0.005em",
                }}
              >
                {group.title}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="label"
                    style={{
                      padding: "4px 12px",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      color: "var(--ink-2)",
                      background: "var(--bg)",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auto-scrolling marquee */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 0",
          position: "relative",
        }}
      >
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to right, var(--bg), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to left, var(--bg), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{ display: "flex", gap: 28, width: "max-content" }}
          className="animate-marquee"
        >
          {marqueeItems.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                whiteSpace: "nowrap",
              }}
            >
              {skill}
              <span style={{ color: "var(--ink-4)", fontSize: "0.5rem" }}>●</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
