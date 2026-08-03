export interface Specialization {
  id: number;
  title: string;
  slug?: string;
  description: string;
  imageSrc?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: UserReference;
}

export interface UserReference {
  id: string;
  username: string;
}

export interface GetSpecializationsParams {
  page?: number;
  limit?: number;
  authorId?: string;
  title?: string;
}

export interface GetSpecializationsResponse {
  total: number;
  page?: number;
  limit?: number;
  data: Specialization[];
}
