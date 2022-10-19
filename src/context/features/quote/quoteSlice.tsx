import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quote, QuoteState, QuotesResponse, QuoteResponse } from '../../../interfaces/quoteInterfaces';

const initialState: QuoteState = {
    quotes: [],
    quote: null,
    selectedQuote: null,
    errorMessage: ''
}

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        getQuotes(state, action: PayloadAction<QuotesResponse>) {
            state.quotes = action.payload.quotes;
            state.errorMessage = '';
        },
        getQuote(state, action: PayloadAction<QuoteResponse>) {
            state.quote = action.payload.quote;
            state.errorMessage = '';
        },
        getSelectedQuote(state, action: PayloadAction<Quote>) {
            state.selectedQuote = action.payload;
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

export const { getQuotes, getQuote, getSelectedQuote, resetQuote, addError, removeError } = quoteSlice.actions;
export default quoteSlice.reducer;