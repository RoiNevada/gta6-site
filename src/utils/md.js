import { marked } from "marked";
import DOMPurify from "dompurify";

export function renderMD(md) {
  const html = marked.parse(md || "");
  return DOMPurify.sanitize(html);
}