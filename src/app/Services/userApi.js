import { baseApi } from "./baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserFriends: builder.query({
            query: ({userId}) => `user/${userId}/friends`,
            providesTags: (result, error, arg) => {
                return ["Friends"];
            },
        }),
        getUserDetails: builder.query({
            query: ({userId}) => `user/${userId}`,
            providesTags: (result, error, arg) => {
                return ["User"];
            },
        }),
        updatePlayerBets: builder.mutation({
            query: ({userId, data}) => ({
                url: `user/${userId}`, 
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User", "Friends"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetUserFriendsQuery,
    useGetUserDetailsQuery,
    useUpdatePlayerBetsMutation,
} = betsApi;
