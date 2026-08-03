import {
  selectCurrentIndex,
  selectTotalQuestions,
  selectCurrentQuestion,
} from "@/entities/quiz";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { setCurrentIndex } from "@/entities/quiz";
import { ROUTES, getQuestionsPath } from "@/shared/config/routes";

export const useQuizNavigation = () => {
  const index = useAppSelector(selectCurrentIndex);
  const totalQuestions = useAppSelector(selectTotalQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const canGoPrev = index > 0;
  const isLast = index >= totalQuestions - 1;

  function goPrev() {
    if (canGoPrev) {
      dispatch(setCurrentIndex(index - 1));
    }
  }

  function goNext() {
    if (isLast) {
      navigate(ROUTES.RESULTS);
    } else {
      dispatch(setCurrentIndex(index + 1));
    }
  }
  function finish() {
    navigate(ROUTES.RESULTS);
  }
  function viewAnswer() {
    if (currentQuestion) {
      navigate(getQuestionsPath(currentQuestion.id));
    }
  }

  return { goPrev, goNext, finish, viewAnswer, canGoPrev, isLast };
};
