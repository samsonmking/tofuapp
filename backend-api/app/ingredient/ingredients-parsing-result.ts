import { ParsedIngredient } from "./parsed-ingredient";

export interface IngredientParsingResult {
    error: string[],
    recipeIngredients: ParsedIngredient[],
}