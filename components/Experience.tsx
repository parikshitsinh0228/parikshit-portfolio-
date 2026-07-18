"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERIENCE } from "@/constants/data";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 10 }}
        >
          Academics
        </motion.p>
        <motion.h2
          className="display-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          Education
        </motion.h2>

        {/* Two-column layout: dates left, cards right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 0,
          }}
          className="edu-outer-grid"
        >
          {/* Timeline */}
          <div
            style={{
              position: "relative",
              paddingLeft: 20,
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 8,
                bottom: 0,
                width: 1,
                background: "var(--border)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {EXPERIENCE.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "relative",
                    paddingBottom: idx < EXPERIENCE.length - 1 ? 48 : 0,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -25,
                      top: 8,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: idx === 0 ? "var(--ink)" : "var(--bg)",
                      border: "1.5px solid var(--border-md)",
                    }}
                  />

                  {/* Content */}
                  <div
                    className="card"
                    style={{
                      padding: "20px 24px",
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 12,
                    }}
                    >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9375rem",
                            fontWeight: 500,
                            color: "var(--ink)",
                            marginBottom: 2,
                          }}
                        >
                          {item.role}
                        </p>
                        <p
                          className="label"
                          style={{ color: "var(--ink-3)" }}
                        >
                          {item.company}
                        </p>
                      </div>
                      <span
                        className="label"
                        style={{
                          padding: "3px 10px",
                          border: "1px solid var(--border)",
                          borderRadius: 100,
                          color: "var(--ink-4)",
                          background: "var(--bg)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.period}
                      </span>
                    </div>

                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                      {item.description.map((d, i) => (
                        <li
                          key={i}
                          className="body-sm"
                          style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                        >
                          <span style={{ color: "var(--ink-4)", flexShrink: 0 }}>—</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
