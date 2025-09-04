import { useEffect, useRef, useState, lazy, Suspense } from "react";

const RealImage = lazy(() => import("./RealImage.jsx"));

export default function LazyImage({ eager = false, fetchpriority, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (eager) {
      setVisible(true);
      return () => {};
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { root: null, rootMargin: "200px", threshold: 0.01 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={ref}>
      <Suspense fallback={<div style={{ height: props.height, width: props.width }} />}> 
        {visible && (
          <RealImage
            {...props}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={fetchpriority}
          />
        )}
      </Suspense>
    </div>
  );
}
