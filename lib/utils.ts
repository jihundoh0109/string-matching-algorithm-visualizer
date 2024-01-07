import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Progress } from "@/lib/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const progress: Progress = [];

export function clearProgress(): void {
  progress.length = 0;
}

export function createGrid(
  text: string,
  pattern: string,
  beingComparedIndex: number | number[],
  firstPatternCharIndex: number,
  lastPatternCharIndex: number,
  isCharacterMatching: boolean
): void {
  const grid = Array.from(text, (textChar, i) => ({
    textChar,
    patternChar:
      i >= firstPatternCharIndex && i <= lastPatternCharIndex
        ? pattern[i - firstPatternCharIndex]
        : null,
    isBeingCompared: Array.isArray(beingComparedIndex)
      ? beingComparedIndex.includes(i)
      : beingComparedIndex === i,
    isMatch: isCharacterMatching,
  }));

  progress.push(grid);
}
