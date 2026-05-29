"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "../lib/navigation";

export type SiteStats = {
  blogCount: number;
  categoryCount: number;
  tagCount: number;
};

type NavigationProps = {
  stats: SiteStats;
};

export default function Navigation({ stats }: NavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const activeKey = useMemo(() => {
    if (!pathname) return "/";
    if (pathname.startsWith("/solution")) return "/solution";
    if (pathname.startsWith("/blog")) return "/blog";
    if (pathname.startsWith("/about")) return "/about";
    if (pathname.startsWith("/friend")) return "/friend";
    return "/";
  }, [pathname]);

  return (
    <>
      <nav className="top_list" id="main-nav">
        <div className="nav-inner">
          <button
            className={`burger-btn ${open ? "is-open" : ""}`}
            id="burger-btn"
            aria-label="開啟選單"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>

          <div className="nav-ornament left-ornament">
            <span className="ornament-line"></span>
            <span className="ornament-diamond">&#9670;</span>
          </div>

          <Link href="/" className="brand" id="brand-link">
            <span className="brand-char" style={{ animationDelay: "0s" }}>南</span>
            <span className="brand-char" style={{ animationDelay: "0.1s" }}>宫</span>
            <span className="brand-char" style={{ animationDelay: "0.2s" }}>有</span>
            <span className="brand-char" style={{ animationDelay: "0.3s" }}>栖</span>
          </Link>

          <div className="nav-divider">
            <span className="divider-dot">&#8226;</span>
            <span className="divider-line"></span>
            <span className="divider-dot">&#8226;</span>
          </div>

          <div className="nav-links" id="nav-links">
            {navItems.map((item) => {
              const isActive = activeKey === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <span className="link-text">{item.label}</span>
                  <span className="link-sub">{item.sub}</span>
                </Link>
              );
            })}
          </div>

          <div className="nav-ornament right-ornament">
            <span className="ornament-diamond">&#9670;</span>
            <span className="ornament-line"></span>
          </div>
        </div>
      </nav>

      <div
        className={`scroll-overlay ${open ? "is-open" : ""}`}
        id="scroll-overlay"
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      ></div>

      <aside className={`scroll-sidebar ${open ? "is-open" : ""}`} id="scroll-sidebar">
        <div className="scroll-rod"></div>
        <div className="scroll-content">
          <button
            className="scroll-close"
            id="scroll-close"
            aria-label="關閉選單"
            onClick={() => setOpen(false)}
            type="button"
          >
            <span className="close-x">✕</span>
          </button>

          <div className="sidebar-profile">
            <div className="sidebar-avatar-wrap">
              <div className="sidebar-avatar-ring"></div>
              <img
                src="/images/owner_avatar.jpg"
                alt="南宫有栖"
                className="sidebar-avatar"
              />
              <div className="sidebar-stamp">栖</div>
            </div>
            <h3 className="sidebar-name">南宫有栖</h3>
            <p className="sidebar-sub">Code Player</p>
          </div>

          <div className="sidebar-stats">
            <div className="stat-col">
              <span className="stat-val">{stats.blogCount}</span>
              <span className="stat-label">文章</span>
            </div>
            <span className="stat-divider"></span>
            <div className="stat-col">
              <span className="stat-val">{stats.categoryCount}</span>
              <span className="stat-label">分类</span>
            </div>
            <span className="stat-divider"></span>
            <div className="stat-col">
              <span className="stat-val">{stats.tagCount}</span>
              <span className="stat-label">標籤</span>
            </div>
          </div>

          <div className="sidebar-social">
            <a href="mailto:your@email.com" className="social-icon" title="Email">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a href="https://github.com/" className="social-icon" target="_blank" rel="noreferrer">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://instagram.com/" className="social-icon" target="_blank" rel="noreferrer">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://discord.com/" className="social-icon" target="_blank" rel="noreferrer">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item, index) => {
              const isActive = activeKey === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                  style={{ animationDelay: `${0.3 + index * 0.08}s` }}
                  onClick={() => setOpen(false)}
                >
                  <span className="sidebar-link-seal">☯</span>
                  <span className="sidebar-link-text">{item.label}</span>
                  <span className="sidebar-link-sub">{item.sub}</span>
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-poem">
            <span>以墨為鋒</span>
            <span className="poem-dot">·</span>
            <span>以碼會友</span>
          </div>
        </div>
      </aside>
    </>
  );
}
