import style from "./AnswerQuestionButton.module.scss";
import { useAnswerQuestion } from "../model/useAnswerQuestion";

export function AnswerQuestionButton() {
  const { currentAnswer, handleAnswer, disabled } = useAnswerQuestion();

  return (
    <section className={style.root}>
      <button
        type="button"
        className={[
          style.button,
          currentAnswer === "UNKNOWN" ? style.selected : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => handleAnswer("UNKNOWN")}
        disabled={disabled}
        aria-label="Не знаю"
      >
        <span className={`${style.icon} ${style.iconDown}`} aria-hidden />
        <span className={style.label}>Не знаю</span>
      </button>

      <button
        type="button"
        className={[
          style.button,
          currentAnswer === "KNOWN" ? style.selected : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => handleAnswer("KNOWN")}
        disabled={disabled}
        aria-label="Знаю"
      >
        <span className={`${style.icon} ${style.iconUp}`} aria-hidden />
        <span className={style.label}>Знаю</span>
      </button>
    </section>
  );
}
