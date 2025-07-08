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

const resizer = document.getElementById("resizer");
let isResizing = false;

resizer.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.body.style.cursor = "col-resize";
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  //get total width of container
  const container = document.getElementById("app");
  const totalWidth = container.offsetWidth;

  //new width
  const newEditorWidth = e.clientX - container.offsetLeft;
  const editor = document.getElementById("editor");
  const preview = document.getElementById("preview");

  //constrain width to 10-90% to avoid layout breaking
  const minWidth = totalWidth * 0.1;
  const maxWidth = totalWidth * 0.9;

  if (newEditorWidth > minWidth && newEditorWidth < maxWidth) {
    editor.style.width = `${newEditorWidth}px`;
    preview.style.width = `${totalWidth - newEditorWidth - resizer.offsetWidth}px`;
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  document.body.style.cursor = "default";
});
