import { useEffect, useRef } from "react";

/* Colorful light-theme backdrop:
   1. Animated pastel gradient mesh (violet / cyan / pink / amber / emerald)
   2. Floating 3D props — glass cubes, glossy orbs, a spinning ring — built
      with pure CSS 3D transforms (no WebGL payload)
   3. Film grain so the canvas never reads as flat white
   Layers parallax gently with the pointer; everything honours
   prefers-reduced-motion and degrades on touch / small screens. */

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.5'/></svg>`
  );

/* Glossy fake-3D sphere */
function Orb({ size, top, left, right, bottom, hue, depth, float, blur }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string;
  hue: [string, string, string]; depth: number; float: string; blur?: number;
}) {
  return (
    <div
      data-depth={depth}
      style={{
        position: "absolute", top, left, right, bottom,
        width: size, height: size,
        animation: float,
        filter: blur ? `blur(${blur}px)` : undefined,
        willChange: "transform",
      }}
    >
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: `radial-gradient(circle at 31% 28%, ${hue[0]} 0%, ${hue[1]} 42%, ${hue[2]} 100%)`,
        boxShadow: `inset -14px -18px 34px rgba(18,20,43,0.10),
                    inset 10px 12px 26px rgba(255,255,255,0.85),
                    0 22px 44px rgba(18,20,43,0.10)`,
      }} />
      {/* specular dot */}
      <div style={{
        position: "absolute", top: "16%", left: "20%",
        width: size * 0.18, height: size * 0.13,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.85)",
        filter: "blur(3px)",
        transform: "rotate(-25deg)",
      }} />
    </div>
  );
}

/* Translucent glass cube (preserve-3d) */
function Cube({ size, top, left, right, bottom, tint, dur, depth, delay = 0 }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string;
  tint: string; dur: number; depth: number; delay?: number;
}) {
  const half = size / 2;
  const faces: { t: string }[] = [
    { t: `rotateY(0deg) translateZ(${half}px)` },
    { t: `rotateY(90deg) translateZ(${half}px)` },
    { t: `rotateY(180deg) translateZ(${half}px)` },
    { t: `rotateY(-90deg) translateZ(${half}px)` },
    { t: `rotateX(90deg) translateZ(${half}px)` },
    { t: `rotateX(-90deg) translateZ(${half}px)` },
  ];
  return (
    <div
      data-depth={depth}
      className="bg3d-cube-slot"
      style={{
        position: "absolute", top, left, right, bottom,
        width: size, height: size,
        perspective: 700,
        willChange: "transform",
      }}
    >
      <div style={{
        width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        animation: `bg3d-spin ${dur}s linear infinite`,
        animationDelay: `${delay}s`,
      }}>
        {faces.map((f, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            transform: f.t,
            background: `linear-gradient(135deg, ${tint}26, ${tint}0D)`,
            border: `1px solid ${tint}55`,
            borderRadius: 6,
            boxShadow: `inset 0 0 22px ${tint}1A`,
            backdropFilter: "blur(1px)",
          }} />
        ))}
      </div>
    </div>
  );
}

export function AuroraBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* Pointer parallax — fine pointers only, skipped for reduced motion */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    let raf = 0;
    let tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      layers.forEach((el) => {
        const d = Number(el.dataset.depth) || 0;
        el.style.translate = `${(-tx * d * 34).toFixed(1)}px ${(-ty * d * 26).toFixed(1)}px`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Gradient mesh — visible pastels, animated drift ── */}
      <div data-depth={0.4} style={{
        position: "absolute", top: "-28%", left: "-16%",
        width: "70%", height: "70%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(147,102,255,0.20) 0%, rgba(147,102,255,0.07) 45%, transparent 68%)",
        animation: "aurora1 22s ease-in-out infinite",
      }} />
      <div data-depth={0.55} style={{
        position: "absolute", top: "6%", right: "-18%",
        width: "60%", height: "62%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,199,235,0.18) 0%, rgba(45,199,235,0.06) 48%, transparent 70%)",
        animation: "aurora2 26s ease-in-out infinite",
      }} />
      <div data-depth={0.35} style={{
        position: "absolute", bottom: "-24%", left: "12%",
        width: "58%", height: "60%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,116,188,0.16) 0%, rgba(255,116,188,0.05) 46%, transparent 68%)",
        animation: "aurora3 30s ease-in-out infinite",
      }} />
      <div data-depth={0.5} style={{
        position: "absolute", top: "-12%", right: "22%",
        width: "38%", height: "40%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,190,92,0.15) 0%, transparent 66%)",
        animation: "aurora2 34s ease-in-out infinite reverse",
      }} />
      <div data-depth={0.3} style={{
        position: "absolute", bottom: "-10%", right: "-8%",
        width: "44%", height: "46%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(64,214,164,0.14) 0%, transparent 66%)",
        animation: "aurora1 38s ease-in-out infinite reverse",
      }} />
      {/* colour wash tying the mesh together */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(147,102,255,0.05) 0%, transparent 34%, rgba(45,199,235,0.05) 62%, rgba(255,116,188,0.05) 100%)",
      }} />

      {/* ── Floating 3D props ── */}
      <Orb size={150} top="14%" left="6%"  depth={1.15} float="bg3d-float 9s ease-in-out infinite"
           hue={["#F3EBFF", "#C9A8FF", "#8B5CF6"]} />
      <Orb size={72}  top="58%" right="9%" depth={1.5}  float="bg3d-float 7s ease-in-out 1.2s infinite"
           hue={["#E4FAFF", "#8FE3F7", "#22B8D4"]} />
      <Orb size={46}  bottom="16%" left="30%" depth={1.9} float="bg3d-float 6s ease-in-out 0.6s infinite" blur={1}
           hue={["#FFEDF6", "#FFA8D2", "#EC4899"]} />
      <Orb size={30}  top="24%" right="30%" depth={2.2} float="bg3d-float 5s ease-in-out 2s infinite" blur={2}
           hue={["#FFF6E4", "#FFD48A", "#F59E0B"]} />

      <Cube size={84} bottom="5%" left="2.5%" tint="#8B5CF6" dur={26} depth={1.3} />
      <Cube size={56} top="10%" right="14%" tint="#0E7490" dur={20} depth={1.7} delay={-6} />

      {/* spinning 3D ring — conic band, hollow centre via mask */}
      <div data-depth={1.0} className="bg3d-ring-slot" style={{
        position: "absolute", bottom: "2%", right: "5%",
        width: 160, height: 160, perspective: 800, willChange: "transform",
      }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "conic-gradient(from 30deg, #8B5CF6, #22B8D4, #EC4899, #F59E0B, #8B5CF6)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 15px), #000 calc(100% - 14px))",
          animation: "bg3d-ring 16s linear infinite",
          opacity: 0.55,
        }} />
      </div>

      {/* Film grain */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${GRAIN}")`,
        backgroundRepeat: "repeat",
        opacity: 0.028,
        mixBlendMode: "multiply",
      }} />

      <style>{`
        @keyframes bg3d-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-22px) rotate(3deg); }
        }
        @keyframes bg3d-spin {
          0%   { transform: rotateX(-18deg) rotateY(0deg); }
          100% { transform: rotateX(-18deg) rotateY(360deg); }
        }
        @keyframes bg3d-ring {
          0%   { transform: rotateX(62deg) rotateZ(0deg); }
          100% { transform: rotateX(62deg) rotateZ(360deg); }
        }
        /* touch / small screens: drop the heavier props, keep the colour */
        @media (max-width: 768px) {
          .bg3d-cube-slot, .bg3d-ring-slot { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg3d-cube-slot > div, .bg3d-ring-slot > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
