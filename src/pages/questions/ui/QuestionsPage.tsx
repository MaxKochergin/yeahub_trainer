import { Navigate, useParams } from "react-router-dom";
import { selectQuestionById, selectIsQuizEmpty } from "@/entities/quiz";
import { useAppSelector } from "@/app/store";
import { ROUTES } from "@/shared/config/routes";
import { QuestionDetails } from "@/widgets";

export function QuestionsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const isValidId = Number.isFinite(id);
  const isQuizEmpty = useAppSelector(selectIsQuizEmpty);
  const question = useAppSelector((state) =>
    isValidId ? selectQuestionById(state, id) : undefined,
  );

  if (!isValidId || !question) {
    return (
      <Navigate
        to={isQuizEmpty ? ROUTES.TRAINER_SETTINGS : ROUTES.QUIZ}
        replace
      />
    );
  }

  return <QuestionDetails question={question}></QuestionDetails>;
}
