import { useEffect, useRef, useState, lazy, Suspense } from "react";

const RealImage = lazy(() => import("./RealImage.jsx"));

export default function LazyImage(props) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Suspense fallback={<div style={{ height: props.height, width: props.width }} />}> 
        {visible && <RealImage {...props} loading="lazy" />}
      </Suspense>
    </div>
  );
}
