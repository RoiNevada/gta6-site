// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PageFade from "./components/PageFade";
import BackToTop from "./components/BackToTop";

// Lien de catégorie avec état "actif" basé sur ?cat=...
function CatLink({ cat, children, onClick }) {
  const location = useLocation();
  const isActive = new URLSearchParams(location.search).get("cat") === cat;
  return (
    <NavLink
      to={`/?cat=${encodeURIComponent(cat)}`}
      className={`navlink${isActive ? " navlink-active" : ""}`}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le menu dès qu'on change de page / query
  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.search]);

  return (
    <div className="site">
      <ScrollToTop />

      <nav className="topbar">
        <Link to="/" className="brand">
          <img src="/images/logo.png" alt="GTA 6" className="brand-logo" />
          <span className="brand-text">GTA 6 Blog</span>
        </Link>

        <div className="spacer" />

        {/* Liens desktop */}
        <div className="toplinks">
          <CatLink cat="Actualités">Actualités</CatLink>
          <CatLink cat="Missions">Missions</CatLink>
          <CatLink cat="Gameplay">Gameplay</CatLink>
          <CatLink cat="Online">Online</CatLink>
        </div>

        {/* Bouton burger (mobile) */}
        <button
          className="menu-btn"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="mobile-menu">
          <CatLink cat="Actualités" onClick={() => setMenuOpen(false)}>Actualités</CatLink>
          <CatLink cat="Missions" onClick={() => setMenuOpen(false)}>Missions</CatLink>
          <CatLink cat="Gameplay" onClick={() => setMenuOpen(false)}>Gameplay</CatLink>
          <CatLink cat="Online" onClick={() => setMenuOpen(false)}>Online</CatLink>
        </div>
      )}

      {/* Transitions entre pages */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname + location.search}>
          <Route path="/" element={<PageFade><HomePage /></PageFade>} />
          <Route path="/article/:slug" element={<PageFade><ArticlePage /></PageFade>} />
          <Route path="*" element={<PageFade><NotFound /></PageFade>} />
        </Routes>
      </AnimatePresence>

      <BackToTop />
      <footer className="footer">© {new Date().getFullYear()} GTA 6 Guides</footer>
    </div>
  );
}