import type { QuestionModeType } from "@/entities/quiz/";

export interface TrainerSettingFormState {
  specializationId: number | null;
  skillIds: number[];
  complexity: number[];
  mode: QuestionModeType;
  questionsCount: number;
}

export interface FormValidationErrors {
  specialization?: string;
  skills?: string;
}
