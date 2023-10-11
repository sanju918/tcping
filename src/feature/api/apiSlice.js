import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://192.168.1.16:5000` }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `/todos`,
      providesTags: ["Todo"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        // body: id,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
