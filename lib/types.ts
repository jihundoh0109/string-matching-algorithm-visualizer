export type Step = {
  char: string | null;
  isBeingCompared: boolean;
  isMatch?: boolean;
}[];

export type Progress = Step[][];

export type Result = { found: boolean; index: number | null };

export type SearchResult = { progress: Progress; result: Result };
