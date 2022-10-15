export interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryState {
    categories: Category[];
    errorMessage: string;
}

export interface CategoryResponse {
    categories: Category[];
}
