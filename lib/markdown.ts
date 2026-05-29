import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true
});

export function renderMarkdown(markdownText: string): string {
  return marked.parse(markdownText || "");
}
