import { Link } from "react-router-dom";
import { getQuestionsPath } from "@/shared/config/routes";
import type { AnswerValue, Question } from "@/entities/quiz";
import { getAnswerLabel } from "../model/getAnswerLabel";
import style from "./ResultQuestionCard.module.scss";

type Props = {
  question: Question;
  answer?: AnswerValue;
};

export function ResultQuestionCard({ question, answer }: Props) {
  return (
    <li className={style.root}>
      <Link to={getQuestionsPath(question.id)} className={style.link}>
        {question.imageSrc ? (
          <img
            className={style.image}
            src={question.imageSrc}
            alt=""
            aria-hidden
          />
        ) : (
          <div className={style.imagePlaceholder} aria-hidden />
        )}

        <div className={style.content}>
          <p className={style.title}>{question.title}</p>
          <span
            className={[
              style.status,
              answer === "KNOWN" ? style.statusKnown : "",
              answer === "UNKNOWN" ? style.statusUnknown : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {answer === "KNOWN" ? (
              <span className={`${style.icon} ${style.iconUp}`} aria-hidden />
            ) : null}
            {answer === "UNKNOWN" ? (
              <span
                className={`${style.icon} ${style.iconDown}`}
                aria-hidden
              />
            ) : null}
            {getAnswerLabel(answer)}
          </span>
        </div>
      </Link>
    </li>
  );
}
