import { getAllTags, getBlogPosts, getSolutionCategories } from "./content";

export function getSiteStats() {
  const blogCount = getBlogPosts().length;
  const categoryCount = getSolutionCategories().length;
  const tagCount = getAllTags().length;

  return {
    blogCount,
    categoryCount,
    tagCount
  };
}
