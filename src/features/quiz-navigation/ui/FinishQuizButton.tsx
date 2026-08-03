import { useQuizNavigation } from "../model/useQuizNavigation";
import style from "./QuizNavigation.module.scss";

export function FinishQuizButton() {
  const { finish } = useQuizNavigation();

  return (
    <div className={style.footer}>
      <button type="button" className={style.finish} onClick={finish}>
        Завершить
      </button>
    </div>
  );
}
