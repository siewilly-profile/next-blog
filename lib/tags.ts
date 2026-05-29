import { PostMeta } from "./content";

export type TagCount = {
  tag: string;
  count: number;
};

export function getTagCounts(posts: PostMeta[]): TagCount[] {
  const map = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      map.set(tag, (map.get(tag) || 0) + 1);
    });
  });

  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
