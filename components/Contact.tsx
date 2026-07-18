"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "success" | "error">("idle");
  const [toast, setToast]     = useState("");

  const showToast = (msg: string, type: "success" | "error") => {
    setStatus(type);
    setToast(msg);
    setTimeout(() => { setStatus("idle"); setToast(""); }, 4000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return showToast("Please enter your name.", "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return showToast("Please enter a valid email.", "error");
    if (message.trim().length < 10)
      return showToast("Message must be at least 10 characters.", "error");

    setStatus("sending");

    const SVC = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "service_mock";
    const TPL = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_mock";
    const KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "key_mock";

    if (SVC === "service_mock") {
      setTimeout(() => {
        showToast("Message sent! (demo mode)", "success");
        setName(""); setEmail(""); setMessage("");
      }, 900);
      return;
    }

    try {
      if (formRef.current) {
        await emailjs.sendForm(SVC, TPL, formRef.current, KEY);
        showToast("Message sent! I'll be in touch.", "success");
        setName(""); setEmail(""); setMessage("");
      }
    } catch {
      showToast("Send failed. Email me directly.", "error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--bg-raised)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--ink)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.6875rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--ink-3)",
    marginBottom: 7,
  };

  return (
    <section
      id="contact"
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
        style={{ bottom: "-6%", left: "-2%", zIndex: 0 }}
        aria-hidden="true"
      >
        hello
      </span>

      <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ marginBottom: 10 }}
        >
          Contact
        </motion.p>
        <motion.h2
          className="display-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 16 }}
        >
          Let&apos;s work together
        </motion.h2>
        <motion.p
          className="body-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          style={{ maxWidth: 480, marginBottom: 56 }}
        >
          Open to full-time roles, internships, and freelance AI/ML and
          full-stack projects. Drop a message below or reach out directly.
        </motion.p>

        {/* Two-column layout */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}
          className="contact-grid"
        >
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            {[
              {
                label: "Email",
                value: "champavatparikshit@gmail.com",
                href: "mailto:champavatparikshit@gmail.com",
              },
              {
                label: "Phone",
                value: "+91 6353459819",
                href: "tel:+916353459819",
              },
              {
                label: "Location",
                value: "Ahmedabad, Gujarat, India",
                href: null,
              },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <p className="label" style={{ marginBottom: 4, color: "var(--ink-4)" }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--ink)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border-md)",
                      paddingBottom: 1,
                      transition: "border-color 0.2s",
                    }}
                  >
                    {value}
                  </a>
                ) : (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--ink-2)",
                    }}
                  >
                    {value}
                  </p>
                )}
              </div>
            ))}

            {/* Social links */}
            <div
              style={{
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 20,
              }}
            >
              {[
                { label: "GitHub", href: "https://github.com/parikshitsinh0228" },
                { label: "LinkedIn", href: "https://linkedin.com/in/parikshit-champavat" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label"
                  style={{
                    color: "var(--ink-3)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {label} ↗
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                border: "1px solid var(--border)",
                borderRadius: 100,
                background: "var(--bg-raised)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span className="label" style={{ color: "var(--ink-2)" }}>
                Available for Full-time & Internship
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div>
                <label htmlFor="c-name" style={labelStyle}>Name</label>
                <input
                  id="c-name"
                  name="from_name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                  disabled={status === "sending"}
                />
              </div>
              <div>
                <label htmlFor="c-email" style={labelStyle}>Email</label>
                <input
                  id="c-email"
                  name="reply_to"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={inputStyle}
                  disabled={status === "sending"}
                />
              </div>
              <div>
                <label htmlFor="c-message" style={labelStyle}>Message</label>
                <textarea
                  id="c-message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would you like to work on?"
                  rows={5}
                  style={{ ...inputStyle, resize: "none" }}
                  disabled={status === "sending"}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
                {status !== "sending" && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {status !== "idle" && status !== "sending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: "fixed",
              bottom: 28,
              right: 24,
              zIndex: 3000,
              padding: "12px 20px",
              borderRadius: 10,
              background: status === "success" ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${status === "success" ? "#bbf7d0" : "#fecaca"}`,
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: status === "success" ? "#166534" : "#991b1b",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              maxWidth: 320,
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 820px) {
          .contact-grid { grid-template-columns: 1fr 1.4fr !important; }
        }
        input:focus, textarea:focus {
          border-color: var(--ink) !important;
        }
      `}</style>
    </section>
  );
}
