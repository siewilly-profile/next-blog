import type { Metadata } from "next";
import "./globals.css";
import "../styles/style.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.min.css";

import Navigation from "../components/Navigation";
import PageTransition from "../components/PageTransition";
import BackToTop from "../components/BackToTop";
import { getSiteStats } from "../lib/site-data";

export const metadata: Metadata = {
  title: {
    default: "南宫有栖",
    template: "%s — 南宫有栖"
  },
  description: "南宫有栖的個人部落格，一位來自台灣的高中生，熱愛 Coding、演算法與圍棋，用程式書寫自己的道路。"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const stats = getSiteStats();

  return (
    <html lang="zh-TW">
      <body>
        <div className="page-shell">
          <PageTransition />
          <Navigation stats={stats} />
          {children}
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
