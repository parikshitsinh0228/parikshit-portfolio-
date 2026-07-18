"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants/data";
import { Project } from "@/types";

/* ── Abstract flow diagram for each project ─────────────────────────── */
function FlowDiagram({ id }: { id: string }) {
  const flows: Record<string, string[]> = {
    "rag-knowledge-assistant": ["PDF", "Chunk", "Embed", "Vector DB", "LLM"],
    "transferx":               ["Upload", "Cloud", "Signal", "P2P Stream"],
    "career-compass":          ["Quiz", "AI Model", "Recommend"],
  };
  const steps = flows[id] ?? [];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 4,
        marginTop: 20,
      }}
    >
      {steps.map((s, i) => (
        <span key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="diagram-node">{s}</span>
          {i < steps.length - 1 && (
            <span className="diagram-arrow">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ── Project card ─────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={onClick}
        className="card"
        style={{
          width: "100%",
          textAlign: "left",
          padding: "32px",
          cursor: "pointer",
          border: "1px solid var(--border)",
          background: "var(--bg-raised)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          minHeight: 260,
        }}
      >
        {/* Category + index */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <span className="label">{project.category}</span>
          <span
            className="label"
            style={{ color: "var(--ink-4)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.75rem",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="body-sm" style={{ marginTop: 10 }}>
          {project.tagline}
        </p>

        {/* Abstract flow diagram */}
        <FlowDiagram id={project.id} />

        {/* Tech stack chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: "auto",
            paddingTop: 20,
          }}
        >
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="label"
              style={{
                padding: "3px 10px",
                border: "1px solid var(--border)",
                borderRadius: 100,
                color: "var(--ink-3)",
              }}
            >
              {t}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="label"
              style={{ color: "var(--ink-4)", padding: "3px 4px" }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* View detail prompt */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--ink-4)",
            marginTop: 18,
          }}
        >
          View details →
        </p>
      </button>
    </motion.div>
  );
}

/* ── Project detail modal ────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(26,25,23,0.45)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.97 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border-md)",
          borderRadius: 20,
          maxWidth: 740,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div>
            <p className="label" style={{ marginBottom: 4 }}>
              {project.category}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "var(--ink-3)",
              flexShrink: 0,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 28px 36px" }}>
          {/* Abstract diagram */}
          <div
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 24,
            }}
          >
            <p className="label" style={{ marginBottom: 10 }}>
              Data Flow
            </p>
            <FlowDiagram id={project.id} />
          </div>

          {/* Description */}
          <p className="body-lg" style={{ marginBottom: 24 }}>
            {project.description}
          </p>

          {/* Problem / Solution */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 12,
              marginBottom: 24,
            }}
            className="ps-grid"
          >
            <div
              style={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <p className="label" style={{ marginBottom: 8 }}>Problem</p>
              <p className="body-sm">{project.problem}</p>
            </div>
            <div
              style={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <p className="label" style={{ marginBottom: 8 }}>Solution</p>
              <p className="body-sm">{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <p className="label" style={{ marginBottom: 10 }}>
            Key Features
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {project.features.map((f, i) => (
              <li
                key={i}
                className="body-sm"
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <span style={{ color: "var(--ink-4)", flexShrink: 0 }}>—</span>
                {f}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <p className="label" style={{ marginBottom: 10 }}>
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="label"
                  style={{
                    padding: "4px 12px",
                    border: "1px solid var(--border-md)",
                    borderRadius: 100,
                    color: "var(--ink-2)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on GitHub
            </a>
            {project.liveUrl !== project.githubUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Live App ↗
              </a>
            )}
          </div>
        </div>

        <style>{`
          @media (min-width: 600px) { .ps-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="section-wrap">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <motion.p
              className="label"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: 10 }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              className="display-md"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Projects
            </motion.h2>
          </div>

          <motion.p
            className="body-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ maxWidth: 320 }}
          >
            Three shipped products spanning AI, real-time P2P systems,
            and intelligent mobile applications.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 700px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1060px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
