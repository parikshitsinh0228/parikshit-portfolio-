export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  demoEmbed?: string; // Optional embedded interactive mockup
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'education' | 'experience' | 'achievement' | 'hackathon';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  badgeUrl?: string; // Optional badge image path
}

export interface SkillCategory {
  category: string;
  skills: { name: string; percentage: number; icon?: string }[];
}
