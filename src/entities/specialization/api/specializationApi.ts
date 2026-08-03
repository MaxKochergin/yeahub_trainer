import type {
  GetSpecializationsParams,
  GetSpecializationsResponse,
} from "../model/types";
import { baseApi } from "@/shared/api";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<
      GetSpecializationsResponse,
      GetSpecializationsParams
    >({
      query: (params) => ({
        url: "/specializations",
        params: params,
      }),
    }),
  }),
});

export const { useGetSpecializationsQuery } = specializationApi;
