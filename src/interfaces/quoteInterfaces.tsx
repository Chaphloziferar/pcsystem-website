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
    quotes: Quote[];
    quote: Quote | null;
    selectedQuote: Quote | null;
    errorMessage: string;
}

export interface QuotesResponse {
    quotes: Quote[];
}

export interface QuoteResponse {
    quote: Quote;
}