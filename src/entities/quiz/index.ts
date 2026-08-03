export type {
  Quiz,
  Question,
  GetNewMockQuizParams,
  QuestionModeType,
} from "./model/types";
export { useLazyGetNewMockQuizQuery } from "./api/quizApi";
export {
  quizSessionReducer,
  setQuiz,
  setCurrentIndex,
  answerQuestion,
  resetQuiz,
} from "./model/quizSessionSlice";
export type { AnswerValue } from "./model/quizSessionSlice";
export {
  selectCurrentQuestion,
  selectQuizSession,
  selectQuizQuestions,
  selectCurrentIndex,
  selectQuizAnswers,
  selectQuizStatus,
  selectIsQuizEmpty,
  selectTotalQuestions,
  selectQuestionById,
  selectQuizResults,
} from "./model/selectors";
export {QuestionCard} from './ui/question-card/QuestionCard'
export { getQuizResults } from "./model/getQuizResults";
export type { QuizResults, SkillProgress } from "./model/getQuizResults";