import { Composition } from "./composition.type";

export type Product = {
    barcode: string;
    name: string;
    imageSrc: string;
    composition: Composition;
    nutriScore: string;
    carbonFootprint: number;
    allergens: string[];
    dietaryRestrictions: string[];
    isVegan: boolean;
    isVegetarian: boolean;
  };