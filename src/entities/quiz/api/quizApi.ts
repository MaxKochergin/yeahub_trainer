import { baseApi } from "@/shared/api";
import type { GetNewMockQuizParams, GetNewMockQuizResponse } from "../model/types";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewMockQuiz: builder.query<GetNewMockQuizResponse, GetNewMockQuizParams>(
      {
        query: (params) => ({
          url: "/interview-preparation/quizzes/mock/new",
          params
        }),
      },
    ),
  }),
});

export const {useLazyGetNewMockQuizQuery} = quizApi;
