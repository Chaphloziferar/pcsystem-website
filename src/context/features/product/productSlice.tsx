import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, ProductsResponse, ProductResponse } from '../../../interfaces/productInterfaces';

const initialState: ProductState = {
    products: [],
    product: null,
    errorMessage: ''
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts(state, action: PayloadAction<ProductsResponse>) {
            state.products = action.payload.products;
            state.errorMessage = '';
        },
        getProduct(state, action: PayloadAction<ProductResponse>) {
            state.product = action.payload.product;
            state.errorMessage = '';
        },
        addError(state, action: PayloadAction<string>) {
            state.products = [];
            state.errorMessage = action.payload;
        },
        removeError(state) {
            state.errorMessage = '';
        }
    }
});

export const { getProducts, getProduct, addError, removeError } = productSlice.actions;
export default productSlice.reducer;