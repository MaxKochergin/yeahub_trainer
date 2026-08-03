import type { ReactNode } from "react";
import style from "./QuestionCard.module.scss";

type Props = {
  title: string;
  imageSrc?: string;
  children?: ReactNode;
};

export function QuestionCard({ title, imageSrc, children }: Props) {
  return (
    <article className={style.root}>
      <div className={style.content}>
        <div className={style.main}>
          <div className={style.titleRow}>
            <span className={style.marker} aria-hidden />
            <h2 className={style.title}>{title}</h2>
          </div>
          {children ? <div className={style.actions}>{children}</div> : null}
        </div>

        {imageSrc ? (
          <img className={style.image} src={imageSrc} alt={title} />
        ) : null}
      </div>
    </article>
  );
}
