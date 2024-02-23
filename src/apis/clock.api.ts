import serverURL from "@/constants/serverURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetSettingsResponse = {
  use24HourFormat: boolean;
  showSeconds: boolean;
};

type successClockResponse = {
  clockSettings: GetSettingsResponse;
};

type MessageResponse = {
  message: string;
};

type SetSettingsArgs = {
  uid: string;
} & GetSettingsResponse;
export const clockApi = createApi({
  reducerPath: "clockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + "/api/clock",
  }),
  tagTypes: ["clock-settings"],
  endpoints: (builder) => ({
    getSettings: builder.query<GetSettingsResponse, string>({
      query: (uid) => ({
        url: `/get-settings?uid=${uid}`,
      }),
      providesTags: ["clock-settings"],
      transformResponse: (res: any) => {
        return (res?.clockSettings as GetSettingsResponse[])[0];
      },
    }),
    setSettings: builder.mutation<MessageResponse, SetSettingsArgs>({
      invalidatesTags: ["clock-settings"],
      query: (args) => ({
        method: "POST",
        url: `/save-settings`,
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSettingsQuery, useSetSettingsMutation } = clockApi;
