import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "../data/projects";

/* Per-card accent pairs pulled from the site palette — cycled by position
   so the grid reads as one coordinated, colour-coded family. */
const CARD_ACCENTS: [string, string][] = [
  ["#6D28D9", "#8B5CF6"], // violet
  ["#0E7490", "#22B8D4"], // teal
  ["#DB2777", "#F472B6"], // pink
  ["#B45309", "#F59E0B"], // amber
  ["#047857", "#34D399"], // emerald
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [a1, a2] = CARD_ACCENTS[index % CARD_ACCENTS.length];

  const hasLinks = Boolean(project.githubUrl || project.liveUrl);

  return (
    <motion.div
      className="project-card-wrap"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="project-card"
        style={{
          /* Accent pair feeds every colour on the card via CSS vars —
             swap CARD_ACCENTS entries to re-theme. */
          ["--a1" as string]: a1,
          ["--a2" as string]: a2,
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Accent top bar */}
        <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${a1}, ${a2})` }} />
        {/* Screenshot */}
        <div
          style={{
            position: "relative",
            aspectRatio: project.imageAspect ?? "16 / 10",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${a1}14, ${a2}0D)`,
            borderBottom: "1px solid rgba(18,20,43,0.06)",
          }}
        >
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className={project.imageFit === "contain" ? "project-shot project-shot-contain" : "project-shot"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: project.imageFit ?? "cover",
              objectPosition: project.imageFit === "contain" ? "center" : "top",
              display: "block",
              transition: "transform 0.5s ease",
            }}
          />
          {/* Bottom fade — skipped for contain-fit media so nothing covers the frame */}
          {project.imageFit !== "contain" && (
            <div
              style={{
                position: "absolute",
                insetInline: 0,
                bottom: 0,
                height: 90,
                background: "linear-gradient(to top, rgba(255,255,255,0.55), transparent)",
                pointerEvents: "none",
              }}
            />
          )}
          {/* Accent colour veil — fades in on hover */}
          <div className="project-shot-veil" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        </div>

        {/* Content */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#12142B",
              letterSpacing: "-0.01em",
              marginBottom: 8,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              color: "#3E4258",
              lineHeight: 1.65,
              marginBottom: 16,
            }}
          >
            {project.description}
          </p>

          {/* Tech chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11,
                  padding: "4px 11px",
                  borderRadius: 100,
                  background: `${a1}0D`,
                  color: "#3E4258",
                  border: `1px solid ${a1}1F`,
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links — only render when provided */}
          {hasLinks && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 16,
                paddingTop: 14,
                borderTop: "1px solid rgba(18,20,43,0.07)",
              }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-live-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: 10,
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink size={15} /> Live Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-code-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: 10,
                    color: "#12142B",
                    textDecoration: "none",
                  }}
                >
                  <Github size={15} /> Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 48 }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#0E7490",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          my work
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(36px, 4.5vw, 58px)",
            fontWeight: 800,
            color: "#12142B",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: 12,
          }}
        >
          Things I've built
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: "#3E4258",
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          A few projects I've worked on, from AI tools to full-stack applications.
        </p>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* Scoped card styles — all colour flows from each card's --a1/--a2 accent pair */}
      <style>{`
        .project-card {
          background: linear-gradient(150deg, #FFFFFF 55%, color-mix(in srgb, var(--a1) 5%, transparent) 100%);
          border: 1px solid color-mix(in srgb, var(--a1) 14%, transparent);
          box-shadow: 0 1px 2px rgba(18,20,43,0.04), 0 4px 12px rgba(18,20,43,0.05),
                      inset 0 1px 0 rgba(255,255,255,0.9);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--a1) 38%, transparent);
          box-shadow: 0 4px 12px rgba(18,20,43,0.05),
                      0 24px 56px color-mix(in srgb, var(--a1) 18%, transparent),
                      inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .project-card:hover .project-shot { transform: scale(1.05); }
        /* contain-fit media (GIFs) must stay fully visible — no zoom crop on hover */
        .project-card:hover .project-shot-contain { transform: none; }
        .project-shot-veil {
          background: linear-gradient(160deg, color-mix(in srgb, var(--a1) 13%, transparent) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-card:hover .project-shot-veil { opacity: 1; }
        .project-live-btn {
          background: linear-gradient(135deg, var(--a1), var(--a2));
          box-shadow: 0 3px 12px color-mix(in srgb, var(--a1) 24%, transparent);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .project-live-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px color-mix(in srgb, var(--a1) 32%, transparent);
        }
        .project-code-btn {
          border: 1px solid color-mix(in srgb, var(--a1) 24%, transparent);
          background: #FFFFFF;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .project-code-btn:hover {
          border-color: color-mix(in srgb, var(--a1) 50%, transparent);
          background: color-mix(in srgb, var(--a1) 5%, #FFFFFF);
          color: var(--a1);
        }
        .project-live-btn:focus-visible, .project-code-btn:focus-visible {
          outline: 2px solid var(--a1);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .project-card, .project-shot, .project-live-btn { transition: none; }
          .project-card:hover { transform: none; }
          .project-card:hover .project-shot { transform: none; }
        }
        /* Bento rhythm: feature the lead project on wide screens */
        @media (min-width: 940px) {
          .project-card-wrap:first-child { grid-column: span 2; }
        }
      `}</style>
    </section>
  );
}
