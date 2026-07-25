import { Project, ExperienceItem, Certification, SkillCategory } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "rag-knowledge-assistant",
    title: "RAG Knowledge Assistant",
    category: "Artificial Intelligence",
    tagline: "Local-first Retrieval-Augmented Generation (RAG) assistant for secure document queries.",
    description: "A secure, privacy-first knowledge assistant designed to parse, embed, and index local documents without requiring external API calls. Features high contextual integrity, citation tracking, and streaming outputs.",
    problem: "Uploading private documentation to external cloud AI APIs violates privacy constraints, incurs high operational API costs, and risks data leakage.",
    solution: "Developed a completely local retrieval system powered by LangChain and ChromaDB. It processes multi-PDF files locally, generates semantic embeddings on the fly, and uses Ollama with Llama 3 to output accurate context-aware responses.",
    architecture: "Multi-PDF documents are parsed using PyMuPDF and split using a recursive character chunker. Texts are embedded using Sentence Transformers ('all-MiniLM-L6-v2') and indexed in ChromaDB vector store. Queries retrieve the top relevant chunks to augment the Llama 3 generation prompt, streaming responses back to a modern UI.",
    features: [
      "Multi-PDF concurrent document upload and text parsing",
      "Local vector search with ChromaDB for context retrieval",
      "Embeddings calculation using Sentence Transformers",
      "Offline inference utilizing Ollama and Llama 3",
      "Streaming chat responses with exact chunk references and page numbers"
    ],
    techStack: ["FastAPI", "LangChain", "ChromaDB", "Ollama", "Llama 3", "Sentence Transformers", "PyMuPDF", "Tailwind CSS", "Python"],
    githubUrl: "https://github.com/JayPatel171143/rag-knowledge-assistant",
    liveUrl: "https://github.com/JayPatel171143/rag-knowledge-assistant"
  },
  {
    id: "transferx",
    title: "TransferX",
    category: "Full Stack Development",
    tagline: "Real-time, peer-to-peer cross-device file sharing platform.",
    description: "A fast, browser-to-browser P2P file sharing hub utilizing WebRTC channels. Eliminates intermediary server storage, facilitating high transmission speeds and secure cross-device file synchronization.",
    problem: "Standard cloud transfer services upload files to centralized servers first, introducing security vulnerabilities, speed bottlenecks, and file size limits.",
    solution: "Engineered a peer-to-peer streaming solution that establishes direct WebRTC data channels between devices. Uses Supabase for secure realtime user handshakes, signaling, and presence synchronization.",
    architecture: "React and TypeScript client-side app. Connects to a Supabase signaling server to coordinate WebRTC SDP offers/answers and ICE candidates. Once connected, files are read via FileReader, chunked into array buffers, and streamed directly between browsers with memory throttle guards.",
    features: [
      "Direct browser-to-browser WebRTC data streaming",
      "Real-time signaling and connection handshakes using Supabase Channels",
      "Zero server storage requirements, ensuring file privacy",
      "Cross-device real-time synchronization and connection logging",
      "Visual transfer speed tracking and completion progress"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "WebRTC", "Netlify"],
    githubUrl: "https://github.com/parikshitsinh0228/Transferx",
    liveUrl: "https://github.com/parikshitsinh0228/Transferx"
  },
  {
    id: "career-compass",
    title: "Career Compass",
    category: "Machine Learning / Mobile",
    tagline: "AI-powered career recommendation platform and learning roadmap engine.",
    description: "An intelligent career counselor mobile app designed to evaluate student profiles, technical skills, and behavioral assessments to suggest customized paths and dynamic study plans.",
    problem: "Graduating students frequently experience guidance deficits and decision fatigue, leading to misaligned career tracks and skill mismatch.",
    solution: "Created a comprehensive assessment app with an adaptive testing engine. The client app gathers interest inputs, feeds them to a machine learning classifier, and outputs top recommended roles alongside custom progress milestones.",
    architecture: "Flutter cross-platform client app interfacing with a PHP backend API hosted on Railway. The backend manages student profiles and runs a lightweight Python microservice with trained Scikit-learn Random Forest classifiers to predict matching careers.",
    features: [
      "Adaptive career assessment quiz matching 50+ career roles",
      "Machine learning classification model predicting career alignment",
      "Custom learning roadmap generation with resource links",
      "Secure backend API for authentication and profile management",
      "Fluid Flutter mobile interface with micro-interactions"
    ],
    techStack: ["Flutter", "Dart", "PHP", "MySQL", "Railway", "Python", "Scikit-learn"],
    githubUrl: "https://github.com/parikshitsinh0228/CareerCompass",
    liveUrl: "https://github.com/parikshitsinh0228/CareerCompass"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "edu-msc",
    role: "MSc Information Technology",
    company: "GLS University",
    period: "2025 - 2027",
    description: [
      "Currently pursuing Master of Science in Information Technology.",
      "Maintaining a strong academic performance with a CGPA of 8.0.",
      "Specializing in Advanced Software Architectures, Enterprise AI Systems, and Distributed Computing models."
    ],
    type: "education"
  },
  {
    id: "edu-bsc",
    role: "BSc CA & IT",
    company: "Indus University",
    period: "2022 - 2025",
    description: [
      "Completed Bachelor of Science in Computer Applications & Information Technology.",
      "Graduated with a high academic standing, achieving a CGPA of 8.58.",
      "Developed a solid foundation in computer programming, web applications, object-oriented concepts, database management, and data structures."
    ],
    type: "education"
  },
  {
    id: "edu-hse",
    role: "Higher Secondary Education (HSC)",
    company: "Gujarat Secondary and Higher Secondary Education Board",
    period: "Completed 2022",
    description: [
      "Finished Higher Secondary School Certificate in Commerce stream.",
      "Secured a strong academic record with an aggregate score of 73.20%."
    ],
    type: "education"
  },
  {
    id: "edu-ssc",
    role: "Secondary Education (SSC)",
    company: "Gujarat Secondary and Higher Secondary Education Board",
    period: "Completed 2020",
    description: [
      "Finished Secondary School Certificate with an aggregate score of 76.67%."
    ],
    type: "education"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-aws-s3",
    title: "AWS S3 for Web Hosting and Automation",
    issuer: "Amazon Web Services (AWS)",
    date: "2026",
    credentialId: "AWS-S3-HOSTING-001",
    badgeUrl: "/assets/aws-certified.svg"
  },
  {
    id: "cert-kaggle-sql",
    title: "Intro to SQL",
    issuer: "Kaggle",
    date: "2026",
    credentialId: "KAG-SQL-INTRO-002",
    badgeUrl: "/assets/kaggle-sql.svg"
  },
  {
    id: "cert-cisco-py",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "2026",
    credentialId: "CSCO-PY-ESS1-003",
    badgeUrl: "/assets/cisco-python.svg"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming",
    skills: [
      { name: "Python", percentage: 95 },
      { name: "PHP", percentage: 80 },
      { name: "SQL", percentage: 90 },
      { name: "R", percentage: 70 }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", percentage: 88 },
      { name: "HTML & CSS", percentage: 95 },
      { name: "Tailwind CSS", percentage: 92 },
      { name: "Flutter", percentage: 85 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "FastAPI", percentage: 90 },
      { name: "Node.js", percentage: 75 },
      { name: "REST APIs", percentage: 90 }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", percentage: 88 },
      { name: "Supabase", percentage: 85 },
      { name: "ChromaDB (Vector)", percentage: 80 }
    ]
  },
  {
    category: "AI & Data Science",
    skills: [
      { name: "LangChain & RAG", percentage: 88 },
      { name: "Machine Learning", percentage: 82 },
      { name: "Pandas & NumPy", percentage: 90 },
      { name: "Scikit-learn", percentage: 82 },
      { name: "Matplotlib", percentage: 80 },
      { name: "Ollama / Llama 3", percentage: 85 },
      { name: "Sentence Transformers", percentage: 82 }
    ]
  },
  {
    category: "Cloud & Tools",
    skills: [
      { name: "Railway", percentage: 85 },
      { name: "Netlify", percentage: 85 },
      { name: "AWS S3", percentage: 80 },
      { name: "Git & GitHub", percentage: 90 },
      { name: "VS Code", percentage: 95 },
      { name: "Android Studio", percentage: 80 },
      { name: "Jupyter Notebook", percentage: 90 }
    ]
  }
];
