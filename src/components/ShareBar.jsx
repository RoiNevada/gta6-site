import { useState } from "react";

export default function ShareBar({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  async function copyLink() {
    if (!navigator?.clipboard) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function share() {
    try {
      if (navigator?.share) {
        await navigator.share({ title: title || document.title, url: shareUrl });
        return; // succès natif
      }
    } catch {
      // ignore et fallback
    }
    // Fallback: copie du lien
    copyLink();
  }

  const text = encodeURIComponent(title || "GTA 6 – Guides & Actus");
  const u = encodeURIComponent(shareUrl);

  return (
    <div className="sharebar">
      <button className="share-btn" onClick={share}>
        {copied ? "Lien copié ✓" : (navigator?.share ? "Partager" : "Copier le lien")}
      </button>
      <a className="share-btn" href={`https://twitter.com/intent/tweet?url=${u}&text=${text}`} target="_blank" rel="noreferrer">Twitter/X</a>
      <a className="share-btn" href={`https://wa.me/?text=${text}%20${u}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="share-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noreferrer">Facebook</a>
    </div>
  );
}
