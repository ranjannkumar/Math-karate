export interface LevelSpec {
  id: number;
  label: string;
  maxSum: number;
}

export const DEFAULT_LEVELS: LevelSpec[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  label: `Level ${i + 1}`,
  maxSum: 5,
}));

const KEY = "math_karate_levels_v1";

export function loadLevels(): LevelSpec[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : DEFAULT_LEVELS;
  } catch { return DEFAULT_LEVELS; }
}

export function saveLevels(levels: LevelSpec[]) {
  localStorage.setItem(KEY, JSON.stringify(levels));
}
