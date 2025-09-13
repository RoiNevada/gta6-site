// src/App.jsx
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ArticlePage = lazy(() => import("./pages/ArticlePage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
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
      <ScrollProgress />
      <ScrollToTop />

      <Motion.nav
        className="topbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/" className="brand">
          <img src="/images/logo.png?v=2" alt="GTA 6" className="brand-logo" width="28" height="28" decoding="async" />
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
      </Motion.nav>

      {/* Menu mobile déroulant */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <CatLink cat="Actualités" onClick={() => setMenuOpen(false)}>Actualités</CatLink>
            <CatLink cat="Missions" onClick={() => setMenuOpen(false)}>Missions</CatLink>
            <CatLink cat="Gameplay" onClick={() => setMenuOpen(false)}>Gameplay</CatLink>
            <CatLink cat="Online" onClick={() => setMenuOpen(false)}>Online</CatLink>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Transitions entre pages */}
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname + location.search}>
            <Route path="/" element={<PageFade><HomePage /></PageFade>} />
            <Route path="/article/:slug" element={<PageFade><ArticlePage /></PageFade>} />
            <Route path="*" element={<PageFade><NotFound /></PageFade>} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <BackToTop />
      <footer className="footer">© {new Date().getFullYear()} GTA 6 Guides</footer>
    </div>
  );
}
