import { create } from "zustand";
import type { Problem, AnswerMark } from "../types";
import { makeSet } from "../utils/generator";
import { BELT_RULES } from "../utils/belts";
import type { Belt } from "../utils/belts";

interface State {
  problems: Problem[];
  current: number;
  marks: AnswerMark[];
  lastShownAt: number;
  sessionStart: number | null;
  sessionEnd: number | null;
  level: number;
  belt: Belt;
  passed: boolean | null;

  startBelt: (level: number, belt: Belt, maxSum?: number) => void;
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
  level: 1,
  belt: "white",
  passed: null,

  startBelt: (level, belt, maxSum = 5) => {
    const rule = BELT_RULES[belt];
    set({
      level, belt, passed: null,
      problems: makeSet(rule.items, maxSum),
      current: 0, marks: [],
      lastShownAt: Date.now(),
      sessionStart: Date.now(),
      sessionEnd: null,
    });
  },

  answer: (choice: number) => {
    const { problems, current, marks, lastShownAt, sessionStart, belt } = get();
    const p = problems[current];
    const elapsed = performance.now() - lastShownAt;
    const correct = choice === p.correct;

    let mark: AnswerMark = "wrong";
    if (correct) mark = elapsed < 1000 ? "fast" : "slow";

    const next = current + 1;
    const done = next >= problems.length;

    const baseUpdate: any = {
      marks: [...marks, mark],
      current: next,
      lastShownAt: Date.now(),
    };

    if (done) {
      const end = Date.now();
      const elapsedSec = (end - (sessionStart ?? end)) / 1000;
      const rule = BELT_RULES[belt];
      const correctCount = [...marks, mark].filter(m => m !== "wrong").length;

      baseUpdate.sessionEnd = end;
      baseUpdate.passed = correctCount >= rule.items && elapsedSec < rule.timeSec;
    }

    set(baseUpdate);
  },

  reset: () => set({
    problems: [],
    current: 0,
    marks: [],
    lastShownAt: Date.now(),
    sessionStart: null,
    sessionEnd: null,
    passed: null,
  }),
}));
