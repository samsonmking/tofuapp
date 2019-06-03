import { RecipeQuantity } from "./recipe-quantity";

export interface ShoppingListItem {
    ingredient: string;
    recipeQuantities: RecipeQuantity[];
}
