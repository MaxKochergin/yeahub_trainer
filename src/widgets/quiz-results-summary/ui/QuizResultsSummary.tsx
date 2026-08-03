import { useAppSelector } from "@/app/store";
import { selectQuizResults } from "@/entities/quiz";
import { StatisticsCard } from "./StatisticsCard";
import { SkillsProgressCard } from "./SkillsProgressCard";
import style from "./QuizResultsSummary.module.scss";

export function QuizResultsSummary() {
  const { total, known, unknown, unanswered, percentLearned, skills } =
    useAppSelector(selectQuizResults);

  return (
    <section className={style.root}>
      <h1 className={style.title}>Умный режим изучения вопросов</h1>

      <div className={style.cards}>
        <StatisticsCard
          total={total}
          known={known}
          unknown={unknown}
          unanswered={unanswered}
          percentLearned={percentLearned}
        />
        <SkillsProgressCard skills={skills} />
      </div>

      <button type="button" className={style.statsLink}>
        Посмотреть статистику
        <span className={style.statsIcon} aria-hidden />
      </button>
    </section>
  );
}
