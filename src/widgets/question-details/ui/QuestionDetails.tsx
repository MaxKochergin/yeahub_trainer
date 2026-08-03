import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Question } from "@/entities/quiz";
import { ROUTES } from "@/shared/config/routes";
import chevronLeft from "@/shared/assets/chevrone_Left.svg";
import chevronDown from "@/shared/assets/chevron_Down.svg";
import style from "./QuestionDetails.module.scss";

type Props = {
  question: Question;
};

export function QuestionDetails({ question }: Props) {
  const navigate = useNavigate();
  const [isLongAnswerOpen, setIsLongAnswerOpen] = useState(false);
  const questionIcon = question.imageSrc;

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(ROUTES.QUIZ);
  }

  function formatKeyword(keyword: string) {
    return keyword.startsWith("#") ? keyword : `#${keyword}`;
  }

  return (
    <div className={style.root}>
      <button type="button" className={style.back} onClick={handleBack}>
        <img className={style.backIcon} src={chevronLeft} alt="" />
        Назад
      </button>

      <div className={style.layout}>
        <div className={style.main}>
          <header className={`${style.card} ${style.header}`}>
            {questionIcon ? (
              <div className={style.imageWrap}>
                <img className={style.image} src={questionIcon} alt="" />
              </div>
            ) : null}
            <div className={style.headerText}>
              <h1 className={style.title}>{question.title}</h1>
              {question.description ? (
                <p className={style.description}>{question.description}</p>
              ) : null}
            </div>
          </header>

          <section className={`${style.card} ${style.section}`}>
            <h2 className={style.answerTitle}>Краткий ответ</h2>
            <p className={style.sectionText}>{question.shortAnswer ?? "—"}</p>
          </section>

          <section className={`${style.card} ${style.longAnswer}`}>
            <h2 className={style.answerTitle}>Развёрнутый ответ</h2>
            <div
              className={
                isLongAnswerOpen
                  ? style.longAnswerBody
                  : `${style.longAnswerBody} ${style.longAnswerBodyCollapsed}`
              }
            >
              <p className={style.sectionText}>{question.longAnswer ?? "—"}</p>
              {!isLongAnswerOpen ? (
                <div className={style.longAnswerFade} aria-hidden />
              ) : null}
            </div>
            <button
              type="button"
              className={style.expand}
              aria-expanded={isLongAnswerOpen}
              onClick={() => setIsLongAnswerOpen((prev) => !prev)}
            >
              {isLongAnswerOpen ? "Свернуть" : "Развернуть"}
              <img
                className={
                  isLongAnswerOpen
                    ? `${style.expandIcon} ${style.expandIconOpen}`
                    : style.expandIcon
                }
                src={chevronDown}
                alt=""
              />
            </button>
          </section>
        </div>

        <aside className={`${style.card} ${style.aside}`}>
          <section className={style.metaBlock}>
            <p className={style.metaLabel}>Уровень:</p>
            <div className={style.levelRow}>
              <div className={style.levelPill}>
                <span className={style.levelPillLabel}>Сложность:</span>
                <span className={style.levelBadge}>
                  {question.complexity ?? "—"}
                </span>
              </div>
              <div className={style.levelPill}>
                <span className={style.levelPillLabel}>Рейтинг:</span>
                <span className={style.levelBadge}>{question.rate ?? "—"}</span>
              </div>
            </div>
          </section>

          <section className={style.metaBlock}>
            <p className={style.metaLabel}>Навыки:</p>
            {question.questionSkills.length > 0 ? (
              <ul className={style.skills}>
                {question.questionSkills.map((skill) => (
                  <li key={skill.id} className={style.skill}>
                    {skill.imageSrc ? (
                      <img
                        className={style.skillIcon}
                        src={skill.imageSrc}
                        alt=""
                      />
                    ) : null}
                    <span>{skill.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={style.metaEmpty}>—</p>
            )}
          </section>

          <section className={style.metaBlock}>
            <p className={style.metaLabel}>Ключевые слова:</p>
            {question.keywords && question.keywords.length > 0 ? (
              <ul className={style.keywords}>
                {question.keywords.map((keyword) => (
                  <li key={keyword} className={style.keyword}>
                    {formatKeyword(keyword)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={style.metaEmpty}>—</p>
            )}
          </section>

          <section className={style.author}>
            <span className={style.authorLabel}>Автор: </span>
            <span className={style.authorName}>
              {question.createdBy?.username ?? "—"}
            </span>
          </section>
        </aside>
      </div>
    </div>
  );
}
