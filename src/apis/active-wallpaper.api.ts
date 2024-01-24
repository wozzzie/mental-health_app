import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ImageData } from "@/types/types";
import serverURL from "@/constants/serverURL";

type ChangeActiveWallpaperArgs = {
  uid: string;
  imageId: string;
};

interface PostResponse {
  message?: string;
  error?: string;
}

interface PostRequest {
  userId: string;
  imageId: string;
}

export const activeWallpaperApi = createApi({
  reducerPath: "activeWallpaperApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverURL + "/api/wallpaper" }),
  tagTypes: ["wallpaper"],
  endpoints: (builder) => ({
    getActiveWallpaper: builder.query<ImageData[], string>({
      query: (uid: string) => `?userId=${uid}`,
      providesTags: ["wallpaper"],
    }),
    changeActiveWallpaper: builder.mutation<PostResponse, PostRequest>({
      query: (body) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["wallpaper"],
    }),
  }),
});

export const { useGetActiveWallpaperQuery, useChangeActiveWallpaperMutation } =
  activeWallpaperApi;
