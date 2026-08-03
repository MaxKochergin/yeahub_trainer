import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { PageLayout } from "@/widgets";
import {
  HomePage,
  TrainerSettingsPage,
  QuizPage,
  QuestionsPage,
  ResultsPage,
} from "./lazyPages";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.TRAINER_SETTINGS, element: <TrainerSettingsPage /> },
      { path: ROUTES.QUIZ, element: <QuizPage /> },
      { path: ROUTES.QUESTIONS, element: <QuestionsPage /> },
      { path: ROUTES.RESULTS, element: <ResultsPage /> },
    ],
  },
]);
