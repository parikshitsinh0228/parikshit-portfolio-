"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CERTIFICATIONS } from "@/constants/data";

const ISSUERS: Record<string, string> = {
  "Amazon Web Services (AWS)": "AWS",
  "Kaggle":                    "Kaggle",
  "Cisco Networking Academy":  "Cisco",
};

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="certifications"
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
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ marginBottom: 10 }}
        >
          Credentials
        </motion.p>
        <motion.h2
          className="display-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          Certifications
        </motion.h2>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 12,
          }}
          className="cert-grid"
        >
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="card-outlined"
              style={{
                padding: "22px 24px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              {/* Issuer badge */}
              <div
                style={{
                  flexShrink: 0,
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.06em",
                  color: "var(--ink-3)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  textTransform: "uppercase",
                  padding: "0 4px",
                }}
              >
                {ISSUERS[cert.issuer] ?? cert.issuer.split(" ")[0]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                    marginBottom: 3,
                  }}
                >
                  {cert.title}
                </p>
                <p className="label" style={{ color: "var(--ink-4)" }}>
                  {cert.issuer}
                </p>
              </div>

              {/* Date */}
              <span
                className="label"
                style={{
                  flexShrink: 0,
                  padding: "3px 10px",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  color: "var(--ink-4)",
                  background: "var(--bg)",
                }}
              >
                {cert.date}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 700px) {
          .cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
