import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterState, SignUpResponse } from '../../../interfaces/registerInterfaces';

const initialState: RegisterState = {
    token: '',
    errorMessage: ''
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        signUp(state, action: PayloadAction<SignUpResponse>) {
            state.token = action.payload.token;
            state.errorMessage = '';
        },
        addError(state, action: PayloadAction<string>) {
            state.token = '';
            state.errorMessage = action.payload;
        },
        removeError(state) {
            state.errorMessage = '';
        }
    }
});

export const { signUp, addError, removeError } = registerSlice.actions;
export default registerSlice.reducer;