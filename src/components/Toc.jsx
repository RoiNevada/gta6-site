// src/components/Toc.jsx
export default function Toc({ headings = [] }) {
  if (!headings || headings.length === 0) return null;
  return (
    <nav className="toc" aria-label="Sommaire de l’article">
      <div className="toc-title">Sommaire</div>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.id} className={`toc-item level-${h.level}`}>
            <a className="toc-link" href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

