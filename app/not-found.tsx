import Link from "next/link";

export default function NotFound() {
  return (
    <main className="blog-main" style={{ margin: "0 auto", maxWidth: "800px", padding: "3rem 2rem" }}>
      <div className="error-msg" style={{ textAlign: "center" }}>
        <h1>找不到頁面</h1>
        <p>此頁面不存在或已被移動。</p>
        <Link href="/" className="back-link">
          ← 回到首頁
        </Link>
      </div>
    </main>
  );
}
