import { lazy } from "react";

export const HomePage = lazy(() => {
  return import("@/pages/home").then((module) => ({
    default: module.HomePage,
  }));
});

export const TrainerSettingsPage = lazy(() => {
  return import("@/pages/trainer-settings").then((module) => ({
    default: module.TrainerSettingsPage,
  }));
});

export const QuizPage = lazy(() =>
  import("@/pages/quiz").then((m) => ({ default: m.QuizPage })),
);

export const QuestionsPage = lazy(() =>
  import("@/pages/questions").then((m) => ({ default: m.QuestionsPage })),
);

export const ResultsPage = lazy(() =>
  import("@/pages/results").then((m) => ({ default: m.ResultsPage })),
);
