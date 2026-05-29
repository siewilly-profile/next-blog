"use client";

import { useEffect } from "react";
import type { EngagementConfig } from "../lib/site-config";

type EngagementTrackerProps = {
  config: EngagementConfig;
  displayId?: string;
  pageKey?: string;
  pageTitle?: string;
};

let loaderPromise: Promise<boolean> | null = null;

function shouldCountView(pageId: string, minutes: number) {
  try {
    const key = `engagement:view:${pageId}`;
    const now = Date.now();
    const old = localStorage.getItem(key);
    if (old) {
      const last = Number(old);
      const gap = minutes * 60 * 1000;
      if (!Number.isNaN(last) && now - last < gap) {
        return false;
      }
    }
    localStorage.setItem(key, String(now));
    return true;
  } catch {
    return true;
  }
}

function ensureGoatCounter(config: EngagementConfig): Promise<boolean> {
  if (!config.enabled || !config.endpoint) return Promise.resolve(false);
  if (typeof window === "undefined") return Promise.resolve(false);
  if (typeof (window as any).goatcounter?.count === "function") return Promise.resolve(true);
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-goatcounter]");
    if (existing) {
      resolve(true);
      return;
    }

    (window as any).goatcounter = (window as any).goatcounter || {};
    (window as any).goatcounter.no_onload = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = config.scriptSrc || "https://gc.zgo.at/count.js";
    script.setAttribute("data-goatcounter", config.endpoint);
    script.addEventListener("load", () => resolve(true));
    script.addEventListener("error", () => reject(new Error("Failed to load GoatCounter")));
    document.head.appendChild(script);
  });

  return loaderPromise;
}

function setViewText(displayId: string | undefined, text: string) {
  if (!displayId) return;
  const el = document.getElementById(displayId);
  if (el) {
    el.textContent = text;
  }
}

export default function EngagementTracker({ config, displayId, pageKey, pageTitle }: EngagementTrackerProps) {
  useEffect(() => {
    if (!config.enabled) {
      setViewText(displayId, "未啟用");
      return;
    }

    const key = pageKey || window.location.pathname;
    const pageId = encodeURIComponent(key).slice(0, 1200);
    const throttleMinutes = config.viewThrottleMinutes || 30;

    ensureGoatCounter(config)
      .then(() => {
        if (shouldCountView(pageId, throttleMinutes) && typeof (window as any).goatcounter?.count === "function") {
          (window as any).goatcounter.count({
            path: key,
            title: pageTitle || document.title
          });
        }
        setViewText(displayId, "已記錄");
      })
      .catch(() => {
        setViewText(displayId, "載入失敗");
      });
  }, [config, displayId, pageKey, pageTitle]);

  return null;
}
