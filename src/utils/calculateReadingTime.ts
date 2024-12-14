export const calculateReadingTime = (
  text: string,
  wordsPerMinute = 200
): string => {
  if (!text) return "0 min read";
  const wordCount = text.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTimeMinutes} min read`;
};
