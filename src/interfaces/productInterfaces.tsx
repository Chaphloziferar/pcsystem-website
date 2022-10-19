import { Category } from './categoryInterfaces';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    imageUrl: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductState {
    products: Product[];
    product: Product | null;
    errorMessage: string;
}

export interface ProductsResponse {
    products: Product[];
}

export interface ProductResponse {
    product: Product;
}