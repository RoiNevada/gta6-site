// calcule ~1 min / 200 mots (sur le contenu Markdown)
export function readTime(md = "") {
  const text = md
    .replace(/```[\s\S]*?```/g, "")  // blocs code
    .replace(/[#>*_\-\[\]\(\)`~]/g, ""); // ponctuation markdown
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
}