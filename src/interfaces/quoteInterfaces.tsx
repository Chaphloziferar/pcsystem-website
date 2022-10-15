import { Client } from "./clientInterfaces";
import { Product } from "./productInterfaces";

export interface Quote {
    id: string;
    client: Client;
    products: Product[];
    total: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface QuoteState {
    quote: Quote | null;
    errorMessage: string;
}

export interface QuoteResponse {
    quote: Quote;
}