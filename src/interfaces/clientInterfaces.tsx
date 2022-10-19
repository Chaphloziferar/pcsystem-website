export interface Client {
    id: string;
    dni: string;
    firstName: string;
    secondName: string;
    firsSurname: string;
    secondSurname: string;
    email: string;
    address: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface ClientState {
    client: Client | null;
    errorMessage: string;
}

export interface ClientResponse {
    client: Client;
}