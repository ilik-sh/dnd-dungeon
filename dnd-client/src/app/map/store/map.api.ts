import { apiSlice } from "api/api"

const mapApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body: {email: string, password: string, username: string}) => ({
                url: '/auth/signup',
                method: 'POST',
                body
            })
        }),
        signIn: builder.mutation({
        query: (body: {email: string, password: string}) => ({
            url: '/auth/signin',
            method: 'POST',
            body
            })
        }),
    })
})