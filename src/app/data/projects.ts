export interface Project {
  id: string;
  name: string;
  image: string;
  description: string;
  tech: string[];
  githubUrl?: string; // to be filled in later
  liveUrl?: string;   // to be filled in later
  /** "contain" shows the full frame un-cropped (used for animated GIFs); default is cover */
  imageFit?: "cover" | "contain";
}

// Images live in /public/projects/. Filenames contain spaces, so the paths
// are wrapped in encodeURI() to stay valid URLs.
export const PROJECTS: Project[] = [
  {
    id: "ai-resume-analyzer",
    name: "HireReady",
    image: "/projects/hireready.gif",
    imageFit: "contain",
    description:
      "An AI-powered platform that analyzes your resume and then takes an interview based on it. Upload your resume — the AI reviews and scores it, highlights weak areas, and then conducts a personalized mock interview built around your resume.",
    tech: ["Next.js", "TypeScript", "Claude API", "Tailwind CSS"],
    githubUrl: "",
  },
  {
    id: "online-voting-system",
    name: "Online Voting System",
    image: encodeURI("/projects/Online Voting System.png"),
    description:
      "A secure student voting platform with voter registration, one-vote-per-student enforcement, anonymous ballots, and live result tracking once an election closes.",
    tech: ["Python", "Streamlit", "Pandas"],
    githubUrl: "https://github.com/prashant-GKV/Online-Voting-System",
    liveUrl: "https://online-voting-system-for-students.streamlit.app/",
  },
  {
    id: "anon",
    name: "Anon",
    image: encodeURI("/projects/Anon.png"),
    description:
      "A fashion e-commerce storefront with category browsing, product filtering, trending and top-rated sections, deal countdowns, and a full shopping cart flow.",
    tech: ["React", "JavaScript", "CSS3", "Responsive UI"],
    githubUrl: "https://github.com/prashant-GKV/Anon",
    liveUrl: "https://anon-teal-alpha.vercel.app/",
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
