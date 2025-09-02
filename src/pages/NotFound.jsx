import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Oups… cette page n’existe pas.</p>
      <Link to="/" className="btn">← Retour à l’accueil</Link>
    </div>
  );
}