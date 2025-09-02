import { useEffect, useState } from "react";

export default function Countdown({ target, title }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const end = new Date(target).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <h3>{title}</h3>
      <p className="release-date">
        {new Date(target).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="countdown-grid">
        <div className="countdown-box">
          <span>{timeLeft.d}</span>
          <small>jours</small>
        </div>
        <div className="countdown-box">
          <span>{timeLeft.h}</span>
          <small>heures</small>
        </div>
        <div className="countdown-box">
          <span>{timeLeft.m}</span>
          <small>minutes</small>
        </div>
        <div className="countdown-box">
          <span>{timeLeft.s}</span>
          <small>secondes</small>
        </div>
      </div>
    </div>
  );
}