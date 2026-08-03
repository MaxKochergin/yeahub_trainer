import { useTrainerSettingsForm } from "../model/useTrainerSettingsForm";
import style from "./TrainerSettingsForm.module.scss";
import { Tag } from "@/shared/ui/tag";
import { Skeleton } from "@/shared/ui/skeleton";
import { Stepper } from "@/shared/ui/stepper";
import { Button } from "@/shared/ui/button";
import { StateMessage } from "@/shared/ui/state-message";
import {
  COMPLEXITY_OPTIONS,
  MODE_OPTIONS,
  QUESTION_COUNT_MIN,
  QUESTION_COUNT_MAX,
} from "../model/constants";
import { arraysEqual } from "@/shared/lib";
import arrow from "@/shared/assets/ArrowRight.svg";

export function TrainerSettingsForm() {
  const {
    form,
    specializations,
    isLoadingSpecializations,
    isErrorSpecializations,
    handleSelectSpecialization,
    isLoadingSkills,
    isErrorSkills,
    skills,
    startError,
    handleToggleSkill,
    handleSelectComplexity,
    handleSelectMode,
    handleChangeQuestionsCount,
    handleStart,
    formErrors,
    isStartingQuiz,
    isStartQuizError,
    refetchSpecializations,
    refetchSkills,
  } = useTrainerSettingsForm();

  const showSpecializationsEmpty =
    !isLoadingSpecializations &&
    !isErrorSpecializations &&
    specializations.length === 0;

  const showSkillsEmpty =
    Boolean(form.specializationId) &&
    !isLoadingSkills &&
    !isErrorSkills &&
    skills.length === 0;

  return (
    <form
      className={style.root}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className={style.title}>Собеседование</h1>
      <div className={style.columns}>
        <div className={style.left}>
          <section className={style.section}>
            <h2 className={style.sectionTitle}>Выбор специализации</h2>
            <div className={style.list}>
              {isLoadingSpecializations &&
                Array.from({ length: 6 }, (_, i) => (
                  <Skeleton
                    key={i}
                    height={42}
                    width={60 + (i % 3) * 30}
                  />
                ))}
              {isErrorSpecializations && (
                <StateMessage
                  message="Не удается загрузить специализации"
                  actionLabel="Повторить"
                  onAction={() => refetchSpecializations()}
                />
              )}
              {showSpecializationsEmpty && (
                <StateMessage message="Специализации не найдены. Попробуйте позже" />
              )}
              {!isLoadingSpecializations &&
                !isErrorSpecializations &&
                specializations.map((item) => (
                  <Tag
                    key={item.id}
                    selected={form.specializationId === item.id}
                    onClick={() => handleSelectSpecialization(item.id)}
                  >
                    {item.title}
                  </Tag>
                ))}
            </div>
            {formErrors.specialization && (
              <p className={style.error}>{formErrors.specialization}</p>
            )}
          </section>
          <section className={style.section}>
            <h2 className={style.sectionTitle}>Категории вопросов</h2>
            <div className={style.list}>
              {!form.specializationId && (
                <StateMessage message="Сначала выберите специализацию" />
              )}
              {isLoadingSkills &&
                Array.from({ length: 15 }, (_, i) => (
                  <Skeleton
                    key={i}
                    height={42}
                    width={60 + (i % 3) * 30}
                  />
                ))}
              {isErrorSkills && (
                <StateMessage
                  message="Не удается загрузить навыки"
                  actionLabel="Повторить"
                  onAction={() => refetchSkills()}
                />
              )}
              {showSkillsEmpty && (
                <StateMessage message="Для выбранной специализации навыки не найдены" />
              )}
              {!isLoadingSkills &&
                !isErrorSkills &&
                skills.map((item) => (
                  <Tag
                    key={item.id}
                    selected={form.skillIds.includes(item.id)}
                    onClick={() => handleToggleSkill(item.id)}
                  >
                    {item.title}
                  </Tag>
                ))}
            </div>
            {formErrors.skills && (
              <p className={style.error}>{formErrors.skills}</p>
            )}
          </section>
        </div>
        <div className={style.right}>
          <section className={style.section}>
            <h2 className={style.sectionTitle}>Уровень сложности</h2>
            <div className={style.list}>
              {COMPLEXITY_OPTIONS.map((item) => (
                <Tag
                  key={item.label}
                  selected={arraysEqual(form.complexity, item.value)}
                  onClick={() => handleSelectComplexity(item.value)}
                >
                  {item.label}
                </Tag>
              ))}
            </div>
          </section>
          <section className={style.section}>
            <h2 className={style.sectionTitle}>Выберите режим</h2>
            <div className={style.list}>
              {MODE_OPTIONS.map((item) => (
                <Tag
                  key={item.label}
                  selected={form.mode === item.value}
                  onClick={() => handleSelectMode(item.value)}
                >
                  {item.label}
                </Tag>
              ))}
            </div>
          </section>
          <section className={style.section}>
            <h2 className={style.sectionTitle}>Количество вопросов</h2>
            <Stepper
              min={QUESTION_COUNT_MIN}
              value={form.questionsCount}
              max={QUESTION_COUNT_MAX}
              onChange={handleChangeQuestionsCount}
            />
          </section>
        </div>
      </div>
      <div className={style.actions}>
        <Button
          onClick={handleStart}
          disabled={isStartingQuiz}
          className={style.button}
        >
          Начать <img src={arrow} alt="" />
        </Button>
        {isStartQuizError && (
          <p className={style.error}>
            Не удалось начать тренировку. Попробуйте ещё раз
          </p>
        )}
        {startError && <p className={style.error}>{startError}</p>}
      </div>
    </form>
  );
}
