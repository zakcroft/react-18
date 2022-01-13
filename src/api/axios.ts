import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const pokemonApi = createApi({
  reducerPath: "pokemon",
  tagTypes: ["pokemon"],
  baseQuery: axiosBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemon: builder.query<any, string>({
      query: (id) => ({
        url: `pokemon/${id}`,
        method: "get",
      }),
      providesTags: [{ type: "pokemon" }],
    }),
    updatePokemon: builder.mutation({
      query: () => ({ url: "/mutation", method: "post" }),
    }),
  }),
});

console.log(pokemonApi);

export const {
  useGetPokemonQuery,
  util: { getRunningOperationPromise, getRunningOperationPromises },
} = pokemonApi;
