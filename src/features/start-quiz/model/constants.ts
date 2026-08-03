import type { QuestionModeType } from "@/entities/quiz/";

export const COMPLEXITY_OPTIONS = [
  { label: "1–3", value: [1, 2, 3] },
  { label: "4–6", value: [4, 5, 6] },
  { label: "7–8", value: [7, 8] },
  { label: "9–10", value: [9, 10] },
];

export const QUESTION_COUNT_MIN = 1;
export const QUESTION_COUNT_MAX = 50;
export const QUESTION_COUNT_DEFAULT = 35;

export const MODE_OPTIONS: { label: string; value: QuestionModeType }[] = [
  { label: "Повторение", value: "REPEAT" },
  { label: "Только новые", value: "NEW" },
  { label: "Случайные", value: "RANDOM" },
];

export const MODE_TO_COLLECTION: Record<QuestionModeType, number> = {
  REPEAT: 1,
  NEW: 2,
  RANDOM: 3,
};
