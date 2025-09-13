import { memo } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { prefetchArticlePage } from "../utils/prefetch";

function ArticleCard({ a }) {
  return (
    <Motion.article
      layout
      className="card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
    >
      <Link
        to={`/article/${a.slug}`}
        className="card-link"
        aria-label={a.title}
        onMouseEnter={prefetchArticlePage}
        onFocus={prefetchArticlePage}
      >
        {/* Image + date en overlay */}
        <div className="card-cover">
          {a.cover ? (
            <img src={a.cover} alt={a.title || ""} loading="lazy" decoding="async" fetchpriority="low" />
          ) : (
            <div aria-hidden="true" />
          )}
          <time
            className="cover-date"
            dateTime={a.date}
            aria-label={`Publié le ${formatDate(a.date)}`}
          >
            {formatDate(a.date)}
          </time>
        </div>

        {/* Corps */}
        <div className="card-body">
          <div className="chip">{a.category}</div>
          <h3>{a.title}</h3>
          <p>{a.excerpt}</p>
        </div>
      </Link>
    </Motion.article>
  );
}

export default memo(ArticleCard);
