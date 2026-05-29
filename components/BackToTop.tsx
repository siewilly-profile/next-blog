"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`back-to-top-wrapper ${visible ? "is-visible" : ""}`}
      id="backToTop"
      aria-label="回到頂部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span>點我回頂部</span>
      <div className="back-to-top-seal">栖</div>
    </div>
  );
}
