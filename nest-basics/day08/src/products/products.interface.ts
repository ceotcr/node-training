export interface CreateProductPayload {
    name: string;
    price: number;
    tags?: string[];
}

export interface Product extends CreateProductPayload {
    id: number;
}