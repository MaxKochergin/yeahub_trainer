import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/shared/api";
import { quizSessionReducer } from "@/entities/quiz";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    quizSession: quizSessionReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
