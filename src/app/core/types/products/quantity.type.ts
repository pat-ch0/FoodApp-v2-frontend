import { Product } from "./product.type";

export type Quantity = {
    quantity: number;
}

export type ProductQuantityData = Product & Quantity;
