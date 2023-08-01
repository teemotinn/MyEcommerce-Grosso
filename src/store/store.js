import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import shopReducer from '../features/shop/shopSlice'
import cartReducer from '../features/cart/cartSlice'
import { shopApi } from '../services/shopServices'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(shopApi.middleware),
})

setupListeners(store.dispatch)

export default store