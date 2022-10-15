export interface AuthState {
    status: 'Checking' | 'Authenticated' | 'Not-Authenticated';
    username: string;
    role: string;
    email: string;
    token: string;
    errorMessage: string;
}

export interface LoginResponse {
    username: string;
    role: string;
    email: string;
    token: string;
}

export interface LoginData {
    username: string;
    password: string;
}