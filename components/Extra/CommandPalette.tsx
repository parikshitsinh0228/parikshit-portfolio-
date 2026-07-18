"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Terminal, FileText, ArrowUp, X, Music } from "lucide-react";

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  shortcut?: string;
  action: () => void;
  icon: React.ReactNode;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Setup options list
  const getItems = (): PaletteItem[] => {
    const items: PaletteItem[] = [
      {
        id: "nav-hero",
        title: "Jump to Hero Intro",
        subtitle: "Navigate to the landing introduction",
        shortcut: "G H",
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => scrollToSection("hero"),
      },
      {
        id: "nav-about",
        title: "Jump to About Section",
        subtitle: "Review bio and statistics profiles",
        shortcut: "G A",
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => scrollToSection("about"),
      },
      {
        id: "nav-projects",
        title: "Jump to Projects Section",
        subtitle: "Explore 3D tilt interactive projects",
        shortcut: "G P",
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => scrollToSection("projects"),
      },
      {
        id: "nav-skills",
        title: "Jump to Technical Stack",
        subtitle: "View skill percentages and databases",
        shortcut: "G S",
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => scrollToSection("skills"),
      },
      {
        id: "nav-experience",
        title: "Jump to Journey Timeline",
        subtitle: "Review educational and hackathon milestones",
        shortcut: "G E",
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => scrollToSection("experience"),
      },
      {
        id: "nav-contact",
        title: "Jump to Contact Form",
        subtitle: "Transmit a connection payload directly",
        shortcut: "G C",
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
        action: () => scrollToSection("contact"),
      },
      {
        id: "util-resume",
        title: "Download Resume Portfolio",
        subtitle: "Get a print-ready PDF CV copy",
        shortcut: "D R",
        icon: <FileText className="w-4 h-4 text-purple-400" />,
        action: () => triggerResumeDownload(),
      },
      {
        id: "util-top",
        title: "Scroll to top",
        subtitle: "Teleport to the top header",
        shortcut: "T T",
        icon: <ArrowUp className="w-4 h-4 text-pink-400" />,
        action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ];

    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerResumeDownload = () => {
    setIsOpen(false);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Resume_AI_Engineer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const filteredItems = getItems();

  return (
    <>
      {/* Floating CTA Trigger Label in Corner */}
      <div className="fixed top-6 right-6 z-[4900] hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-slate-950/40 backdrop-blur-md text-xxs font-mono text-slate-400 hover:text-white hover:border-white/15 transition-all cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Console</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500 font-semibold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Palette Overlay Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9900] flex items-start justify-center bg-black/60 backdrop-blur-md pt-[15vh] px-4"
          >
            <motion.div
              initial={{ y: -20, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#09090e] border border-white/10 rounded-xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 relative">
                <Search className="w-5 h-5 text-slate-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Fuzzy search shortcuts (e.g. projects, resume...)"
                  className="w-full bg-transparent text-white focus:outline-none placeholder-slate-600 text-sm font-mono"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded bg-white/5 border border-white/5 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-[350px] overflow-y-auto p-2 space-y-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-white/3 border border-white/5">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-semibold font-mono">
                            {item.title}
                          </h4>
                          <p className="text-slate-500 text-xs mt-0.5 font-sans">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {item.shortcut && (
                        <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/3 border border-white/5 text-xxs font-mono text-slate-500 font-semibold group-hover:text-slate-300">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="py-12 text-center text-slate-500 text-sm font-mono flex flex-col items-center gap-2">
                    <Terminal className="w-6 h-6 text-slate-700" />
                    No system matches found.
                  </div>
                )}
              </div>

              {/* Palette footer instructions */}
              <div className="bg-[#050508] px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-600">
                <span>Use keyboard shortcut ⌘K to open/close</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
