import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PaginationOptions {
  page: number;
  limit: number;
}

interface User {
  userId: string;
  pickup: string;
  delivery: string;
  shipDate: string;
  vehicleYear: number;
  vehicleMake: string;
  vehicleModel: string;
  transportType: string;
  status: string;
}

const getToken = (): string | null => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem("token")
    : "";
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    const token = getToken();
    // headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery,
  endpoints: (builder) => ({
    getQuotes: builder.query<User[] | any, void>({
      query: () => "/user",
      providesTags: ["User"],
    }),
    addQuoets: builder.mutation<User | any, Partial<User> | any>({
      query: (newQuoets) => ({
        url: "/quotes", // Adjust based on your API
        method: "POST",
        body: newQuoets,
      }),
      invalidatesTags: ["User"],
    }),
    getQuoetsByID: builder.query<User | any, string>({
      query: (userId) => `/bill-of-lading/${userId}`, // Adjust the URL if necessary
      providesTags: ["User"],
    }),
    updateQuoets: builder.mutation<
      User | any,
      { userId: string; data: Partial<User> }
    >({
      query: ({ userId, data }) => ({
        url: `/bill-of-lading/${userId}`, // Adjust the URL if necessary
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useGetQuoetsByIDQuery,
  useUpdateQuoetsMutation,
  useAddQuoetsMutation,
} = usersApi;
