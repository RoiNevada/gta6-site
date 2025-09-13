// src/pages/HomePage.jsx
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import LazyArticleCard from "../components/LazyArticleCard";
import RecentItem from "../components/RecentItem";
import { articles } from "../data/articles";
import Seo from "../components/Seo";
import Countdown from "../components/Countdown";

export default function HomePage() {
  const [q, setQ] = useState("");
  const [inputQ, setInputQ] = useState("");
  const [cat, setCat] = useState("Tous");
  const [params, setSearchParams] = useSearchParams();

  // Lis ?cat= depuis l'URL (ex: /?cat=Gameplay)
  useEffect(() => {
    const fromUrl = params.get("cat");
    setCat(fromUrl || "Tous");
  }, [params]);

  // Debounce recherche pour limiter les re-renders
  useEffect(() => {
    const id = setTimeout(() => setQ(inputQ), 150);
    return () => clearTimeout(id);
  }, [inputQ]);

  // Écrit ?cat= dans l'URL quand on clique une puce
  function selectCat(c) {
    setCat(c);
    if (c === "Tous") {
      const next = new URLSearchParams(params);
      next.delete("cat");
      setSearchParams(next, { replace: true });
    } else {
      setSearchParams({ cat: c }, { replace: true });
    }
  }

  const categories = useMemo(
    () => ["Tous", ...new Set(articles.map((a) => a.category))],
    []
  );

  const filtered = articles.filter((a) => {
    const catOk = cat === "Tous" || a.category === cat;
    const qOk = (a.title + " " + a.excerpt).toLowerCase().includes(q.toLowerCase());
    return catOk && qOk;
  });

  const recents = useMemo(
    () =>
      [...articles]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    []
  );

  return (
    <>
      <Seo
        title="GTA 6 – Guides & Actus"
        description="Cartes, missions, personnages, astuces. Tout au même endroit."
        url={
          typeof window !== "undefined"
            ? window.location.origin + "/"
            : "https://example.com/"
        }
        canonical={
          typeof window !== "undefined"
            ? window.location.origin + "/"
            : "https://example.com/"
        }
        image="/images/vicecity.jpg"
      />

      <div className="container two-cols">
        {/* Colonne principale */}
        <div>
          <Motion.header
            className="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1>GTA 6 – Guides & Actus</h1>
            <p>Cartes, missions, personnages, astuces. Tout au même endroit.</p>
          </Motion.header>

          <Motion.div
            className="toolbar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="chips">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => selectCat(c)}
                  className={`chip-btn ${c === cat ? "active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <input
              value={inputQ}
              onChange={(e) => setInputQ(e.target.value)}
              placeholder="Rechercher…"
              className="search"
              aria-label="Rechercher"
            />
          </Motion.div>

          <div className="grid">
            {filtered.map((a, i) => (
              <LazyArticleCard key={a.id} a={a} i={i} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Compte à rebours */}
          <div className="panel">
            <h3>Compte à rebours</h3>
            <Countdown
              // Mets la date officielle ici
              target="2026-05-26T00:00:00-04:00"
              title="Sortie officielle GTA 6"
            />
          </div>

          {/* Articles récents (miniatures avec zoom) */}
          <div className="panel">
            <h3>Articles récents</h3>
            <ul className="recent">
              {recents.map((a) => (
                <RecentItem key={a.id} a={a} />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
