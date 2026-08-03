import {
  selectCurrentIndex,
  selectTotalQuestions,
  selectCurrentQuestion,
} from "@/entities/quiz";
import { useAppSelector } from "@/app/store";
import {
  QuizNavControls,
  ViewAnswerButton,
  FinishQuizButton,
} from "@/features/quiz-navigation";
import { AnswerQuestionButton } from "@/features/answer-question";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { QuestionCard } from "@/entities/quiz";
import style from "./QuizPanel.module.scss";

export function QuizPanel() {
  const index = useAppSelector(selectCurrentIndex);
  const total = useAppSelector(selectTotalQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className={style.root}>
      <section className={style.progressCard}>
        <h1 className={style.progressTitle}>Вопросы собеседования</h1>
        <div className={style.progressBody}>
          <ProgressBar
            className={style.progressBar}
            value={index + 1}
            max={total}
          />
          <span className={style.progressCount}>
            {index + 1} из {total}
          </span>
        </div>
      </section>

      <section className={style.quizCard}>
        <QuizNavControls />

        <QuestionCard
          title={currentQuestion.title}
          imageSrc={currentQuestion.imageSrc}
        >
          <ViewAnswerButton />
          <AnswerQuestionButton />
        </QuestionCard>

        <FinishQuizButton />
      </section>
    </div>
  );
}
