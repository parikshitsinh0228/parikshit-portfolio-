"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, Briefcase, GraduationCap, Award, Mail, Phone, MapPin } from "lucide-react";
import { EXPERIENCE, CERTIFICATIONS } from "@/constants/data";

export default function Resume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Resume_Parikshitsinh_Champavat.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      ref={containerRef}
      className="relative w-full py-28 bg-[#020205] border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-purple-950/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 z-10 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 font-mono">
            07 // CREDENTIAL INDEX
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2">
            Interactive Resume
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            View a digital blueprint of my professional achievements, or download a printable PDF copy.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={triggerDownload}
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] cursor-pointer"
          >
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download Printable Resume (PDF)
          </button>
        </div>

        {/* Digital CV Preview Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#05050a] border border-white/10 rounded-2xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-sans relative overflow-hidden"
        >
          {/* Accent lighting dots */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
          
          {/* CV Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start pb-8 border-b border-white/5 gap-6">
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Parikshitsinh Champavat</h3>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1 uppercase tracking-widest">
                AI Developer • Python Developer • Full Stack Developer
              </p>
            </div>
            
            <div className="text-slate-400 font-mono text-xs space-y-1.5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-600" />
                <a href="mailto:champavatparikshit@gmail.com" className="hover:text-cyan-400 transition-colors">
                  champavatparikshit@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <a href="tel:+916353459819" className="hover:text-purple-400 transition-colors">
                  +91 6353459819
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* CV Body Structure */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
            
            {/* Left Panel: Statement, Experience, Education */}
            <div className="md:col-span-8 space-y-8">
              
              {/* Professional Statement */}
              <div>
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Professional Statement
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Innovative programmer and developer focused on building AI recommender apps, local RAG knowledge systems, and real-time file sharing solutions. Experienced in developing secure architectures, machine learning classifiers, and responsive interfaces that offer high user accessibility.
                </p>
              </div>

              {/* Technical Experience timeline summary */}
              <div>
                <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Experience & Achievements
                </h4>
                <div className="space-y-6">
                  {EXPERIENCE.filter(e => e.type === "experience" || e.type === "hackathon" || e.type === "achievement").map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l border-white/5 space-y-1.5">
                      <div className="flex justify-between items-baseline flex-wrap text-sm">
                        <span className="font-bold text-white">{exp.role}</span>
                        <span className="text-slate-500 text-xs font-mono">{exp.period}</span>
                      </div>
                      <div className="text-slate-400 text-xs">{exp.company}</div>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                        {exp.description[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Panel: Academic background & Credentials */}
            <div className="md:col-span-4 space-y-8">
              
              {/* Education Block */}
              <div>
                <h4 className="text-xs font-mono text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Education
                </h4>
                {EXPERIENCE.filter(e => e.type === "education").map((edu) => (
                  <div key={edu.id} className="space-y-1.5">
                    <div className="text-sm font-bold text-white leading-snug">{edu.company}</div>
                    <div className="text-cyan-400 text-xs font-semibold">{edu.role}</div>
                    <div className="text-slate-500 text-xs font-mono">{edu.period}</div>
                  </div>
                ))}
              </div>

              {/* Certifications Deck */}
              <div>
                <h4 className="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Credentials
                </h4>
                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <div className="font-semibold text-slate-200">{cert.title}</div>
                      <div className="text-slate-500">{cert.issuer}</div>
                      {cert.credentialId && (
                        <div className="text-slate-600 font-mono text-xxs mt-0.5">ID: {cert.credentialId}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
