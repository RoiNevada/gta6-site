// src/utils/prefetch.js
let articlePrefetched = false;
let homePrefetched = false;

export function prefetchArticlePage() {
  if (articlePrefetched) return;
  articlePrefetched = true;
  import("../pages/ArticlePage.jsx");
}

export function prefetchHomePage() {
  if (homePrefetched) return;
  homePrefetched = true;
  import("../pages/HomePage.jsx");
}
