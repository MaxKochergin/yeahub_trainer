import { Donut } from "@/shared/ui/donut";
import style from "./StatisticsCard.module.scss";

type Props = {
  total: number;
  known: number;
  unknown: number;
  unanswered: number;
  percentLearned: number;
};

export function StatisticsCard({
  total,
  known,
  unknown,
  unanswered,
  percentLearned,
}: Props) {
  return (
    <article className={style.root}>
      <h2 className={style.title}>Статистика пройденных вопросов</h2>
      <Donut percent={percentLearned} label="Изучено" />
      <ul className={style.stats}>
        <li className={style.stat}>
          <span className={style.statLabel}>Всего</span>
          <span className={style.statValue}>{total}</span>
        </li>
        <li className={style.stat}>
          <span className={style.statLabel}>Новые</span>
          <span className={style.statValue}>{unanswered}</span>
        </li>
        <li className={style.stat}>
          <span className={style.statLabel}>В процессе</span>
          <span className={style.statValue}>{unknown}</span>
        </li>
        <li className={style.stat}>
          <span className={style.statLabel}>Изучено</span>
          <span className={style.statValue}>{known}</span>
        </li>
      </ul>
    </article>
  );
}
