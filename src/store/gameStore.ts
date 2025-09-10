import { create } from "zustand";
import type { Problem, AnswerMark } from "../types";
import { makeSet } from "../utils/generator";

interface State {
  problems: Problem[];
  current: number;
  marks: AnswerMark[];           // one symbol per answered problem
  lastShownAt: number;           // ms timestamp when current question appeared
  sessionStart: number | null;   
  sessionEnd: number | null;

  startSession: (n?: number) => void;
  answer: (choice: number) => void;
  reset: () => void;
}

export const useGame = create<State>((set, get) => ({
  problems: [],
  current: 0,
  marks: [],
  lastShownAt: Date.now(),
  sessionStart: null,
  sessionEnd: null,

  startSession: (n = 10) =>
    set({
      problems: makeSet(n, 5),
      current: 0,
      marks: [],
      lastShownAt: Date.now(),
      sessionStart: Date.now(),
      sessionEnd: null,
    }),

  answer: (choice: number) => {
    const { problems, current, marks, lastShownAt } = get();
    const p = problems[current];
    const elapsed = performance.now() - lastShownAt;
    const correct = choice === p.correct;

    let mark: AnswerMark = 'wrong';
    if (correct) mark = elapsed < 1000 ? 'fast' : 'slow';

    const next = current + 1;
    const done = next >= problems.length;

    set({
      marks: [...marks, mark],
      current: next,
      lastShownAt: Date.now(),
      sessionEnd: done ? Date.now() : null,
    });
  },

  reset: () => set({
    problems: [],
    current: 0,
    marks: [],
    lastShownAt: Date.now(),
    sessionStart: null,
    sessionEnd: null,
  }),
}));
