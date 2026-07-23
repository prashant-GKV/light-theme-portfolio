import { type ElementType } from "react";
import { motion } from "motion/react";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
  SiFramer, SiVite,
  SiNodedotjs, SiExpress, SiFastapi, SiStreamlit, SiMongodb, SiMysql,
  SiPostgresql, SiPrisma,
  SiPython, SiCplusplus, SiTypescript,
  SiPandas, SiNumpy, SiScikitlearn, SiDocker, SiGit, SiSupabase,
  SiVercel, SiNetlify,
} from "react-icons/si";
import { Globe } from "./Globe";

type SkillEntry = { name: string; Icon: ElementType; color: string };

const skillCategories: { label: string; accent: string; skills: SkillEntry[] }[] = [
  {
    label: "Frontend",
    accent: "#0E7490",
    skills: [
      { name: "HTML5",      Icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS",        Icon: SiCss,         color: "#2965F1" },
      { name: "JavaScript", Icon: SiJavascript,  color: "#E0B800" },
      { name: "React",      Icon: SiReact,       color: "#149ECA" },
      { name: "Next.js",    Icon: SiNextdotjs,   color: "#000000" },
      { name: "Tailwind",   Icon: SiTailwindcss, color: "#0E7490" },
      { name: "Framer Motion", Icon: SiFramer, color: "#7C3AED" },
      { name: "Vite",       Icon: SiVite,        color: "#B45309" },
    ],
  },
  {
    label: "Backend",
    accent: "#7C3AED",
    skills: [
      { name: "Node.js",    Icon: SiNodedotjs,  color: "#339933" },
      { name: "Express",    Icon: SiExpress,    color: "#4B5563" },
      { name: "FastAPI",    Icon: SiFastapi,    color: "#059669" },
      { name: "Streamlit",  Icon: SiStreamlit,  color: "#FF4B4B" },
      { name: "MongoDB",    Icon: SiMongodb,    color: "#47A248" },
      { name: "MySQL",      Icon: SiMysql,      color: "#4479A1" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { name: "Prisma",     Icon: SiPrisma,     color: "#2D3748" },
    ],
  },
  {
    label: "Languages",
    accent: "#DB2777",
    skills: [
      { name: "Java",       Icon: SiCplusplus,  color: "#F89820" },
      { name: "Python",     Icon: SiPython,     color: "#3776AB" },
      { name: "C++",        Icon: SiCplusplus,  color: "#00599C" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    label: "Cloud & Tools",
    accent: "#047857",
    skills: [
      { name: "Pandas",       Icon: SiPandas,      color: "#150458" },
      { name: "NumPy",        Icon: SiNumpy,       color: "#4DABCF" },
      { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
      { name: "Docker",       Icon: SiDocker,      color: "#2496ED" },
      { name: "Git",          Icon: SiGit,         color: "#F05032" },
      { name: "Supabase",     Icon: SiSupabase,    color: "#3ECF8E" },
      { name: "Vercel",       Icon: SiVercel,      color: "#000000" },
      { name: "Netlify",      Icon: SiNetlify,     color: "#00A392" },
    ],
  },
];

/* Max skills across all categories — used for ghost-card alignment */
const MAX_SKILLS = Math.max(...skillCategories.map((c) => c.skills.length));

function JavaBadge() {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: 5,
      backgroundColor: "#F89820",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, color: "#fff",
    }}>J</div>
  );
}

function SkillCard({ name, Icon, color, accent, delay, isJava }: SkillEntry & { accent: string; delay: number; isJava?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background    = `linear-gradient(160deg, #FFFFFF 30%, ${accent}17 130%)`;
        el.style.borderColor   = `${accent}59`;
        el.style.boxShadow     = `0 8px 22px ${accent}24, 0 2px 8px rgba(18,20,43,0.05)`;
        el.style.transform     = "translateY(-4px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background    = `linear-gradient(160deg, #FFFFFF 40%, ${accent}0C 130%)`;
        el.style.borderColor   = `${accent}21`;
        el.style.boxShadow     = "0 1px 2px rgba(18,20,43,0.04)";
        el.style.transform     = "none";
      }}
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "14px 8px",
        gap:             8,
        minHeight:       85,
        borderRadius:    14,
        background:     `linear-gradient(160deg, #FFFFFF 40%, ${accent}0C 130%)`,
        border:         `1px solid ${accent}21`,
        boxShadow:      "0 1px 2px rgba(18,20,43,0.04)",
        cursor:         "pointer",
        transition:     "all 0.3s ease",
      }}
    >
      <div style={{
        width:           34, height: 34,
        borderRadius:     9,
        backgroundColor: `${color}12`,
        border:          `1px solid ${color}28`,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        flexShrink:       0,
      }}>
        {isJava ? <JavaBadge /> : <Icon size={18} color={color} />}
      </div>
      <span style={{
        fontFamily:    "'Space Grotesk', sans-serif",
        fontSize:      "0.68rem",
        fontWeight:     500,
        color:         "#3E4258",
        textAlign:     "center",
        letterSpacing: "0.02em",
        lineHeight:     1.3,
      }}>
        {name}
      </span>
    </motion.div>
  );
}

/* Invisible placeholder to maintain grid height alignment */
function GhostCard() {
  return (
    <div style={{
      minHeight:    85,
      borderRadius: 14,
      border:       "1px dashed rgba(18,20,43,0.04)",
      background:   "transparent",
      pointerEvents:"none",
      opacity:       0,
    }} />
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      data-portfolio-section="Skills"
      style={{
        position:      "relative",
        zIndex:         1,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        width:          "100%",
        padding:        "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 5%)",
        boxSizing:      "border-box",
      }}
    >
      {/* ── Heading ── */}
      <div style={{ width: "100%", maxWidth: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontSize:       12, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color:         "#0E7490", marginBottom: 12,
          }}>
            Skills
          </p>
          <h2 style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      "clamp(36px, 4.5vw, 58px)",
            fontWeight:     800,
            letterSpacing: "-0.03em",
            lineHeight:     1.05,
            marginBottom:   0,
            color:         "#12142B",
          }}>
            My Skills
          </h2>
        </motion.div>
      </div>

      {/* ── Globe ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="globe-sizer"
      >
        <Globe />
      </motion.div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:       12, fontWeight: 500,
          letterSpacing: "0.06em",
          color:         "rgba(14,116,144,0.85)",
          textAlign:     "center",
          marginBottom:   0,
        }}
      >
        Hover a skill to explore
      </motion.p>

      {/* ── Glassmorphism container wrapping all categories ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="skills-grid-container"
      >
        <div className="skills-categories-grid">
          {skillCategories.map((cat, ci) => {
            const ghosts = MAX_SKILLS - cat.skills.length;
            return (
              <div key={cat.label} className={`skill-category${ci < skillCategories.length - 1 ? " has-divider" : ""}`}>
                {/* Category label */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <div
                    className="category-dot"
                    style={{ backgroundColor: cat.accent, boxShadow: `0 0 8px ${cat.accent}80` }}
                  />
                  <span style={{
                    fontFamily:    "'Space Grotesk', sans-serif",
                    fontSize:      "0.7rem",
                    fontWeight:     700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color:          cat.accent,
                  }}>
                    {cat.label}
                  </span>
                </div>

                {/* 2-column card grid */}
                <div className="skill-cards-grid">
                  {cat.skills.map((skill, si) => (
                    <SkillCard
                      key={skill.name}
                      {...skill}
                      accent={cat.accent}
                      delay={ci * 0.06 + si * 0.04}
                      isJava={skill.name === "Java"}
                    />
                  ))}
                  {/* Ghost cards to equalise row count */}
                  {Array.from({ length: ghosts }).map((_, i) => (
                    <GhostCard key={`ghost-${i}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── All styles ── */}
      <style>{`
        .globe-sizer {
          width: 100%;
          max-width: 520px;
          display: flex;
          justify-content: center;
          margin: 48px 0 8px;
        }

        /* Elevated card wrapper */
        .skills-grid-container {
          background: linear-gradient(135deg, #FFFFFF 0%, rgba(14,116,144,0.035) 30%, rgba(124,58,237,0.035) 62%, rgba(219,39,119,0.03) 100%);
          border: 1px solid rgba(18,20,43,0.08);
          border-radius: 24px;
          padding: 36px 40px;
          box-shadow: 0 2px 6px rgba(18,20,43,0.04),
                      0 12px 32px rgba(18,20,43,0.07);
          margin-top: 48px;
          width: 100%;
          max-width: 1200px;
          box-sizing: border-box;
        }

        /* 4-column category row */
        .skills-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0 32px;
          align-items: start;
          width: 100%;
        }

        /* Vertical divider between categories */
        .skill-category {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .skill-category.has-divider {
          border-right: 1px solid rgba(18,20,43,0.07);
          padding-right: 32px;
        }

        /* 2-col card grid inside each category */
        .skill-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        /* Pulsing category dot */
        .category-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        /* ── Responsive ── */

        /* Laptop: keep 4 cols, tighten */
        @media (max-width: 1024px) {
          .skills-categories-grid { gap: 0 20px; }
          .skill-category.has-divider { padding-right: 20px; }
          .skills-grid-container { padding: 28px 28px; }
        }

        /* Tablet: 2 categories per row */
        @media (max-width: 768px) {
          .globe-sizer { max-width: 340px; }
          .skills-grid-container { padding: 24px 20px; }
          .skills-categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 24px;
          }
          .skill-category.has-divider {
            border-right: none;
            padding-right: 0;
          }
          /* re-apply divider only for col-1 items (odd) */
          .skill-category:nth-child(odd) {
            border-right: 1px solid rgba(18,20,43,0.07);
            padding-right: 24px;
          }
          .skill-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile: single column */
        @media (max-width: 480px) {
          .globe-sizer { max-width: 280px; }
          .skills-grid-container { padding: 20px 16px; }
          .skills-categories-grid { grid-template-columns: 1fr; gap: 24px 0; }
          .skill-category.has-divider,
          .skill-category:nth-child(odd) {
            border-right: none;
            padding-right: 0;
          }
          .skill-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
