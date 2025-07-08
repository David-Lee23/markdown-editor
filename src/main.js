import { marked } from "marked";
import hljs from "highlight.js";

// Get textarea & preview
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// Update preview with user types
editor.addEventListener("input", () => {
  const markdownText = editor.value;
  preview.innerHTML = marked.parse(markdownText);
});

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});
