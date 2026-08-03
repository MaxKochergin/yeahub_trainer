import { baseApi } from "@/shared/api";
import type { GetSkillsParams, GetSkillsResponse } from "../model/types";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<GetSkillsResponse, GetSkillsParams>({
      query: (params) => ({
        url: "/skills",
        params,
      }),
    }),
  }),
});

export const { useGetSkillsQuery } = skillApi;
