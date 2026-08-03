import type { Question } from "./types";
import type { QuizSessionState } from "./quizSessionSlice";
import { getQuizResults } from "./getQuizResults";

type RootPick = {
  quizSession: QuizSessionState;
};

export const selectQuizSession = (state: RootPick) => {
  return state.quizSession;
};

export const selectQuizQuestions = (state: RootPick) => {
  return state.quizSession.questions;
};

export const selectCurrentIndex = (state: RootPick) => {
  return state.quizSession.currentIndex;
};

export const selectQuizAnswers = (state: RootPick) => {
  return state.quizSession.answers;
};
export const selectQuizStatus = (state: RootPick) => {
  return state.quizSession.status;
};

export const selectIsQuizEmpty = (state: RootPick) => {
  return state.quizSession.questions.length === 0;
};
export const selectTotalQuestions = (state: RootPick) => {
  return state.quizSession.questions.length;
};
export const selectCurrentQuestion = (
  state: RootPick,
): Question | undefined => {
  return state.quizSession.questions[state.quizSession.currentIndex];
};

export const selectQuestionById = (
  state:RootPick,
  id:number,
):Question|undefined=>{
  return state.quizSession.questions.find((question)=>{
     return question.id === id;
  })
}

export const selectQuizResults = (state: RootPick) => {
  return getQuizResults(state.quizSession.questions, state.quizSession.answers);
};
