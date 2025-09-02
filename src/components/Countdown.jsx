import { useEffect, useMemo, useState } from "react";

function diffParts(targetDate) {
  const now = new Date();
  const ms = Math.max(0, targetDate - now);

  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function Countdown({
  target = "2026-05-26T00:00:00-04:00",
  title = "Sortie officielle GTA 6",
}) {
  const targetDate = useMemo(() => new Date(target), [target]);
  const [t, setT] = useState(() => diffParts(targetDate));

  useEffect(() => {
    const id = setInterval(() => setT(diffParts(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const nice = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(targetDate);

  return (
    <section className="panel countdown" aria-live="polite">
      <h3 className="cd-title">{title}</h3>
      <p className="release-date">{nice}</p>

      <div className="countdown-grid" role="group" aria-label="compte à rebours">
        <div className="countdown-box" aria-label={`${t.days} jours`}>
          <span className="cd-big">{t.days}</span>
          <small className="cd-label">jours</small>
        </div>
        <div className="countdown-box" aria-label={`${t.hours} heures`}>
          <span className="cd-big">{t.hours}</span>
          <small className="cd-label">heures</small>
        </div>
        <div className="countdown-box" aria-label={`${t.minutes} minutes`}>
          <span className="cd-big">{t.minutes}</span>
          <small className="cd-label">minutes</small>
        </div>
        <div className="countdown-box" aria-label={`${t.seconds} secondes`}>
          <span className="cd-big">{t.seconds}</span>
          <small className="cd-label">secondes</small>
        </div>
      </div>
    </section>
  );
}