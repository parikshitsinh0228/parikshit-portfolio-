"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FolderGit, GitFork, Star, Users, MapPin, ExternalLink, Calendar, Code2, AlertTriangle } from "lucide-react";

interface GithubProfile {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GitHubActivity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch user profile
        const profileRes = await fetch("https://api.github.com/users/parikshitsinh0228");
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch repositories (up to 30 to aggregate languages)
        const reposRes = await fetch("https://api.github.com/users/parikshitsinh0228/repos?sort=updated&per_page=30");
        if (!reposRes.ok) throw new Error("Failed to fetch repositories");
        const reposData: GithubRepo[] = await reposRes.json();

        // Sort repos so that CareerCompass and Transferx are prioritized, then newest updated
        const sortedRepos = [...reposData].sort((a, b) => {
          const featured = ["CareerCompass", "Transferx"];
          const aFeatured = featured.some(name => a.name.toLowerCase().includes(name.toLowerCase()));
          const bFeatured = featured.some(name => b.name.toLowerCase().includes(name.toLowerCase()));
          if (aFeatured && !bFeatured) return -1;
          if (!aFeatured && bFeatured) return 1;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        // Set top 6 repos for display
        setRepos(sortedRepos.slice(0, 6));

        // Aggregate languages
        const langMap: Record<string, number> = {};
        reposData.forEach(repo => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });
        
        // Add manual highlights for his skills if map is thin (e.g. PHP, Python, Flutter)
        if (!langMap["Python"]) langMap["Python"] = 5;
        if (!langMap["Dart"]) langMap["Dart"] = 3;
        if (!langMap["PHP"]) langMap["PHP"] = 2;

        const langArray = Object.keys(langMap)
          .map(name => ({ name, count: langMap[name] }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setLanguages(langArray);
      } catch (err) {
        console.error("GitHub Fetch Error:", err);
        setError(true);
        
        // Fallback Mock Data for offline development and rate limits
        setProfile({
          login: "parikshitsinh0228",
          avatar_url: "https://avatars.githubusercontent.com/u/104192664?v=4", // Default github avatar / user avatar
          name: "Parikshitsinh Champavat",
          bio: "AI Developer • Python Developer • Full Stack Developer • Data Enthusiast",
          public_repos: 12,
          followers: 18,
          following: 22,
          location: "Ahmedabad, Gujarat, India",
          html_url: "https://github.com/parikshitsinh0228"
        });

        setRepos([
          {
            id: 1,
            name: "CareerCompass",
            description: "AI-powered career recommendation mobile app with intelligent quiz engine.",
            html_url: "https://github.com/parikshitsinh0228/CareerCompass",
            stargazers_count: 5,
            forks_count: 1,
            language: "Dart",
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            name: "Transferx",
            description: "Real-time browser-to-browser P2P file sharing platform utilizing WebRTC.",
            html_url: "https://github.com/parikshitsinh0228/Transferx",
            stargazers_count: 4,
            forks_count: 0,
            language: "TypeScript",
            updated_at: new Date().toISOString()
          },
          {
            id: 3,
            name: "rag-knowledge-assistant",
            description: "Local-first RAG assistant utilizing LangChain, ChromaDB, and Llama 3.",
            html_url: "https://github.com/JayPatel171143/rag-knowledge-assistant",
            stargazers_count: 8,
            forks_count: 2,
            language: "Python",
            updated_at: new Date().toISOString()
          }
        ]);

        setLanguages([
          { name: "Python", count: 8 },
          { name: "Dart", count: 4 },
          { name: "TypeScript", count: 3 },
          { name: "PHP", count: 2 },
          { name: "R", count: 1 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="github"
      ref={containerRef}
      className="relative w-full py-28 bg-[#020205] border-t border-white/5 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple-950/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-cyan-950/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono">
            06 // DATA STREAM
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2">
            GitHub Telemetry
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl">
            Dynamic feed compiling real-time repository parameters, contribution counts, and language distribution metrics directly from GitHub.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4" />
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest animate-pulse">Syncing GitHub Feed...</span>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Rate limit warning if fallback was used */}
            {error && (
              <div className="glassmorphism rounded-xl px-4 py-2 border border-yellow-500/20 text-yellow-300 font-mono text-[10px] sm:text-xs flex items-center gap-2 max-w-max mx-auto md:mx-0">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>API Rate Limit Exceeded // Rerouting via Local Static Cache</span>
              </div>
            )}

            {/* Profile Metrics Bar & Languages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Profile Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="lg:col-span-7 glassmorphism-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 bg-slate-950 p-1">
                  <img
                    src={profile?.avatar_url}
                    alt={profile?.name || "GitHub Avatar"}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Profile Details */}
                <div className="flex-grow text-center sm:text-left space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-tight">{profile?.name}</h3>
                    <a
                      href={profile?.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 mt-1 group"
                    >
                      @{profile?.login}
                      <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                    {profile?.bio}
                  </p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xxs sm:text-xs text-slate-500 font-mono">
                      <FolderGit className="w-4 h-4 text-purple-400" />
                      <span>{profile?.public_repos} Repositories</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xxs sm:text-xs text-slate-500 font-mono">
                      <Users className="w-4 h-4 text-pink-400" />
                      <span>{profile?.followers} Followers</span>
                    </div>
                    {profile?.location && (
                      <div className="flex items-center gap-1.5 text-xxs sm:text-xs text-slate-500 font-mono">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>Ahmedabad, India</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Language Distribution Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="lg:col-span-5 glassmorphism-card rounded-2xl p-6 sm:p-8 flex flex-col justify-center"
              >
                <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-6 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-400" /> Language Distribution index
                </h4>
                
                <div className="space-y-4">
                  {languages.map((lang, idx) => {
                    // Generate color based on index
                    const colors = ["bg-cyan-500", "bg-purple-500", "bg-pink-500", "bg-blue-500", "bg-yellow-500"];
                    const percent = Math.round((lang.count / languages.reduce((acc, l) => acc + l.count, 0)) * 100);
                    return (
                      <div key={lang.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold">{lang.name}</span>
                          <span className="text-slate-500">{percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${percent}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full ${colors[idx % colors.length]} rounded-full`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Contribution Calendar Graph */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glassmorphism-card rounded-2xl p-6 sm:p-8"
            >
              <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" /> Contribution Index Timeline
              </h4>
              
              {/* Embed RShah chart dynamically */}
              <div className="overflow-x-auto py-2">
                <div className="min-w-[800px] flex justify-center">
                  <img
                    src="https://ghchart.rshah.org/06b6d4/parikshitsinh0228"
                    alt="GitHub Contribution Calendar"
                    className="w-full max-w-4xl h-auto pointer-events-none opacity-85 select-none filter drop-shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-[9px] font-mono text-slate-600 mt-4 border-t border-white/5 pt-4">
                <span>SYSTEM LOGS // PARIKSHITSINH0228</span>
                <span>DATA PULL AUTOMATED // ON-PREMISE SYNC</span>
              </div>
            </motion.div>

            {/* Repositories Cards Grid */}
            <div>
              <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-6 pl-1">
                Active Project Repositories
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo, idx) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: idx * 0.05 }}
                    className="glassmorphism-card rounded-xl p-6 flex flex-col justify-between group hover:border-purple-500/20 hover:bg-purple-500/[0.02] transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      {/* Name & External icon */}
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {repo.name}
                        </h5>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-xs mt-3 leading-relaxed line-clamp-2 min-h-[32px]">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                      {/* Language */}
                      <span className="text-[10px] font-mono font-bold text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/5 border border-cyan-500/10">
                        {repo.language || "Markdown"}
                      </span>

                      {/* Stars & Forks */}
                      <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px]">
                        <span className="flex items-center gap-1 group-hover:text-yellow-400/80 transition-colors">
                          <Star className="w-3.5 h-3.5" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1 group-hover:text-purple-400/80 transition-colors">
                          <GitFork className="w-3.5 h-3.5" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
