import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApiSlice = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/auth',

    }),
    endpoints(builder) {
        return {
            login: builder.mutation({
                query: (data) => {
                    return {
                        url: '/login',
                        method: 'POST',
                        body: data
                    };
                },
            }),
            register: builder.mutation({
                query: (data) => {
                    return {
                        url: '/register',
                        method: 'POST',
                        body: data
                    };
                },
            })
        };
    }
});

export const {
    useLoginMutation,
    useRegisterMutation
} = usersApiSlice;
export { usersApiSlice };
