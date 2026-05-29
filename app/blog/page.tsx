import FloatingBackButton from "../../components/FloatingBackButton";
import Pagination from "../../components/Pagination";
import PostList from "../../components/PostList";
import SearchBox from "../../components/SearchBox";
import TagCloud from "../../components/TagCloud";
import { getBlogPosts } from "../../lib/content";
import { getTagCounts } from "../../lib/tags";

export const metadata = {
  title: "blog",
  description: "南宫有栖的文檔歸檔。"
};

const POSTS_PER_PAGE = 5;

type BlogPageProps = {
  searchParams?: {
    q?: string;
    tag?: string;
    page?: string;
  };
};

export default function BlogPage({ searchParams }: BlogPageProps) {
  const posts = getBlogPosts();
  const searchQuery = searchParams?.q?.trim() || "";
  const currentTag = searchParams?.tag?.trim() || "";
  const pageNumber = Number(searchParams?.page || "1");
  const currentPage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  let filteredPosts = posts;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) => post.title.toLowerCase().includes(q) || (post.description || "").toLowerCase().includes(q)
    );
  }

  if (currentTag) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(currentTag));
  }

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const pagedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const tagCounts = getTagCounts(posts);

  return (
    <>
      <div className="blog-layout">
        <aside className="blog-sidebar" id="blog-sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title">搜尋文章</h3>
            <SearchBox action="/blog" defaultValue={searchQuery} />
          </div>
          <div className="sidebar-widget">
            <h3 className="widget-title">所有標籤</h3>
            <TagCloud tags={tagCounts} activeTag={currentTag} basePath="/blog" />
          </div>
        </aside>

        <main className="blog-main">
          <div id="content">
            <div className="post-list-header">
              {searchQuery ? (
                <>
                  <h1 className="post-list-title">搜尋: {searchQuery}</h1>
                  <a href="/blog" className="back-link">
                    ← 清除搜尋結果
                  </a>
                </>
              ) : currentTag ? (
                <>
                  <h1 className="post-list-title">標籤: {currentTag}</h1>
                  <a href="/blog" className="back-link">
                    ← 清除標籤過濾
                  </a>
                </>
              ) : (
                <>
                  <h1 className="post-list-title">部落格</h1>
                  <p className="post-list-count">共 {filteredPosts.length} 篇文章</p>
                </>
              )}
            </div>

            <PostList posts={pagedPosts} basePath="/blog" />
            <Pagination totalPages={totalPages} activePage={safePage} basePath="/blog" tag={currentTag} query={searchQuery} />
          </div>
        </main>
      </div>

      <FloatingBackButton fallbackHref="/" />
    </>
  );
}
