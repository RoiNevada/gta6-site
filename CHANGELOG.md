⸻

📑 Patch Notes – GTA6 Blog

v1.0.0 — 2025-09-02

🚀 Première mise en ligne (Vercel)
	•	Déploiement via Vercel (build Vite → dist/).
	•	Ajout de vercel.json pour que React Router fonctionne sur toutes les routes (/article/:slug).
	•	Configuration de la variable d’environnement SITE_URL pour générer un sitemap correct.
	•	Vérifications OK : /, /article/:slug, /robots.txt, /sitemap.xml.

✅ Fonctionnalités principales
	•	Page d’accueil (Home)
	•	Liste des articles sous forme de cartes avec cover, titre, extrait.
	•	Filtres par catégorie (Actualités, Missions, Gameplay, Online).
	•	Barre de recherche en direct.
	•	Sidebar avec articles récents.
	•	Page article
	•	Contenu en Markdown sécurisé (Marked + DOMPurify).
	•	Meta info (catégorie, date formatée, temps de lecture).
	•	Image de couverture + mise en page optimisée.
	•	Navigation “Article précédent / suivant”.
	•	Articles recommandés (même catégorie).
	•	Barre de partage (copier le lien, Twitter/X, WhatsApp, Facebook).
	•	Barre de progression de lecture (scroll).
	•	UI / UX
	•	Topbar sticky avec navigation.
	•	Animations fluides (Framer Motion).
	•	Skeleton loader (shimmer) pendant le chargement des images.
	•	Transitions entre pages (fade/slide).
	•	Menu burger responsive sur mobile.
	•	Bouton Retour en haut flottant.

🛠️ Tech
	•	Stack : Vite + React 19 + React Router.
	•	Animations : Framer Motion.
	•	SEO : Seo.jsx pour gérer <title>, meta description, Open Graph, Twitter Cards.
	•	Sitemap automatique généré avec scripts/generate-sitemap.mjs.
	•	robots.txt qui référence le sitemap.
	•	Styles : CSS custom, thème dark natif.

⸻

v0.16.0 — 2025-09-02
	•	Ajout du script generate-sitemap.mjs (Node).
	•	Génération de public/sitemap.xml à partir des articles.
	•	Ajout de robots.txt.

v0.15.0 — 2025-09-02
	•	Création du composant Seo.jsx pour injecter dynamiquement les balises SEO par page.
	•	Gestion des titres, descriptions, Open Graph et Twitter Cards.

v0.14.0 — 2025-09-02
	•	Ajout d’un menu burger mobile responsive.
	•	Navigation plus fluide sur petits écrans.

v0.13.0 — 2025-09-02
	•	Ajout de la barre de partage sociale sous les articles.

v0.12.0 — 2025-09-02
	•	Ajout des articles recommandés (basés sur la même catégorie).

v0.11.0 — 2025-09-02
	•	Ajout de la navigation précédent/suivant entre articles.

v0.10.0 — 2025-09-02
	•	Ajout de la barre de lecture (progress bar) en haut des articles.

v0.9.0 — 2025-09-02
	•	Ajout des transitions de pages (fade/slide).

v0.8.0 — 2025-09-02
	•	Ajout des skeleton loaders pour les images.

v0.7.0 — 2025-09-02
	•	Animation des cartes d’articles (hover + apparition).

v0.6.0 — 2025-09-02
	•	Mise en place du dossier public/images/ avec toutes les covers d’articles.

v0.5.0 — 2025-09-02
	•	Ajout des utils : renderMD, formatDate, readTime.

v0.4.0 — 2025-09-02
	•	Base de la page Article (titre, meta, cover, contenu).

v0.3.0 — 2025-09-02
	•	Base du thème dark : topbar sticky, sidebar, grilles responsives.

v0.2.0 — 2025-09-02
	•	Base de la page Home (articles, filtres, recherche, récents).

v0.1.0 — 2025-09-02
	•	Scaffold initial du projet (Vite + React + Router).
	•	Création des pages Home, Article et NotFound.

⸻