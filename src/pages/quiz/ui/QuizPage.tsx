import { selectIsQuizEmpty, selectCurrentQuestion } from "@/entities/quiz";
import { useAppSelector } from "@/app/store";
import { ROUTES } from "@/shared/config/routes";
import { Navigate } from "react-router-dom";
import { QuizPanel } from "@/widgets/quiz-panel";

export function QuizPage() {
  const isQuizEmpty = useAppSelector(selectIsQuizEmpty);
  const currentQuestion = useAppSelector(selectCurrentQuestion);

  if (isQuizEmpty || !currentQuestion) {
    return <Navigate to={ROUTES.TRAINER_SETTINGS} replace />;
  }

  return <QuizPanel />;
}
