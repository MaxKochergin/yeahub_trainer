import type { TrainerSettingFormState, FormValidationErrors } from "./type";
import {
  MODE_OPTIONS,
  QUESTION_COUNT_DEFAULT,
  QUESTION_COUNT_MIN,
  QUESTION_COUNT_MAX,
  COMPLEXITY_OPTIONS,
} from "./constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import type { QuestionModeType } from "@/entities/quiz/";
import { useGetSpecializationsQuery } from "@/entities/specialization";
import type { GetSpecializationsParams } from "@/entities/specialization";
import type { GetSkillsParams } from "@/entities/skill";
import { useGetSkillsQuery } from "@/entities/skill";
import { mapFormToApiParams } from "./mapFormToApiParams";
import { useLazyGetNewMockQuizQuery } from "@/entities/quiz";
import { useAppDispatch } from "@/app/store";
import { setQuiz } from "@/entities/quiz/";

export const useTrainerSettingsForm = () => {
  const [form, setForm] = useState<TrainerSettingFormState>({
    specializationId: null,
    skillIds: [],
    complexity: COMPLEXITY_OPTIONS[0].value,
    mode: MODE_OPTIONS[0].value,
    questionsCount: QUESTION_COUNT_DEFAULT,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<FormValidationErrors>({});
  const [startError, setStartError] = useState<string | null>(null);

  function validateForm(form: TrainerSettingFormState): FormValidationErrors {
    const errors: FormValidationErrors = {};
    if (form.specializationId === null) {
      errors.specialization = "не выбрана специализация";
    }
    if (form.skillIds.length < 1) {
      errors.skills = "не выбран навык";
    }
    return errors;
  }

  const specializationsParams: GetSpecializationsParams = {
    page: 1,
    limit: 10,
  };
  const skillsParams: GetSkillsParams = {
    specializations: form.specializationId
      ? [form.specializationId]
      : undefined,
    page: 1,
    limit: 10,
  };

  const {
    data: specializationsData,
    isLoading: isLoadingSpecializations,
    isError: isErrorSpecializations,
    refetch: refetchSpecializations,
  } = useGetSpecializationsQuery(specializationsParams);

  const specializations = specializationsData?.data ?? [];

  const {
    data: skillsData,
    isLoading: isLoadingSkills,
    isError: isErrorSkills,
    refetch: refetchSkills,
  } = useGetSkillsQuery(skillsParams, { skip: !form.specializationId });

  const skills = skillsData?.data ?? [];

  const [
    triggerGetQuiz,
    { isLoading: isStartingQuiz, isError: isStartQuizError },
  ] = useLazyGetNewMockQuizQuery();

  async function handleStart() {
    setStartError(null);
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const params = mapFormToApiParams(form);
    const result = await triggerGetQuiz(params);
    const quiz = result.data;
    if (result.error) return;
    if (!quiz?.questions?.length) {
       return setStartError('Вопросы не найдены. Измените настройки и попробуйте снова')
    }
    dispatch(setQuiz(quiz.questions));
    navigate(ROUTES.QUIZ);
  }

  function handleSelectSpecialization(id: number) {
    setForm((prev) => ({
      ...prev,
      specializationId: id,
      skillIds: [],
    }));
    setFormErrors((prev) => ({ ...prev, specialization: undefined }));
  }

  function handleToggleSkill(id: number) {
    setForm((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(id)
        ? prev.skillIds.filter((elem) => elem !== id)
        : [...prev.skillIds, id],
    }));
    setFormErrors((prev) => ({ ...prev, skills: undefined }));
  }

  function handleSelectComplexity(value: number[]) {
    setForm((prev) => ({
      ...prev,
      complexity: value,
    }));
  }
  function handleSelectMode(value: QuestionModeType) {
    setForm((prev) => ({
      ...prev,
      mode: value,
    }));
  }

  function handleChangeQuestionsCount(count: number) {
    setForm((prev) => ({
      ...prev,
      questionsCount:
        count >= QUESTION_COUNT_MIN && count <= QUESTION_COUNT_MAX
          ? count
          : prev.questionsCount,
    }));
  }

  return {
    form,
    formErrors,
    validateForm,
    handleStart,
    handleSelectSpecialization,
    handleToggleSkill,
    handleSelectComplexity,
    handleSelectMode,
    handleChangeQuestionsCount,
    specializations,
    skills,
    startError,
    isLoadingSpecializations,
    isErrorSpecializations,
    isLoadingSkills,
    isErrorSkills,
    isStartingQuiz,
    isStartQuizError,
    refetchSpecializations,
    refetchSkills,
  };
};
