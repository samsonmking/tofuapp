import { Units } from "./Units";

export interface RecipeIngredient {
    id?: number;
    recipe_id: number;
    ingredient: string;
    quantity: number;
    unit: Units;
}
