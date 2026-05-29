"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    let enterTimer: number | undefined;
    let hideTimer: number | undefined;

    const clearTimers = () => {
      if (enterTimer) window.clearTimeout(enterTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };

    const playEnter = () => {
      clearTimers();
      overlay.style.display = "flex";
      overlay.style.pointerEvents = "none";
      overlay.classList.remove("is-leaving");
      overlay.classList.remove("is-entering");
      enterTimer = window.setTimeout(() => {
        overlay.classList.add("is-entering");
      }, 50);
      hideTimer = window.setTimeout(() => {
        overlay.style.display = "none";
      }, 850);
    };

    playEnter();

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (targetAttr === "_blank") return;
      if ((event as MouseEvent).ctrlKey || (event as MouseEvent).metaKey) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      overlay.style.display = "flex";
      overlay.style.pointerEvents = "auto";
      overlay.classList.remove("is-entering");
      void overlay.offsetWidth;
      overlay.classList.add("is-leaving");

      setTimeout(() => {
        router.push(url.pathname + url.search + url.hash);
      }, 750);
    };

    document.addEventListener("click", handleClick, true);

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        playEnter();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      clearTimers();
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [router]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.style.display = "flex";
    overlay.style.pointerEvents = "none";
    overlay.classList.remove("is-leaving");
    overlay.classList.remove("is-entering");

    const enterTimer = window.setTimeout(() => {
      overlay.classList.add("is-entering");
    }, 50);
    const hideTimer = window.setTimeout(() => {
      overlay.style.display = "none";
    }, 850);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <div id="page-transition" className="page-transition-overlay" ref={overlayRef}>
      <div className="transition-seal-container">
        <div className="transition-seal">栖</div>
      </div>
    </div>
  );
}
