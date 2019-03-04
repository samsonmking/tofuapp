import { RecipeIngredient } from "./recipe-ingredient";

export interface IngredientParser {
    parse(ingredients: string[]): Promise<RecipeIngredient[]>
}