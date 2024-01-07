import { Progress } from "@/lib/types";

const progress: Progress = [];

function clearProgress() {
  progress.length = 0;
}

function createGrid(
  text: string,
  pattern: string,
  beingComparedIndex: number,
  firstPatternCharIndex: number,
  lastPatternCharIndex: number,
  isCharacterMatching: boolean
): void {
  const grid = Array.from(text, (char, i) => [
    { char, isBeingCompared: beingComparedIndex === i },
    {
      char:
        i >= firstPatternCharIndex && i <= lastPatternCharIndex
          ? pattern[i - firstPatternCharIndex]
          : null,
      isBeingCompared: beingComparedIndex === i,
      isMatch: isCharacterMatching,
    },
  ]);

  progress.push(grid);
}

export function bruteForce(text: string, pattern: string) {
  clearProgress();

  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j = 0;

    while (j < pattern.length) {
      let isCharacterMatching = text[i + j] === pattern[j];
      let onLastLetterInPattern = j === pattern.length - 1;

      createGrid(
        text,
        pattern,
        i + j,
        i,
        i + pattern.length - 1,
        isCharacterMatching
      );

      if (isCharacterMatching && onLastLetterInPattern) {
        return { progress, result: { found: true, index: i } };
      } else if (isCharacterMatching) {
        j++;
      } else {
        break;
      }
    }
  }

  return { progress, result: { found: false, index: null } };
}

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

export function kmp(text: string, pattern: string) {
  clearProgress();

  const failureFunction = buildFailureFunction(pattern);

  let i = 0;
  let j = 0;

  let firstPatternCharIndex = 0;

  while (i < text.length && j < pattern.length) {
    let isCharacterMatching = text[i] === pattern[j];

    createGrid(
      text,
      pattern,
      i,
      firstPatternCharIndex,
      firstPatternCharIndex + pattern.length - 1,
      isCharacterMatching
    );

    if (isCharacterMatching) {
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
