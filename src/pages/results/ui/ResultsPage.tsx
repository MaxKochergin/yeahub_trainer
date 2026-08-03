import { useAppSelector } from "@/app/store";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { selectIsQuizEmpty } from "@/entities/quiz";
import { QuizResultsSummary } from "@/widgets/quiz-results-summary";
import { QuizResultsList } from "@/widgets/quiz-results-list";
import style from "./ResultsPage.module.scss";

export function ResultsPage() {
  const isQuizEmpty = useAppSelector(selectIsQuizEmpty);

  if (isQuizEmpty) {
    return <Navigate to={ROUTES.TRAINER_SETTINGS} replace />;
  }

  return (
    <div className={style.root}>
      <QuizResultsSummary />
      <QuizResultsList />
    </div>
  );
}
