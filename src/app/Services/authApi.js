import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/signup', 
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation, 
} = authApi;
