import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { realtime_database_url } from "../database/firebaseConfig"

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: realtime_database_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProducts: builder.query({
            query: () => `products.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const productsTransformed = Object.values(response)
                return (productsTransformed)
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const productTransformed = Object.values(response).pop()
                return (productTransformed)
            }
        }),
        postCart: builder.mutation({
            query: (order) => ({
                url: `orders.json`,
                method: `POST`,
                body: order
            })
        }),
        getOrders: builder.query({
            query: (localId) => `orders.json?orderBy="localId"&equalTo="${localId}"`,
            transformResponse: (response) => {
                const ordersTransformed = Object.values(response)
                return (ordersTransformed)
            }
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    usePostCartMutation,
    useGetOrdersQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
} = shopApi