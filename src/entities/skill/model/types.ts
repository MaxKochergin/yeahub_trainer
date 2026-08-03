export interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  createdAt: string;
  updatedAt: string;
  specializations: SkillSpecializations[];
  createdBy?: UserReference;
}
export interface GetSkillsResponse {
  page?: number;
  limit?: number;
  total: number;
  data: Skill[];
}

export interface GetSkillsParams {
  page?: number;
  limit?: number;
  specializations?: number[];
  authorId?: string;
  title?: string;
}

export interface UserReference {
  id: string;
  username: string;
}

export interface SkillSpecializations {
  id: number;
  title: string;
}
