import type { Problem } from "../types";

const shuffle = <T,>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

export function makeProblem(sumEquals = 5): Problem {
  const a = Math.floor(Math.random() * (sumEquals + 1));
  const b = sumEquals - a;
  const correct = a + b;

  const pool = new Set<number>([correct]);
  while (pool.size < 4) {
    const n = Math.max(0, correct + Math.floor(Math.random() * 7) - 3);
    pool.add(n);
  }
  const choices = shuffle([...pool]);
  return { a, b, sum: sumEquals, choices, correct };
}

export function makeSet(count = 10, sumEquals = 5): Problem[] {
  return Array.from({ length: count }, () => makeProblem(sumEquals));
}
