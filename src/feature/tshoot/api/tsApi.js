import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tsApi = createApi({
  reducerPath: "tsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.16:5000" }),
  endpoints: (builder) => ({
    getTS: builder.query({ query: () => "/tshoot" }),
  }),
});

export const { useGetTSQuery } = tsApi;
