import { progress, clearProgress, createGrid } from "@/lib/utils";
import { SearchResult } from "@/lib/types";

const HASH_BASE = 2;

function calculateHash(str: string) {
  let hashValue = 0;

  for (let i = 0; i < str.length; i++) {
    hashValue += str.charCodeAt(i) * Math.pow(HASH_BASE, str.length - 1 - i);
  }

  return hashValue;
}

function calculateRollingHash(
  currSubstringHash: number,
  charToBeRemoved: number,
  charToBeAdded: number,
  patternLength: number
) {
  return (
    (currSubstringHash -
      charToBeRemoved * Math.pow(HASH_BASE, patternLength - 1)) *
      HASH_BASE +
    charToBeAdded
  );
}

function checkEqual(textSubstring: string, pattern: string) {
  return textSubstring === pattern;
}

export function rabinKarp(text: string, pattern: string): SearchResult {
  clearProgress();

  const patternHash = calculateHash(pattern);
  let currSubstringHash = calculateHash(text.substring(0, pattern.length));

  let i: number;

  for (i = 0; i <= text.length - pattern.length; i++) {
    const isMatching =
      patternHash === currSubstringHash &&
      checkEqual(text.substring(i, i + pattern.length), pattern);

    createGrid(
      text,
      pattern,
      Array.from({ length: pattern.length }, (_, index) => i + index),
      i,
      i + pattern.length - 1,
      isMatching
    );

    if (isMatching) {
      break;
    } else if (i < text.length - pattern.length) {
      const charToBeRemoved = text.charCodeAt(i);
      const charToBeAdded = text.charCodeAt(i + pattern.length);

      currSubstringHash = calculateRollingHash(
        currSubstringHash,
        charToBeRemoved,
        charToBeAdded,
        pattern.length
      );
    } else {
      return { progress, result: { found: false, index: null } };
    }
  }
  return { progress, result: { found: true, index: i } };
}
