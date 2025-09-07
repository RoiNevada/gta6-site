import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);

// Idle-route prefetch: warms up lazy-loaded route chunks after hydration
// to speed up first navigation without affecting initial render.
if (typeof window !== "undefined") {
  const prefetchRoutes = () => {
    // Fire-and-forget; Vite will cache these chunks
    import("./pages/ArticlePage.jsx");
    import("./pages/HomePage.jsx");
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(prefetchRoutes, { timeout: 2000 });
  } else {
    setTimeout(prefetchRoutes, 1500);
  }
}
