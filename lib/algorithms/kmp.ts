import { progress, clearProgress, createGrid } from "@/lib/utils";
import { SearchResult } from "@/lib/types";

function buildFailureFunction(pattern: string) {
  const failureValues = [0];

  let j = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[j] === pattern[i]) {
      failureValues.push(j + 1);
      i++;
      j++;
    } else if (j === 0) {
      failureValues.push(0);
      i++;
    } else {
      j = failureValues[j - 1];
    }
  }

  return failureValues;
}

export function kmp(text: string, pattern: string): SearchResult {
  clearProgress();

  const failureFunction = buildFailureFunction(pattern);

  let i = 0;
  let j = 0;

  let firstPatternCharIndex = 0;

  while (i < text.length && j < pattern.length) {
    const isMatching = text[i] === pattern[j];

    createGrid(
      text,
      pattern,
      i,
      firstPatternCharIndex,
      firstPatternCharIndex + pattern.length - 1,
      isMatching
    );

    if (isMatching) {
      i++;
      j++;
    } else if (i < text.length - 1) {
      if (j !== 0) {
        j = failureFunction[j - 1];
        firstPatternCharIndex = i - j;
      } else {
        firstPatternCharIndex = i + 1;
        i++;
      }
    } else {
      return { progress, result: { found: false, index: null } };
    }
  }
  return { progress, result: { found: true, index: i - pattern.length } };
}
