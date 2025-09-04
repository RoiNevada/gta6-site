import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="404 – Page introuvable" description="Cette page n’existe pas." noindex />
      <div className="notfound">
        <h1>404</h1>
        <p>Oups… cette page n’existe pas.</p>
        <Link to="/" className="btn">← Retour à l’accueil</Link>
      </div>
    </>
  );
}
