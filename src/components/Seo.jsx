/*
  Modifs SEO pour domaine personnalisé (gta6-actus.com)
  - Canonique dynamique par page : si `canonical` est fourni (ex. "/article/slug"),
    on le résout en URL absolue avec ton domaine. Sinon on utilise l'URL courante,
    normalisée sur https://www.gta6-actus.com.
  - og:url aligné sur la canonique finale.
  - Image OG/Twitter résolue en absolu.
  - On retire twitter:url (pas standard), on garde twitter:card/title/description/image.
*/
import { useEffect } from "react";

const SITE_ORIGIN = "https://www.gta6-actus.com";

function clampDesc(str = "", max = 160) {
  const s = (str || "").replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

// Crée/maj <meta name="...">
function upsertMetaByName(name, content) {
  if (!name) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content ?? "");
}

// Crée/maj <meta property="..."> (Open Graph)
function upsertMetaByProperty(prop, content) {
  if (!prop) return;
  let el = document.head.querySelector(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", prop);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content ?? "");
}

// Normalise une URL absolue sur le domaine custom
function normalizeAbsoluteUrl(input) {
  if (!input) return SITE_ORIGIN + "/";
  try {
    const u = new URL(input, SITE_ORIGIN);
    return SITE_ORIGIN + u.pathname + (u.search || "") + (u.hash || "");
  } catch {
    return SITE_ORIGIN + (String(input).startsWith("/") ? input : `/${input}`);
  }
}

// Résout l'image en absolu sur le domaine custom
function resolveImage(src) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return SITE_ORIGIN + (src.startsWith("/") ? src : `/${src}`);
}

export default function Seo({
  title = "GTA 6 – Guides & Actus",
  description = "Cartes, missions, personnages, astuces et actualités de GTA 6.",
  url,                          // optionnel : si fourni, sera normalisé
  image = "/images/vicecity.jpg",
  type = "website",            // "website" ou "article"
  locale = "fr_FR",
  twitterSite,                 // ex: "@toncompte"
  twitterCreator,              // ex: "@auteur"
  noindex = false,
  canonical,                   // ex: "/article/mon-slug"
  datePublished,
  dateModified,
}) {
  useEffect(() => {
    const desc = clampDesc(description);

    // Canonique : priorité à `canonical`, sinon `url`, sinon URL courante
    let finalCanonical = canonical
      ? normalizeAbsoluteUrl(canonical)
      : url
      ? normalizeAbsoluteUrl(url)
      : (typeof window !== "undefined"
          ? normalizeAbsoluteUrl(window.location.href)
          : SITE_ORIGIN + "/");

    const resolvedImage = resolveImage(image);

    // Title
    if (title) document.title = title;

    // Meta de base
    upsertMetaByName("description", desc);
    upsertMetaByName("robots", noindex ? "noindex,follow" : "index,follow");

    // Open Graph
    upsertMetaByProperty("og:site_name", "GTA 6 Guides");
    upsertMetaByProperty("og:type", type || "website");
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", desc);
    upsertMetaByProperty("og:url", finalCanonical);
    upsertMetaByProperty("og:image", resolvedImage);
    upsertMetaByProperty("og:locale", locale);

    // Twitter
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", desc);
    upsertMetaByName("twitter:image", resolvedImage);
    if (twitterSite) upsertMetaByName("twitter:site", twitterSite);
    if (twitterCreator) upsertMetaByName("twitter:creator", twitterCreator);

    // Canonical link
    {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", finalCanonical);
    }

    // JSON-LD Article (si type === "article")
    if (type === "article") {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: desc,
        image: resolvedImage ? [resolvedImage] : undefined,
        datePublished: datePublished || undefined,
        dateModified: dateModified || datePublished || undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": finalCanonical },
        author: { "@type": "Organization", name: "GTA 6 Guides" },
        publisher: {
          "@type": "Organization",
          name: "GTA 6 Guides",
          logo: { "@type": "ImageObject", url: resolveImage("/images/logo.png") }
        }
      };
      let script = document.head.querySelector(
        'script[type="application/ld+json"][data-seo-jsonld="article"]'
      );
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "article");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else {
      const prev = document.head.querySelector(
        'script[type="application/ld+json"][data-seo-jsonld="article"]'
      );
      if (prev) prev.remove();
    }
  }, [
    title,
    description,
    url,
    image,
    type,
    locale,
    twitterSite,
    twitterCreator,
    noindex,
    canonical,
    datePublished,
    dateModified
  ]);

  return null;
}