import type { TrainerSettingFormState } from "./type";
import type { GetNewMockQuizParams } from "@/entities/quiz";
// import { MODE_TO_COLLECTION } from "./constants";

export function mapFormToApiParams(
  form: TrainerSettingFormState,
): GetNewMockQuizParams {
  const quizParams = {
    specialization: form.specializationId!,
    skills: form.skillIds.map(String),
    complexity: form.complexity,
    limit: form.questionsCount,
    // collection: MODE_TO_COLLECTION[form.mode],
  };
  return quizParams;
}
