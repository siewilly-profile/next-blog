import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Collection = "blog" | "solution" | "page";

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  tags: string[];
  collection: Collection;
  category?: string;
};

export type PostRecord = {
  meta: PostMeta;
  content: string;
};

export type SolutionCategory = {
  slug: string;
  label: string;
  dir: string;
  description: string;
};

const POSTS_ROOT = path.join(process.cwd(), "posts");

const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    slug: "APCS",
    label: "APCS",
    dir: "APCS",
    description: "大學程式設計先修檢測"
  },
  {
    slug: "Zerojudge",
    label: "Zerojudge",
    dir: "Zerojudge",
    description: "線上程式解题系統"
  }
];

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
}

function getMarkdownFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dirPath, file));
}

function parseFrontmatter(
  raw: string,
  fallbackSlug: string,
  collection: Collection,
  category?: string
): PostRecord {
  const parsed = matter(raw);
  const data = parsed.data || {};
  const slug = String(data.slug || fallbackSlug);
  const title = String(data.title || slug);
  const date = data.date ? String(data.date) : undefined;
  const description = data.description ? String(data.description) : undefined;
  const tags = toStringArray(data.tags);

  return {
    meta: {
      slug,
      title,
      date,
      description,
      tags,
      collection,
      category
    },
    content: parsed.content
  };
}

function sortByDateDesc(a: PostMeta, b: PostMeta): number {
  const aTime = a.date ? new Date(a.date).getTime() : 0;
  const bTime = b.date ? new Date(b.date).getTime() : 0;
  return bTime - aTime;
}

export function getSolutionCategories(): SolutionCategory[] {
  return SOLUTION_CATEGORIES;
}

export function getBlogPosts(): PostMeta[] {
  const dirPath = path.join(POSTS_ROOT, "blog");
  const files = getMarkdownFiles(dirPath);

  const posts = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const fallbackSlug = path.basename(filePath, ".md");
    return parseFrontmatter(raw, fallbackSlug, "blog").meta;
  });

  return posts.sort(sortByDateDesc);
}

export function getSolutionPosts(categorySlug: string): PostMeta[] {
  const category = SOLUTION_CATEGORIES.find((item) => item.slug === categorySlug);
  if (!category) return [];

  const dirPath = path.join(POSTS_ROOT, "solution", category.dir);
  const files = getMarkdownFiles(dirPath);

  const posts = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const fallbackSlug = path.basename(filePath, ".md");
    return parseFrontmatter(raw, fallbackSlug, "solution", category.slug).meta;
  });

  return posts.sort(sortByDateDesc);
}

export function getBlogPostBySlug(slug: string): PostRecord | null {
  const dirPath = path.join(POSTS_ROOT, "blog");
  const files = getMarkdownFiles(dirPath);

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const fallbackSlug = path.basename(filePath, ".md");
    const record = parseFrontmatter(raw, fallbackSlug, "blog");
    if (record.meta.slug === slug) return record;
  }

  return null;
}

export function getSolutionPostBySlug(
  categorySlug: string,
  slug: string
): PostRecord | null {
  const category = SOLUTION_CATEGORIES.find((item) => item.slug === categorySlug);
  if (!category) return null;

  const dirPath = path.join(POSTS_ROOT, "solution", category.dir);
  const files = getMarkdownFiles(dirPath);

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const fallbackSlug = path.basename(filePath, ".md");
    const record = parseFrontmatter(raw, fallbackSlug, "solution", category.slug);
    if (record.meta.slug === slug) return record;
  }

  return null;
}

export function getPageContent(slug: "about" | "friend"): PostRecord | null {
  const fileName = slug === "about" ? "about/about.md" : "friend/friend_page.md";
  const filePath = path.join(POSTS_ROOT, fileName);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const fallbackSlug = path.basename(filePath, ".md");
  return parseFrontmatter(raw, fallbackSlug, "page");
}

export function getAllTags(): string[] {
  const posts = [...getBlogPosts(), ...getSolutionPosts("APCS"), ...getSolutionPosts("Zerojudge")];
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}
