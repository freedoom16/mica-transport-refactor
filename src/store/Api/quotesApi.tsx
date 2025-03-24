import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

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

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

// Custom Axios Base Query
const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({
    url,
    method,
    data,
    params,
  }: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
    params?: any;
  }) => {
    try {
      const token = getToken();
      const response = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      return { data: response.data };
    } catch (error: any) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export const usersApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: axiosBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getQuotes: builder.query<User[] | any, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    addQuoets: builder.mutation<User | any, Partial<User> | any>({
      query: (newQuoets) => ({
        url: "/quotes",
        method: "POST",
        data: newQuoets,
      }),
      invalidatesTags: ["User"],
    }),
    getQuoetsByID: builder.query<User | any, string>({
      query: (userId) => ({
        url: `/bill-of-lading/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateQuoets: builder.mutation<
      User | any,
      { userId: string; data: Partial<User> }
    >({
      query: ({ userId, data }) => ({
        url: `/bill-of-lading/${userId}`,
        method: "PUT",
        data,
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
