export type QuestionAnswerType = "KNOWN" | "UNKNOWN" | "REPEAT";

export type QuestionModeType = "REPEAT" | "NEW" | "RANDOM";

export interface UserReference {
  id: string;
  username: string;
}

export interface GetNewMockQuizParams {
  specialization: number;
  skills?: string[];
  complexity?: number[];
  collection?: number;
  limit?: number;
}

export interface QuestionAnswer {
  questionId: number;
  questionTitle: string;
  answer?: QuestionAnswerType;
}

export interface QuizResponse {
  answers: QuestionAnswer[];
}

export interface QuestionSkill {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageSrc?: string;
}

export interface QuestionSpecialization {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  slug?: string;
  imageSrc?: string;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  createdById: string;
  questionSpecializations: QuestionSpecialization[];
  questionSkills: QuestionSkill[];
  createdAt: string;
  updatedAt: string;
  createdBy: UserReference;
  slug?: string;
  code?: string;
  imageSrc?: string;
  keywords?: string[];
  shortAnswer?: string;
  longAnswer?: string;
  status?: "public" | "draft";
  rate?: number;
  complexity?: number;
  updatedById?: string;
  updatedBy?: UserReference;
}

export interface Quiz {
  id: string;
  startDate: string;
  fullCount?: number;
  skills?: string[];
  response?: QuizResponse;
  questions?: Question[];
}

export type GetNewMockQuizResponse = Quiz;
