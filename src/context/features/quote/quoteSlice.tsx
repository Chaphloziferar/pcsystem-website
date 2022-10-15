import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuoteState, QuoteResponse } from '../../../interfaces/quoteInterfaces';

const initialState: QuoteState = {
    quote: null,
    errorMessage: ''
}

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        getQuote(state, action: PayloadAction<QuoteResponse>) {
            state.quote = action.payload.quote;
            state.errorMessage = '';
        },
        resetQuote(state) {
            state.quote = null;
            state.errorMessage = '';
        },
        addError(state, action: PayloadAction<string>) {
            state.quote = null;
            state.errorMessage = action.payload;
        },
        removeError(state) {
            state.errorMessage = '';
        }
    }
});

export const { getQuote, resetQuote, addError, removeError } = quoteSlice.actions;
export default quoteSlice.reducer;