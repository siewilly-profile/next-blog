import { notFound } from "next/navigation";
import FloatingBackButton from "../../components/FloatingBackButton";
import MarkdownContent from "../../components/MarkdownContent";
import { getPageContent } from "../../lib/content";
import { renderMarkdown } from "../../lib/markdown";

export const metadata = {
  title: "關於",
  description: "關於南宫有栖。"
};

export default function AboutPage() {
  const record = getPageContent("about");
  if (!record) {
    notFound();
  }

  const html = renderMarkdown(record.content);

  return (
    <>
      <main className="about-container" id="about-container">
        <MarkdownContent html={html} />
      </main>
      <FloatingBackButton fallbackHref="/" />
    </>
  );
}
