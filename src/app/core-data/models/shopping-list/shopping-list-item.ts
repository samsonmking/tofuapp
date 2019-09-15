import { RecipeIngredient } from '../ingredient/recipe-ingredient';

export interface ShoppingListItem {
    id?: number;
    recipeIngredientId: number;
}