import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectQuizAnswers, selectCurrentQuestion } from "@/entities/quiz";
import { answerQuestion } from "@/entities/quiz";
import type { AnswerValue } from "@/entities/quiz/model/quizSessionSlice";

export const useAnswerQuestion = () => {
  const answers = useAppSelector(selectQuizAnswers);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const dispatch = useAppDispatch();

  function handleAnswer(answer: AnswerValue) {
    if (currentQuestion) {
      dispatch(answerQuestion({ answer, questionId: currentQuestion.id }));
    }
  }
  return {
    currentAnswer,
    handleAnswer,
    disabled: !currentQuestion,
  };
};
