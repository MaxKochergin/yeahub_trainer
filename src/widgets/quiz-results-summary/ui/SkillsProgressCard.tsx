import type { SkillProgress } from "@/entities/quiz";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { StateMessage } from "@/shared/ui/state-message";
import style from "./SkillsProgressCard.module.scss";

type Props = {
  skills: SkillProgress[];
};

export function SkillsProgressCard({ skills }: Props) {
  return (
    <article className={style.root}>
      <h2 className={style.title}>Прогресс обучения по навыкам</h2>
      {skills.length === 0 ? (
        <StateMessage message="Нет данных по навыкам для этого прохождения" />
      ) : (
        <ul className={style.list}>
          {skills.map((skill) => (
            <li key={skill.id} className={style.row}>
              <div className={style.rowHeader}>
                <span className={style.skillTitle}>{skill.title}</span>
                <span className={style.skillValue}>
                  {skill.known}/{skill.total}
                </span>
              </div>
              <ProgressBar
                className={style.progressBar}
                value={skill.known}
                max={skill.total}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
