import { useAppSelector } from "@/app/store";
import { selectQuizQuestions, selectQuizAnswers } from "@/entities/quiz";
import { ResultQuestionCard } from "./ResultQuestionCard";
import style from "./QuizResultsList.module.scss";

export function QuizResultsList() {
  const questions = useAppSelector(selectQuizQuestions);
  const answers = useAppSelector(selectQuizAnswers);

  return (
    <section className={style.root}>
      <h2 className={style.title}>
        Список пройденных вопросов собеседования
      </h2>
      <ul className={style.grid}>
        {questions.map((question) => (
          <ResultQuestionCard
            key={question.id}
            question={question}
            answer={answers[question.id]}
          />
        ))}
      </ul>
    </section>
  );
}
