import { useEffect } from "react";

function clampDesc(str = "", max = 160) {
  const s = (str || "").replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

// util: crée/maj une meta par "name"
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

// util: crée/maj une meta par "property" (Open Graph)
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

export default function Seo({
  title = "GTA 6 – Guides & Actus",
  description = "Cartes, missions, personnages, astuces et actualités de GTA 6.",
  url,
  image = "/images/vicecity.jpg",
  type = "website",
  locale = "fr_FR",
  twitterSite,
  twitterCreator,
  noindex = false,
  canonical,
  datePublished,
  dateModified,
}) {
  useEffect(() => {
    const desc = clampDesc(description);
    const runtimeOrigin = typeof window !== "undefined" ? window.location.origin : "";
    const resolvedCanonical = (canonical || url) || (typeof window !== "undefined" ? window.location.href : undefined);
    const resolvedImage = image?.startsWith("http") ? image : (runtimeOrigin && image ? runtimeOrigin + image : image);

    // Title
    if (title) document.title = title;

    // Meta description
    upsertMetaByName("description", desc);
    upsertMetaByName("robots", noindex ? "noindex,follow" : "index,follow");

    // Open Graph
    upsertMetaByProperty("og:site_name", "GTA 6 Guides");
    upsertMetaByProperty("og:type", type || "website");
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", desc);
    upsertMetaByProperty("og:url", resolvedCanonical || "");
    upsertMetaByProperty("og:image", resolvedImage || "");
    upsertMetaByProperty("og:locale", locale);

    // Twitter
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", desc);
    upsertMetaByName("twitter:image", resolvedImage || "");
    if (twitterSite) upsertMetaByName("twitter:site", twitterSite);
    if (twitterCreator) upsertMetaByName("twitter:creator", twitterCreator);

    // Canonical link
    if (resolvedCanonical) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", resolvedCanonical);
    }

    // JSON-LD for Article (optional)
    if (type === "article") {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: desc,
        image: resolvedImage ? [resolvedImage] : undefined,
        datePublished: datePublished || dateModified || undefined,
        dateModified: dateModified || datePublished || undefined,
        author: { "@type": "Organization", name: "GTA 6 Guides" },
        mainEntityOfPage: resolvedCanonical
          ? { "@type": "WebPage", "@id": resolvedCanonical }
          : undefined,
      };
      let script = document.head.querySelector('script[type="application/ld+json"][data-seo-jsonld="article"]');
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "article");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else {
      // cleanup any prior article json-ld if navigating
      const prev = document.head.querySelector('script[type="application/ld+json"][data-seo-jsonld="article"]');
      if (prev) prev.remove();
    }
  }, [title, description, url, image, type, locale, twitterSite, twitterCreator, noindex, canonical, datePublished, dateModified]);

  return null; // rien à rendre
}
