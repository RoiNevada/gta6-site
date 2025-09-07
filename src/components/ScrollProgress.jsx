// src/components/ScrollProgress.jsx
import { useEffect, useState, useRef } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const root =
      document.scrollingElement ||
      document.documentElement ||
      document.body;

    const compute = () => {
      // position courante (ok Safari/Chrome/Firefox)
      const y =
        window.scrollY ??
        window.pageYOffset ??
        root.scrollTop ??
        0;

      const max = (root.scrollHeight || 0) - (root.clientHeight || 0);

      if (max <= 0) {
        setWidth(0);
        setVisible(false);
        return;
      }
      const pct = Math.min(100, Math.max(0, (y / max) * 100));
      setWidth(pct);
      setVisible(true);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    compute(); // init
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      className="read-progress"
      style={{
        width: `${width}%`,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
}