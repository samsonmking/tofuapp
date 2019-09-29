import { RecipeIngredient } from '../ingredient/recipe-ingredient';

export interface ShoppingListItem {
    id?: number;
    shoppingListId: number;
    ingredientId: number;
}