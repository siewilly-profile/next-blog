import Link from "next/link";
import "../styles/home.css";
import HomeInteractions from "../components/HomeInteractions";

export const metadata = {
  title: "南宫有栖",
  description: "南宫有栖的個人部落格，一位來自台灣的高中生，熱愛 Coding、演算法與圍棋，用程式書寫自己的道路。"
};

export default function HomePage() {
  return (
    <main>
      <section className="hero-section" id="hero">
        <div className="hero-ink-wash"></div>
        <div className="hero-particles" id="hero-particles"></div>

        <div className="hero-content">
          <div className="hero-avatar-wrap" id="hero-avatar">
            <div className="avatar-ink-ring"></div>
            <div className="avatar-ink-ring ring-2"></div>
            <img src="/images/owner_avatar.jpg" alt="南宫有栖" className="hero-avatar-img" />
            <div className="avatar-seal">栖</div>
          </div>

          <h1 className="hero-title" id="hero-title">
            <span className="hero-char" data-delay="0">南</span>
            <span className="hero-char" data-delay="1">宫</span>
            <span className="hero-char" data-delay="2">有</span>
            <span className="hero-char" data-delay="3">栖</span>
          </h1>

          <p className="hero-subtitle" id="hero-subtitle">墨 染 長 歌 ， 碼 繪 青 雲</p>

          <div className="hero-quote" id="hero-quote">
            <span className="quote-mark">「</span>
            寫程式是自己選的路，再怎麼難走，bug 再多，都可以想辦法解決。
            <span className="quote-mark">」</span>
          </div>

          <div className="hero-intro" id="hero-intro">
            <p>來自台灣的 17 歲高二學生，熱愛 Coding與羽球</p>
            <p>探索演算法的結構、鑽研 CTF 的奧秘、在圍棋的黑白世界中旅行</p>
          </div>

          <a href="#showcase" className="hero-scroll-btn" id="hero-scroll-btn">
            <span className="scroll-text">探索更多</span>
            <span className="scroll-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v16m0 0l-6-6m6 6l6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className="hero-side-indicator">
          <span className="indicator-line"></span>
          <span className="indicator-text">SCROLL</span>
          <span className="indicator-line"></span>
        </div>
      </section>

      <section className="showcase-section" id="showcase">
        <div className="section-header">
          <div className="header-ornament">
            <span className="orn-line"></span>
            <span className="orn-seal">雅</span>
            <span className="orn-line"></span>
          </div>
          <h2 className="section-title">雅 集</h2>
          <p className="section-desc">各方墨跡，匯於一卷</p>
        </div>

        <div className="showcase-grid">
          <Link href="/solution" className="showcase-card" id="card-solution">
            <div className="card-visual">
              <div className="card-ink-bg ink-solution"></div>
              <div className="card-number">壹</div>
            </div>
            <div className="card-content">
              <span className="card-category">解 题</span>
              <h3 className="card-title">题解筆記</h3>
              <p className="card-desc">
                程式解题的思考紀錄，從演算法中領悟結構之美，每道题都是一場修行。
              </p>
              <span className="card-link">
                閱覽 <span className="card-arrow">→</span>
              </span>
            </div>
          </Link>

          <Link href="/blog" className="showcase-card" id="card-blog">
            <div className="card-visual">
              <div className="card-ink-bg ink-blog"></div>
              <div className="card-number">貳</div>
            </div>
            <div className="card-content">
              <span className="card-category">隨 筆</span>
              <h3 className="card-title">部落格</h3>
              <p className="card-desc">技術分享與日常隨筆，記錄學習路上的點點滴滴，以筆為劍，以墨為鋒。</p>
              <span className="card-link">
                閱覽 <span className="card-arrow">→</span>
              </span>
            </div>
          </Link>

          <Link href="/about" className="showcase-card" id="card-about">
            <div className="card-visual">
              <div className="card-ink-bg ink-about"></div>
              <div className="card-number">叄</div>
            </div>
            <div className="card-content">
              <span className="card-category">自 述</span>
              <h3 className="card-title">關於我</h3>
              <p className="card-desc">一個熱愛程式的高中生，目標是資奧選訓營與交大資工。不怕錯，只怕不嘗試。</p>
              <span className="card-link">
                閱覽 <span className="card-arrow">→</span>
              </span>
            </div>
          </Link>

          <Link href="/friend" className="showcase-card" id="card-friends">
            <div className="card-visual">
              <div className="card-ink-bg ink-friends"></div>
              <div className="card-number">肆</div>
            </div>
            <div className="card-content">
              <span className="card-category">友 誼</span>
              <h3 className="card-title">友鏈</h3>
              <p className="card-desc">志同道合的朋友們，在程式的江湖中相遇，以碼會友，以技相知。</p>
              <span className="card-link">
                閱覽 <span className="card-arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="section-header">
          <div className="header-ornament">
            <span className="orn-line"></span>
            <span className="orn-seal">路</span>
            <span className="orn-line"></span>
          </div>
          <h2 className="section-title">征 途</h2>
          <p className="section-desc">學習路上的里程碑</p>
        </div>

        <div className="journey-timeline">
          <div className="timeline-line"></div>

          <div className="journey-item" data-side="left">
            <div className="journey-dot"></div>
            <div className="journey-card">
              <span className="journey-icon"></span>
              <h4 className="journey-title">Python 入門</h4>
              <p className="journey-desc">最初只是想玩玩看，結果不知不覺就進入了程式的世界</p>
            </div>
          </div>

          <div className="journey-item" data-side="right">
            <div className="journey-dot"></div>
            <div className="journey-card">
              <span className="journey-icon"></span>
              <h4 className="journey-title">前端探索</h4>
              <p className="journey-desc">HTML / CSS / JS，用程式碼為自己的想法賦予視覺形式</p>
            </div>
          </div>

          <div className="journey-item" data-side="left">
            <div className="journey-dot"></div>
            <div className="journey-card">
              <span className="journey-icon"></span>
              <h4 className="journey-title">演算法修行</h4>
              <p className="journey-desc">探索演算法的結構、自己寫题目練演算法，享受解题的成就感</p>
            </div>
          </div>

          <div className="journey-item" data-side="right">
            <div className="journey-dot"></div>
            <div className="journey-card">
              <span className="journey-icon"></span>
              <h4 className="journey-title">CTF 挑戰</h4>
              <p className="journey-desc">踏入資安領域，一步一步解開謎题、突破挑戰</p>
            </div>
          </div>
        </div>

        <div className="goals-section">
          <h3 className="goals-title"> 遠方目標</h3>
          <div className="goals-grid">
            <div className="goal-item">
              <span className="goal-seal">奧</span>
              <span className="goal-text">資奧選訓營</span>
            </div>
            <div className="goal-item">
              <span className="goal-seal">競</span>
              <span className="goal-text">資訊學科競賽全國賽</span>
            </div>
            <div className="goal-item">
              <span className="goal-seal">安</span>
              <span className="goal-text">AIS3 門票</span>
            </div>
            <div className="goal-item">
              <span className="goal-seal">學</span>
              <span className="goal-text">交通大學資工系</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer" id="home-footer">
        <div className="footer-poem">
          <span className="poem-line">路漫漫其修遠兮</span>
          <span className="poem-divider">·</span>
          <span className="poem-line">吾將上下而求索</span>
        </div>
        <div className="footer-info">
          <p>&copy; 2026 南宫有栖 — 以墨為鋒，以碼會友</p>
        </div>
      </footer>

      <HomeInteractions />
    </main>
  );
}
