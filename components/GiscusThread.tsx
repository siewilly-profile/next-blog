"use client";

import { useEffect, useRef } from "react";
import type { GiscusConfig } from "../lib/site-config";

type GiscusThreadProps = {
  config: GiscusConfig;
  term?: string;
};

export default function GiscusThread({ config, term }: GiscusThreadProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!config.enabled || !config.repo || !config.repoId || !config.category || !config.categoryId) {
      container.innerHTML =
        "<div class=\"comments-card giscus-hint\"><h3 class=\"comments-title\">留言板</h3><p>尚未啟用 giscus。請先在 <strong>env.public.json</strong> 設定 GISCUS_* 變數。</p></div>";
      return;
    }

    container.innerHTML = "<div class=\"comments-card\"><h3 class=\"comments-title\">留言板</h3><div id=\"giscus-thread\"></div></div>";
    const thread = container.querySelector("#giscus-thread");
    if (!thread) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    const finalTerm = term && term.trim() ? term.trim() : window.location.pathname;
    const mapping = term && term.trim() ? "specific" : config.mapping || "pathname";

    script.setAttribute("data-repo", config.repo);
    script.setAttribute("data-repo-id", config.repoId);
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-term", finalTerm);
    script.setAttribute("data-strict", config.strict || "1");
    script.setAttribute("data-reactions-enabled", config.reactionsEnabled || "1");
    script.setAttribute("data-emit-metadata", config.emitMetadata || "0");
    script.setAttribute("data-input-position", config.inputPosition || "bottom");
    script.setAttribute("data-theme", config.theme || "preferred_color_scheme");
    script.setAttribute("data-lang", config.lang || "zh-TW");

    thread.appendChild(script);
  }, [config, term]);

  return <div ref={containerRef} />;
}
