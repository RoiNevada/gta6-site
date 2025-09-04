// src/components/RecentItem.jsx
import { Link } from "react-router-dom";

export default function RecentItem({ a }) {
  return (
    <li className="recent-item">
      <Link to={`/article/${a.slug}`} className="recent-link" aria-label={a.title}>
        <div className="recent-thumb">
          {a.cover
            ? <img src={a.cover} alt="" loading="lazy" />
            : <div className="recent-fallback" aria-hidden="true" />}
        </div>
        <div className="recent-meta">
          <div className="recent-title">{a.title}</div>
          <div className="recent-cat">{a.category}</div>
        </div>
      </Link>
    </li>
  );
}