import { useState } from "react";

export default function ShareBar({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  function copyLink() {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const text = encodeURIComponent(title || "GTA 6 – Guides & Actus");
  const u = encodeURIComponent(shareUrl);

  return (
    <div className="sharebar">
      <button className="share-btn" onClick={copyLink}>
        {copied ? "Lien copié ✓" : "Copier le lien"}
      </button>
      <a className="share-btn" href={`https://twitter.com/intent/tweet?url=${u}&text=${text}`} target="_blank" rel="noreferrer">Twitter/X</a>
      <a className="share-btn" href={`https://wa.me/?text=${text}%20${u}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="share-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noreferrer">Facebook</a>
    </div>
  );
}