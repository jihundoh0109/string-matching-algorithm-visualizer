import { progress, clearProgress, createGrid } from "@/lib/utils";
import { SearchResult } from "@/lib/types";

export function bruteForce(text: string, pattern: string): SearchResult {
  clearProgress();

  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j = 0;

    while (j < pattern.length) {
      const isMatching = text[i + j] === pattern[j];
      const isLastCharInPattern = j === pattern.length - 1;

      createGrid(text, pattern, i + j, i, i + pattern.length - 1, isMatching);

      if (isMatching && isLastCharInPattern) {
        return { progress, result: { found: true, index: i } };
      } else if (isMatching) {
        j++;
      } else {
        break;
      }
    }
  }

  return { progress, result: { found: false, index: null } };
}
