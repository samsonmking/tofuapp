import { Units } from "./Units";

export interface RecipeIngredient {
    ingredient: string;
    quantity: number;
    unit: Units;
}
