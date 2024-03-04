import { Composition } from "./composition.type";
import { Product } from "./product.type";

export type ProductDetail = Product & {
    composition: Composition;
    nutriScore: string;
    carbonFootprint: number;
    allergens: string[];
    dietaryRestrictions: string[];
    isVegan: boolean;
    isVegetarian: boolean;
  };