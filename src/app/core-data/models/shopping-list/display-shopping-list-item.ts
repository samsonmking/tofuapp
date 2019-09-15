import { RecipeIngredient } from '../ingredient/recipe-ingredient';

export interface DisplayShoppingListItem {
    id?: number;
    recipeIngredient: RecipeIngredient;
}