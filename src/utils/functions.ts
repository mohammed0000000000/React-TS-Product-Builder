/**
 * 
 * @param {string} text - the input text to be sliced
 * @param {number} [maxLen = 50] - the maximum length before truncation
 * @returns {string} text after slicing 
 */
export function textSlicer(text: string, maxLen: number = 50) {
  if (text.length >= maxLen) return text.slice(0, maxLen) + "...";
  return text;
}