export function countWords(text: string): number {
  return (text || "").replace(/\s/g, "").length;
}

export function estimateReadTime(words: number, wordsPerMinute = 300): number {
  if (!words || words < 1) return 1;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
