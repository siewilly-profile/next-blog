import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "../../../components/ArticleLayout";
import EngagementTracker from "../../../components/EngagementTracker";
import FloatingBackButton from "../../../components/FloatingBackButton";
import GiscusThread from "../../../components/GiscusThread";
import { getBlogPostBySlug, getBlogPosts } from "../../../lib/content";
import { getSiteConfig } from "../../../lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const record = getBlogPostBySlug(params.slug);
  if (!record) {
    return { title: "部落格" };
  }

  return {
    title: record.meta.title,
    description: record.meta.description
  };
}

type BlogPostPageProps = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const record = getBlogPostBySlug(params.slug);
  if (!record) {
    notFound();
  }

  const siteConfig = getSiteConfig();

  return (
    <>
      <main className="blog-main" style={{ margin: "0 auto", maxWidth: "900px", padding: "2rem" }}>
        <ArticleLayout record={record} backHref="/blog" backLabel="返回部落格列表" tagBasePath="/blog" showViews />
        <section className="comments-panel" id="comments">
          <GiscusThread config={siteConfig.giscus} term={`/blog/${record.meta.slug}`} />
        </section>
      </main>

      <EngagementTracker
        config={siteConfig.engagement}
        displayId="view-count"
        pageKey={`/blog/${record.meta.slug}`}
        pageTitle={record.meta.title}
      />

      <FloatingBackButton fallbackHref="/blog" />
    </>
  );
}
