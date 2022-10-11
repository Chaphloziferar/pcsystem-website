import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse } from '../../../interfaces/authInterfaces';

const initialState: AuthState = {
    status: 'Checking',
    username: '',
    role: 'user',
    token: '',
    errorMessage: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<LoginResponse>) => {
            state.status = 'Authenticated';
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.errorMessage = '';
        },
        logout: (state) => {
            state.status = 'Not-Authenticated';
            state.username = '';
            state.role = 'user';
            state.token = '';
            state.errorMessage = '';
        },
        addError: (state, action: PayloadAction<string>) => {
            state.status = 'Not-Authenticated';
            state.username = '';
            state.role = '';
            state.token = '';
            state.errorMessage = action.payload;
        },
        removeError: (state) => {
            state.errorMessage = '';
        }
    }
});

export const { signIn, logout, addError, removeError } = authSlice.actions;
export default authSlice.reducer;