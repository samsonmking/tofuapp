import { RecipeIngredient } from "../../ingredient/recipe-ingredient";

export interface ShoppingList {
    id?: number;
    name: string;
    items: RecipeIngredient[];
}
