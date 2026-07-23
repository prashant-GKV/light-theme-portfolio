// Reads the CURRENT rendered portfolio content straight from the DOM.
// No hardcoded data — this is the assistant's only source of truth.

export function getPortfolioContext(): string {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-portfolio-section]")
  );

  const roots =
    sections.length > 0
      ? sections
      : [document.querySelector("main") ?? document.body];

  const parts = roots
    .map((el) => {
      if (!el) return "";
      const label = el.getAttribute?.("data-portfolio-section") ?? el.id ?? el.tagName;
      const text = (el.innerText || "").replace(/\n{3,}/g, "\n\n").trim();
      return text ? `## ${label}\n${text}` : "";
    })
    .filter(Boolean);

  return parts.join("\n\n").slice(0, 20000);
}
