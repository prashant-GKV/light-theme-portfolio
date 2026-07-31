export interface Project {
  id: string;
  name: string;
  image: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** "contain" shows the full frame un-cropped (used for animated GIFs); default is cover */
  imageFit?: "cover" | "contain";
  /** CSS aspect-ratio for the media box; match the file's native ratio so contain-fit GIFs fill it edge-to-edge. Default "16 / 10". */
  imageAspect?: string;
  /** Feature card — spans 2 columns on wide screens for a bento rhythm. */
  wide?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "ai-resume-analyzer",
    name: "HireReady | AI Resume Analyzer & Interviewer",
    image: "/projects/hireready.gif",
    imageFit: "contain",
    imageAspect: "1588 / 814",
    wide: true,
    description:
      "Developed an AI mock interview platform using Next.js 14, TypeScript, and Zustand with voice interviews, real-time face analysis, speech-to-text, and weighted feedback scoring across 6 categories. Features a multi-provider AI failover router (Gemini, Groq, Mistral, OpenRouter) and an ATS resume analyzer with PDF/DOCX parsing.",
    tech: ["Next.js 14", "TypeScript", "Zustand", "Tailwind CSS", "Supabase", "JWT Auth", "Vercel"],
    githubUrl: "https://github.com/prashant-GKV/ai-interviewer-and-resume-analyser",
    liveUrl: "https://ai-interviewer-and-resume-analyser.vercel.app/",
  },
  {
    id: "guardian-eye",
    name: "GuardianEye | Driver Drowsiness Detection System",
    image: "/projects/guardianeye.png",
    imageFit: "contain",
    imageAspect: "2 / 1",
    wide: true,
    description:
      "Architected a real-time drowsiness detection app using Next.js, FastAPI, and MediaPipe FaceLandmarker; tracks eye closure, yawns, head pose, and gaze entirely in-browser. Implemented JWT auth, WebSocket telemetry, dual scikit-learn models, 4-tier alert escalation, an LLM driving coach, and fleet dashboard.",
    tech: ["Next.js", "FastAPI", "MediaPipe", "scikit-learn", "WebSocket", "Supabase", "Vercel", "Render"],
    githubUrl: "https://github.com/prashant-GKV/guardianEye",
    liveUrl: "https://guardian-eye-theta.vercel.app",
  },
  {
    id: "online-voting-system",
    name: "Online Voting System",
    image: encodeURI("/projects/Online Voting System.png"),
    description:
      "Created a full-stack voting portal (Streamlit + PostgreSQL) with role-based access, admin-managed elections (2–10 candidates), live turnout tracking, and result charts. Enforced race-safe one-vote-per-student with DB-level UNIQUE constraints and bcrypt-hashed authentication across a 6-table schema.",
    tech: ["Python", "Streamlit", "PostgreSQL", "Supabase", "bcrypt"],
    githubUrl: "https://github.com/prashant-GKV/Online-Voting-System",
    liveUrl: "https://online-voting-system-for-students.streamlit.app/",
  },
  {
    id: "todo-list",
    name: "To-Do List",
    image: encodeURI("/projects/To-Do List.png"),
    description:
      "A clean task manager for tracking daily tasks with categories, priority levels, due dates, and completion status — with changes saved automatically.",
    tech: ["Python", "Streamlit"],
    githubUrl: "https://github.com/prashant-GKV/Todo-List",
    liveUrl: "https://prashant-todo-list.streamlit.app/",
  },
  {
    id: "anon",
    name: "Anon",
    image: encodeURI("/projects/Anon.png"),
    imageAspect: "2 / 1",
    wide: true,
    description:
      "A fashion e-commerce storefront with category browsing, product filtering, trending and top-rated sections, deal countdowns, and a full shopping cart flow.",
    tech: ["React", "JavaScript", "CSS3", "Responsive UI"],
    githubUrl: "https://github.com/prashant-GKV/Anon",
    liveUrl: "https://anon-teal-alpha.vercel.app/",
  },
  {
    id: "amazon-frontend",
    name: "Amazon Frontend Clone",
    image: encodeURI("/projects/Front-end of Amazon.png"),
    description:
      "A pixel-accurate front-end clone of Amazon's homepage built purely with HTML and CSS, focused on responsive layout and precise typography matching.",
    tech: ["HTML5", "CSS3", "Flexbox"],
    githubUrl: "https://github.com/prashant-GKV/amazon-front-end",
    liveUrl: "https://prashant-gkv.github.io/amazon-front-end/",
  },
];
