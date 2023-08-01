import { apiSlice } from "./apiSlice";

const USER_URL = "http://localhost:5000/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data, { getState }) => {
        const token = getState().auth.token; // Retrieve the JWT token from the application state or store

        return {
          url: `${USER_URL}/profile`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: `jwt=${token}`, // Pass the token in the Cookie header
          },
          body: JSON.stringify(data),
        };
      },
    }),
    leavepermission: builder.mutation({
      query: () => ({
        url: `${USER_URL}/leavepermission`,
        method: "POST",
      }),
    }),
 
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useLeavepermissionMutation
} = userApiSlice;