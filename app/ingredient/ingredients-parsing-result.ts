import { RecipeIngredient } from "./recipe-ingredient";

export interface IngredientParsingResult {
    error: string[],
    recipeIngredients: RecipeIngredient[],
}