// scripts/generate-sitemap.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// 1) Domaine (env var) — en local tu peux laisser vide, Vercel mettra la bonne valeur
const SITE_URL = process.env.SITE_URL || "http://localhost:5173";

// 2) Charge la liste des articles
const articlesModule = await import(path.join(root, "src", "data", "articles.js"));
const articles = articlesModule.articles || [];

// 3) Construit la liste d'URL
const isoNow = new Date().toISOString();
const urls = [
  { loc: `${SITE_URL}/`, lastmod: isoNow, changefreq: "daily", priority: "1.0" },
  ...articles.map(a => {
    const d = a.date ? new Date(a.date) : new Date();
    const lastmod = isNaN(d.getTime()) ? isoNow : d.toISOString();
    return {
      loc: `${SITE_URL}/article/${a.slug}`,
      lastmod,
      changefreq: "weekly",
      priority: "0.8"
    };
  })
];

// 4) XML
const xmlItems = urls.map(u => [
  "  <url>",
  `    <loc>${u.loc}</loc>`,
  u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
  u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>` : null,
  u.priority ? `    <priority>${u.priority}</priority>` : null,
  "  </url>"
].filter(Boolean).join("\n")).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${xmlItems}
</urlset>
`;

// 5) Écrit dans public/
const outPath = path.join(root, "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");
console.log(`✅ Sitemap généré : ${outPath}`);
console.log(`   URLs incluses : ${urls.length}`);
console.log(`   Domaine : ${SITE_URL}`);

// 6) Met à jour robots.txt avec le bon Sitemap
try {
  const robotsPath = path.join(root, "public", "robots.txt");
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robots, "utf8");
  console.log(`✅ robots.txt mis à jour : ${robotsPath}`);
} catch (e) {
  console.warn("⚠️ Impossible de mettre à jour robots.txt:", e.message);
}
