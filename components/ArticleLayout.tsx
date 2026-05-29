import { PostRecord } from "../lib/content";
import { renderMarkdown } from "../lib/markdown";
import MarkdownContent from "./MarkdownContent";
import ArticleMeta from "./ArticleMeta";

type ArticleLayoutProps = {
  record: PostRecord;
  backHref: string;
  backLabel: string;
  tagBasePath: string;
  showViews?: boolean;
};

export default function ArticleLayout({ record, backHref, backLabel, tagBasePath, showViews }: ArticleLayoutProps) {
  const html = renderMarkdown(record.content);

  return (
    <>
      <ArticleMeta
        meta={record.meta}
        content={record.content}
        backHref={backHref}
        backLabel={backLabel}
        tagBasePath={tagBasePath}
        showViews={showViews}
      />
      <div className="article-body">
        <MarkdownContent html={html} />
      </div>
    </>
  );
}
