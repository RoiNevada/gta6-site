# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Audit SEO/Perf

Ce projet a été audité et optimisé pour l’indexation Google et les performances (LCP/CLS/TBT) avec une configuration simple (SPA Vite + React, déployée sur Vercel).

Actions principales:
- Indexation: `public/robots.txt` autorise le crawl et référence le sitemap du domaine public.
- Sitemap: `scripts/generate-sitemap.mjs` parcourt `src/data/articles.js` et génère `public/sitemap.xml` avec URLs absolues, `lastmod` ISO, sans slash final.
- RSS: `scripts/generate-rss.mjs` génère `public/rss.xml` pour les 20 derniers articles.
- Métadonnées dynamiques: `src/components/Seo.jsx` gère `<title>`, description (clamp 160), `<link rel="canonical">` absolu, Open Graph (og:*), Twitter (summary_large_image), et JSON‑LD Article si `type="article"`.
- 404: `src/pages/NotFound.jsx` inclut `noindex,follow` via `<Seo noindex />`.
- Perfs/UX: images lazy (`loading="lazy"`, `decoding="async"`) et tailles stables (aspect-ratio/width/height) pour éviter le CLS. Barre de progression avec z-index élevé.
- Vercel: `vercel.json` ajoute les bons `Content-Type` et règles de cache pour `sitemap.xml`, `rss.xml`, `robots.txt`.

Scripts NPM:
- `npm run sitemap` → génère `public/sitemap.xml` (SITE_URL fixé au domaine public)
- `npm run rss` → génère `public/rss.xml`
- `npm run build:seo` → exécute sitemap + rss
- `npm run build` → exécute `build:seo` puis `vite build`

Domaine public: `https://www.gta6-actus.com`.

Comment regénérer sitemap/RSS et déployer:
1. `npm run sitemap` et `npm run rss`
2. `npm run dev` pour vérifier en local
3. `npm run build` puis déployer sur Vercel

Notes:
- Les URL canoniques sont absolues, construites à partir du domaine public.
- Les images OG/Twitter sont résolues en absolu.
