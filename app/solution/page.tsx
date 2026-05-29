import Link from "next/link";
import FloatingBackButton from "../../components/FloatingBackButton";
import { getSolutionCategories } from "../../lib/content";

export const metadata = {
  title: "题解",
  description: "南宫有栖的题解筆記。"
};

export default function SolutionPage() {
  const categories = getSolutionCategories();

  return (
    <>
      <div id="content">
        <div className="post-list-header">
          <h1 className="post-list-title">题解分类</h1>
          <p className="post-list-count">選擇题庫以瀏覽题解</p>
        </div>

        <div className="category-grid" id="category-grid">
          {categories.map((category) => (
            <Link key={category.slug} href={`/solution/${category.slug}`} className="category-card">
              <div className="category-icon">
                <span className="category-seal">策</span>
              </div>
              <h2 className="category-name">{category.label}</h2>
              <p className="category-desc">{category.description}</p>
              <span className="category-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      <FloatingBackButton fallbackHref="/" />
    </>
  );
}
