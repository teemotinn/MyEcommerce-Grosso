import { createSlice } from "@reduxjs/toolkit";
import Products from '../../data/products.json'

export const shopSlice = createSlice({
    name: "Shop",
    initialState: {
        value: {
            categorySelected: "",
            selectedProductId: "",
            allProducts: Products,
            productsSelected: []
        }
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.value.productsSelected = state.value.allProducts.filter(product => product.category === action.payload)
            state.value.categorySelected = action.payload
        },
        setSelectedProductId: (state,action) => {
            state.value.selectedProductId = action.payload
        }
    }
})

export const {setCategorySelected, setSelectedProductId} = shopSlice.actions

export default shopSlice.reducer