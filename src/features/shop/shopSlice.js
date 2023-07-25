import { createSlice } from "@reduxjs/toolkit";
import Products from '../../data/products.json'

export const shopSlice = createSlice({
    name: 'shopSlice',
    initialState: {
        value: {
            categorySelected: '',
            idSelected: '',
            allProducts: Products,
            productsSelected: []
        }
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.value.categorySelected = action.payload
        },
        setIdSelected: (state, action) => {
            state.value.idSelected = action.payload
        }
    }
})

export const { setCategorySelected, setIdSelected } = shopSlice.actions
export default shopSlice.reducer