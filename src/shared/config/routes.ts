export const ROUTES = {
  HOME: "/",
  TRAINER_SETTINGS: "/trainer",
  QUIZ: "/quiz",
  QUESTIONS: "/questions/:id",
  RESULTS: "/results",
} as const;

export const getQuestionsPath = (id: number | string) => `/questions/${id}`;
