"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import renderMathInElement from "katex/contrib/auto-render";

type MarkdownContentProps = {
  html: string;
  className?: string;
};

export default function MarkdownContent({ html, className }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = container.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    renderMathInElement(container, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false,
      strict: "ignore",
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
