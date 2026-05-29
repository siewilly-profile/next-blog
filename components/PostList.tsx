import Link from "next/link";
import { PostMeta } from "../lib/content";

type PostListProps = {
  posts: PostMeta[];
  basePath: string;
};

export default function PostList({ posts, basePath }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="error-msg">
        <p>找不到符合條件的文章。</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Link key={post.slug} href={`${basePath}/${post.slug}`} className="post-card">
          <div className="post-card-body">
            <div className="post-card-meta">
              {post.date && (
                <span className="meta-item">
                  <span className="meta-icon">☰</span> {post.date}
                </span>
              )}
            </div>
            <h2 className="post-card-title">{post.title}</h2>
            {post.description && <p className="post-card-desc">{post.description}</p>}
            {post.tags.length > 0 && (
              <div className="post-card-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
