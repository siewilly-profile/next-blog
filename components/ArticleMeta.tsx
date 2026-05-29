import Link from "next/link";
import { PostMeta } from "../lib/content";
import { countWords, estimateReadTime } from "../lib/text";

type ArticleMetaProps = {
  meta: PostMeta;
  content: string;
  backHref: string;
  backLabel: string;
  tagBasePath: string;
  showViews?: boolean;
};

export default function ArticleMeta({ meta, content, backHref, backLabel, tagBasePath, showViews }: ArticleMetaProps) {
  const wordCount = countWords(content);
  const readTime = estimateReadTime(wordCount);

  return (
    <div className="article-header">
      <Link href={backHref} className="back-link">
        ← {backLabel}
      </Link>
      <h1 className="article-title">{meta.title}</h1>
      <div className="article-meta">
        {meta.date && (
          <span className="meta-item">
            <span className="meta-icon">☰</span> {meta.date}
          </span>
        )}
        <span className="meta-item">
          <span className="meta-icon">✍</span> {wordCount} 字
        </span>
        <span className="meta-item">
          <span className="meta-icon">⏳</span> {readTime} 分鐘
        </span>
        {showViews && (
          <span className="meta-item">
            <span className="meta-icon">👁</span> <span id="view-count">載入中...</span>
          </span>
        )}
      </div>
      {meta.tags.length > 0 && (
        <div className="article-tags">
          {meta.tags.map((tag) => (
            <Link key={tag} href={`${tagBasePath}?tag=${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
