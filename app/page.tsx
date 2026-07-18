import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import EducationTimeline from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <EducationTimeline />
        <Certifications />
        <Contact />
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <p className="label" style={{ color: "var(--ink-4)" }}>
          Parikshitsinh Champavat — AI & Python Developer
        </p>
        <p className="label" style={{ color: "var(--ink-4)" }}>
          Ahmedabad, India · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
