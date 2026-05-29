import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "../../../../components/ArticleLayout";
import EngagementTracker from "../../../../components/EngagementTracker";
import FloatingBackButton from "../../../../components/FloatingBackButton";
import GiscusThread from "../../../../components/GiscusThread";
import { getSolutionCategories, getSolutionPostBySlug, getSolutionPosts } from "../../../../lib/content";
import { getSiteConfig } from "../../../../lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  const categories = getSolutionCategories();
  const params: Array<{ category: string; slug: string }> = [];

  categories.forEach((category) => {
    const posts = getSolutionPosts(category.slug);
    posts.forEach((post) => {
      params.push({ category: category.slug, slug: post.slug });
    });
  });

  return params;
}

type SolutionPostPageProps = {
  params: { category: string; slug: string };
};

export function generateMetadata({ params }: SolutionPostPageProps): Metadata {
  const record = getSolutionPostBySlug(params.category, params.slug);
  if (!record) {
    return { title: "题解" };
  }

  return {
    title: record.meta.title,
    description: record.meta.description
  };
}

export default function SolutionPostPage({ params }: SolutionPostPageProps) {
  const record = getSolutionPostBySlug(params.category, params.slug);
  if (!record) {
    notFound();
  }
  const resolvedRecord = record as NonNullable<typeof record>;

  const siteConfig = getSiteConfig();
  const category = getSolutionCategories().find((item) => item.slug === params.category);
  const backLabel = category ? `返回${category.label}题解列表` : "返回题解列表";
  const backHref = category ? `/solution/${category.slug}` : "/solution";

  return (
    <>
      <main className="blog-main" style={{ margin: "0 auto", maxWidth: "900px", padding: "2rem" }}>
        <ArticleLayout record={resolvedRecord} backHref={backHref} backLabel={backLabel} tagBasePath={backHref} showViews />
        <section className="comments-panel" id="comments">
          <GiscusThread config={siteConfig.giscus} term={`${backHref}/${resolvedRecord.meta.slug}`} />
        </section>
      </main>

      <EngagementTracker
        config={siteConfig.engagement}
        displayId="view-count"
        pageKey={`${backHref}/${resolvedRecord.meta.slug}`}
        pageTitle={resolvedRecord.meta.title}
      />

      <FloatingBackButton fallbackHref={backHref} />
    </>
  );
}
