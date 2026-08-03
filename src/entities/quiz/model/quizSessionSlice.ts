import { createSlice } from "@reduxjs/toolkit";
import type { Question } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AnswerValue = "KNOWN" | "UNKNOWN";

export type QuizSessionState = {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, AnswerValue>;
  status: "idle" | "active" | "completed";
};

type AnswerQuestionPayload = {
  questionId: number;
  answer: AnswerValue;
};

const initialState: QuizSessionState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  status: "idle",
};

const quizSession = createSlice({
  name: "quizSession",
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.currentIndex = 0;
      state.answers = {};
      state.status = "active";
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },

    answerQuestion: (state, action: PayloadAction<AnswerQuestionPayload>) => {
      const { answer, questionId } = action.payload;
      state.answers[questionId] = answer;
    },
    resetQuiz: () => initialState,
  },
});

export const { setQuiz, setCurrentIndex, answerQuestion, resetQuiz } =
  quizSession.actions;

export const quizSessionReducer = quizSession.reducer;
