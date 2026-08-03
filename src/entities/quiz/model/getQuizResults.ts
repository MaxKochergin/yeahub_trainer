import type { AnswerValue } from "./quizSessionSlice";
import type { Question } from "./types";

export type SkillProgress = {
  id: number;
  title: string;
  known: number;
  total: number;
};

export type QuizResults = {
  total: number;
  known: number;
  unknown: number;
  unanswered: number;
  percentLearned: number;
  skills: Array<SkillProgress>;
};

export const getQuizResults = (
  questions: Question[],
  answers: Record<number, AnswerValue>,
): QuizResults => {
  const total = questions.length;
  const known = questions.filter((q) => {
    return answers[q.id] === "KNOWN";
  }).length;
  const unknown = questions.filter((q) => {
    return answers[q.id] === "UNKNOWN";
  }).length;

  const percentLearned = total === 0 ? 0 : Math.round((known / total) * 100);
  const skillsMap = new Map<number, SkillProgress>();

  for (const question of questions) {
    const isKnown = answers[question.id] === "KNOWN";
    for (const skill of question.questionSkills) {
      let entry = skillsMap.get(skill.id);
      if (!entry) {
        entry = { id: skill.id, title: skill.title, known: 0, total: 0 };
        skillsMap.set(skill.id, entry);
      }
      entry.total += 1;
      if (isKnown) {
        entry.known += 1;
      }
    }
  }
  const skills = Array.from(skillsMap.values());
  const unanswered = total - known - unknown;

  return {
    total,
    known,
    unknown,
    unanswered,
    percentLearned,
    skills,
  };
};
