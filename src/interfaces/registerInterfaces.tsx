export interface RegisterState {
    token: string;
    errorMessage: string;
}

export interface SignUpResponse {
    token: string;
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
    role: string;
    dni: string;
    firsName: string;
    secondName: string;
    firstSurname: string;
    secondSurname: string;
    address: string;
    phoneNumber: string;
}