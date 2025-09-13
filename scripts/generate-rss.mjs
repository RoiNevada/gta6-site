// scripts/generate-rss.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const SITE_URL = process.env.SITE_URL || "http://localhost:5173";

// Load articles
const articlesModule = await import(path.join(root, "src", "data", "articles.js"));
const articles = (articlesModule.articles || [])
  .slice()
  .sort((a,b) => new Date(b.date) - new Date(a.date))
  .slice(0, 20);

const escape = (s = "") => s
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const items = articles.map(a => `
  <item>
    <title>${escape(a.title)}</title>
    <link>${SITE_URL}/article/${a.slug}</link>
    <guid>${SITE_URL}/article/${a.slug}</guid>
    <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    ${a.excerpt ? `<description>${escape(a.excerpt)}</description>` : ""}
  </item>
`).join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>GTA 6 Guides</title>
    <link>${SITE_URL}/</link>
    <description>Guides et actualités GTA 6</description>
    <language>fr</language>
${items}
  </channel>
</rss>
`;

const outPath = path.join(root, "public", "rss.xml");
fs.writeFileSync(outPath, rss, "utf8");
console.log(`✅ RSS généré : ${outPath}`);
console.log(`   Items : ${articles.length}`);
console.log(`   Domaine : ${SITE_URL}`);
