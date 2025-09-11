export type Belt =
  | "white" | "yellow" | "green" | "blue" | "red" | "brown"
  | "black1" | "black2" | "black3" | "black4" | "black5" | "black6" | "black7";

export interface BeltRule {
  items: number;
  timeSec: number;
}

export const BELT_RULES: Record<Belt, BeltRule> = {
  white:  { items: 10, timeSec: 30 },
  yellow: { items: 10, timeSec: 30 },
  green:  { items: 10, timeSec: 30 },
  blue:   { items: 10, timeSec: 30 },
  red:    { items: 10, timeSec: 30 },
  brown:  { items: 10, timeSec: 30 },
  black1: { items: 20, timeSec: 60 },
  black2: { items: 20, timeSec: 55 },
  black3: { items: 20, timeSec: 50 },
  black4: { items: 20, timeSec: 45 },
  black5: { items: 20, timeSec: 40 },
  black6: { items: 20, timeSec: 35 },
  black7: { items: 20, timeSec: 30 },
};
