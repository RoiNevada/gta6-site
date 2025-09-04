import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ArticleCard = lazy(() => import("./ArticleCard.jsx"));

export default function LazyArticleCard(props) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { root: null, rootMargin: "200px", threshold: 0.01 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Suspense fallback={null}>{visible && <ArticleCard {...props} />}</Suspense>
    </div>
  );
}
