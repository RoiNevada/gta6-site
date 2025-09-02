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
}) {
  useEffect(() => {
    const desc = clampDesc(description);

    // Title
    if (title) document.title = title;

    // Meta description
    upsertMetaByName("description", desc);

    // Open Graph
    upsertMetaByProperty("og:site_name", "GTA 6 Guides");
    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", desc);
    upsertMetaByProperty("og:url", url || window.location.href);
    upsertMetaByProperty("og:image", image);

    // Twitter
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", desc);
    upsertMetaByName("twitter:image", image);
  }, [title, description, url, image]);

  return null; // rien à rendre
}