import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true
});

export async function renderMarkdown(markdownText: string): Promise<string> {
  return await marked.parse(markdownText || "");
}
