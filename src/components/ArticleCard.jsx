// src/components/ArticleCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { readTime } from "../utils/readTime";
import { motion } from "framer-motion";

export default function ArticleCard({ a, i = 0 }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(i * 0.05, 0.4) }}
      whileHover={{ y: -3 }}
    >
      <Link to={`/article/${a.slug}`} className="card-link">
        <div className="card-cover">
          {/* Skeleton visible tant que l'image n'est pas chargée */}
          {!loaded && <div className="skeleton" style={{ width: "100%", height: "100%" }} />}

          {a.cover && (
            <img
              src={a.cover}
              alt={a.title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0, transition: "opacity .25s ease" }}
            />
          )}
        </div>

        <div className="card-body">
          <span className="chip">{a.category}</span>
          <h3>{a.title}</h3>
          {a.excerpt && <p>{a.excerpt}</p>}
          <p className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            {readTime(a.content)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}