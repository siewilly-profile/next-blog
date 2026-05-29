import { notFound } from "next/navigation";
import FloatingBackButton from "../../components/FloatingBackButton";
import GiscusThread from "../../components/GiscusThread";
import MarkdownContent from "../../components/MarkdownContent";
import { getPageContent } from "../../lib/content";
import { renderMarkdown } from "../../lib/markdown";
import { getSiteConfig } from "../../lib/site-config";

export const metadata = {
  title: "友鏈",
  description: "南宫有栖的友情鏈接。"
};

export default async function FriendPage() {
  const record = getPageContent("friend");
  if (!record) {
    notFound();
  }

  const html = await renderMarkdown(record.content);
  const siteConfig = getSiteConfig();

  return (
    <>
      <main className="blog-main" style={{ margin: "0 auto", maxWidth: "800px", padding: "2rem" }}>
        <div id="content">
          <div className="article-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 className="article-title">友鏈</h1>
          </div>
          <div className="article-body">
            <MarkdownContent html={html} />
          </div>
          <section className="comments-panel" id="comments">
            <GiscusThread config={siteConfig.giscus} term="/friend" />
          </section>
        </div>
      </main>

      <FloatingBackButton fallbackHref="/" />
    </>
  );
}
