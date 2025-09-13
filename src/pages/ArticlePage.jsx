// src/pages/ArticlePage.jsx
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import { renderMD } from "../utils/md";
import { formatDate } from "../utils/formatDate";
import { readTime } from "../utils/readTime";
import LazyArticleCard from "../components/LazyArticleCard";
import LazyImage from "../components/LazyImage";
import Seo from "../components/Seo";
import ShareBar from "../components/ShareBar";
import { prefetchArticlePage, prefetchHomePage } from "../utils/prefetch";

export default function ArticlePage() {
  const { slug } = useParams();

  // Tri par date (plus récent -> plus ancien)
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Trouve l’article courant
  const index = sorted.findIndex((x) => x.slug === slug);
  const a = index >= 0 ? sorted[index] : null;

  if (!a) {
    return (
      <div className="container" style={{ padding: "48px 16px" }}>
        <h1 style={{ margin: 0 }}>Article introuvable</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Ce contenu n’existe pas ou a été déplacé.
        </p>
        <Link to="/" className="link">← Retour</Link>
      </div>
    );
  }

  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  // Recommandés (même catégorie, hors article courant)
  const recommended = articles
    .filter((x) => x.category === a.category && x.slug !== a.slug)
    .slice(0, 3);

  const canonicalUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/article/" + a.slug
      : "https://example.com/article/" + a.slug;

  return (
    <>
      <Seo
        title={`${a.title} – GTA 6 Guides`}
        description={a.excerpt || "Article GTA 6"}
        url={canonicalUrl}
        canonical={canonicalUrl}
        image={a.cover || "/images/vicecity.jpg"}
        type="article"
        datePublished={a.date}
        dateModified={a.date}
      />
      
      <div className="container article">
        <Link to="/" className="link" onMouseEnter={prefetchHomePage} onFocus={prefetchHomePage}>← Accueil</Link>
        <h1>{a.title}</h1>
        <p className="muted">
          {a.category} • {formatDate(a.date)} • {readTime(a.content)}
        </p>

        {/* Barre de partage */}
        <ShareBar title={a.title} url={canonicalUrl} />

        {/* Sommaire retiré temporairement */}

        {a.cover && (
          <LazyImage
            className="cover"
            src={a.cover}
            alt={a.title}
            width={1200}
            height={675}
            fetchpriority="low"
          />
        )}

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: renderMD(a.content) }}
        />

        {/* Articles recommandés */}
        {recommended.length > 0 && (
          <div className="recommended">
            <h3>Articles similaires</h3>
            <div className="grid">
              {recommended.map((r, i) => (
                <LazyArticleCard key={r.id} a={r} i={i} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation bas d’article */}
        <div className="article-nav">
          {prev ? (
            <Link to={`/article/${prev.slug}`} className="nav-btn prev" onMouseEnter={prefetchArticlePage} onFocus={prefetchArticlePage}>
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}

          <Link to="/" className="nav-btn" onMouseEnter={prefetchHomePage} onFocus={prefetchHomePage}>← Tous les articles</Link>

          {next ? (
            <Link to={`/article/${next.slug}`} className="nav-btn next" onMouseEnter={prefetchArticlePage} onFocus={prefetchArticlePage}>
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </>
  );
}
