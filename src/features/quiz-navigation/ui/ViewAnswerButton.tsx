import { useQuizNavigation } from "../model/useQuizNavigation";
import style from "./QuizNavigation.module.scss";

export function ViewAnswerButton() {
  const { viewAnswer } = useQuizNavigation();

  return (
    <button type="button" className={style.viewAnswer} onClick={viewAnswer}>
      Посмотреть ответ
    </button>
  );
}
