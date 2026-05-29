import fs from "fs";
import path from "path";

export type GiscusConfig = {
  enabled: boolean;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  strict: string;
  reactionsEnabled: string;
  emitMetadata: string;
  inputPosition: string;
  theme: string;
  lang: string;
};

export type EngagementConfig = {
  enabled: boolean;
  endpoint: string;
  scriptSrc: string;
  viewThrottleMinutes: number;
};

export type SiteConfig = {
  giscus: GiscusConfig;
  engagement: EngagementConfig;
};

let cachedConfig: SiteConfig | null = null;

function toBool(value: unknown, fallbackValue: boolean): boolean {
  if (value === true || value === "true" || value === "1") return true;
  if (value === false || value === "false" || value === "0") return false;
  return fallbackValue;
}

function toPositiveNumber(value: unknown, fallbackValue: number): number {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) return n;
  return fallbackValue;
}

function readEnvFile(): Record<string, string> {
  const filePath = path.join(process.cwd(), "env.public.json");
  if (!fs.existsSync(filePath)) return {};

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getSiteConfig(): SiteConfig {
  if (cachedConfig) return cachedConfig;

  const envFile = readEnvFile();
  const env = { ...envFile, ...process.env } as Record<string, string>;

  cachedConfig = {
    giscus: {
      enabled: toBool(env.GISCUS_ENABLED, false),
      repo: env.GISCUS_REPO || "",
      repoId: env.GISCUS_REPO_ID || "",
      category: env.GISCUS_CATEGORY || "",
      categoryId: env.GISCUS_CATEGORY_ID || "",
      mapping: env.GISCUS_MAPPING || "pathname",
      strict: String(env.GISCUS_STRICT || "0"),
      reactionsEnabled: String(env.GISCUS_REACTIONS_ENABLED || "1"),
      emitMetadata: String(env.GISCUS_EMIT_METADATA || "0"),
      inputPosition: env.GISCUS_INPUT_POSITION || "bottom",
      theme: env.GISCUS_THEME || "preferred_color_scheme",
      lang: env.GISCUS_LANG || "zh-TW"
    },
    engagement: {
      enabled: toBool(env.ENGAGEMENT_ENABLED, false),
      endpoint: env.ENGAGEMENT_ENDPOINT || "",
      scriptSrc: env.ENGAGEMENT_SCRIPT_SRC || "https://gc.zgo.at/count.js",
      viewThrottleMinutes: toPositiveNumber(env.ENGAGEMENT_VIEW_THROTTLE_MINUTES, 30)
    }
  };

  return cachedConfig;
}
