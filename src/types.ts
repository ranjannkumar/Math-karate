export type AnswerMark = 'fast' | 'slow' | 'wrong';

export interface Problem {
  a: number;
  b: number;
  sum: number;
  choices: number[];
  correct: number;
}
