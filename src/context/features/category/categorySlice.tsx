import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState, CategoryResponse } from '../../../interfaces/categoryInterfaces';

const initialState: CategoryState = {
    categories: [],
    errorMessage: ''
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategories(state, action: PayloadAction<CategoryResponse>) {
            state.categories = action.payload.categories;
            state.errorMessage = '';
        },
        addError(state, action: PayloadAction<string>) {
            state.categories = [];
            state.errorMessage = action.payload;
        },
        removeError(state) {
            state.errorMessage = '';
        }
    }
});

export const { getCategories, addError, removeError } = categorySlice.actions;
export default categorySlice.reducer;