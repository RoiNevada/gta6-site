// src/components/PageFade.jsx
import { motion as Motion } from "framer-motion";

export default function PageFade({ children }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
}