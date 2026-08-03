import type { AnswerValue } from "@/entities/quiz";

export const getAnswerLabel = (answer?: AnswerValue) => {
  if (answer === "KNOWN") return "Знаю";
  if (answer === "UNKNOWN") return "Не знаю";
  return "Без ответа";
};
