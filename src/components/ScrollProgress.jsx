import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  const raf = useRef(null);
  const pending = useRef(false);

  useEffect(() => {
    const measure = () => {
      const h = document.documentElement;
      const b = document.body;
      const scrollTop = window.pageYOffset || h.scrollTop || b.scrollTop || 0;
      const scrollHeight = Math.max(b.scrollHeight, h.scrollHeight);
      const clientHeight = h.clientHeight;
      const height = Math.max(0, scrollHeight - clientHeight);
      const percent = height > 0 ? (scrollTop / height) * 100 : 0;
      setP(percent);
      pending.current = false;
      raf.current = null;
    };

    const requestMeasure = () => {
      if (pending.current) return;
      pending.current = true;
      raf.current = window.requestAnimationFrame(measure);
    };

    requestMeasure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Render into body to avoid stacking context/transform issues
  return createPortal(
    <div className="read-progress" style={{ width: `${p}%` }} />,
    document.body
  );
}
