import { RecipeIngredient } from "./recipe-ingredient";
import { IngredientParsingResult } from "./ingredients-parsing-result";

export interface IngredientParser {
    parse(ingredients: string[]): Promise<IngredientParsingResult>
}