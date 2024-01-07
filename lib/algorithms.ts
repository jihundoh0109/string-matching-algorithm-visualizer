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
