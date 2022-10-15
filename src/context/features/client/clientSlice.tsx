import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientState, ClientResponse } from '../../../interfaces/clientInterfaces';

const initialState: ClientState = {
    client: null,
    errorMessage: ''
}

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        getClient(state, action: PayloadAction<ClientResponse>) {
            state.client = action.payload.client;
            state.errorMessage = '';
        },
        addError(state, action: PayloadAction<string>) {
            state.client = null;
            state.errorMessage = action.payload;
        },
        removeError(state) {
            state.errorMessage = '';
        }
    }
});

export const { getClient, addError, removeError } = clientSlice.actions;
export default clientSlice.reducer;