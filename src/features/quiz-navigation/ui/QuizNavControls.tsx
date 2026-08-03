import { useQuizNavigation } from "../model/useQuizNavigation";
import style from "./QuizNavigation.module.scss";
import chevronLeft from "@/shared/assets/chevrone_Left.svg";
import chevronRight from "@/shared/assets/chevrone_Right.svg";

export function QuizNavControls() {
  const { goPrev, goNext, canGoPrev } = useQuizNavigation();

  return (
    <div className={style.nav}>
      <button
        type="button"
        className={style.link}
        disabled={!canGoPrev}
        onClick={goPrev}
      >
        <img className={style.icon} src={chevronLeft} alt="" aria-hidden />
        Назад
      </button>

      <button type="button" className={style.link} onClick={goNext}>
        Далее
        <img className={style.icon} src={chevronRight} alt="" aria-hidden />
      </button>
    </div>
  );
}
