import { RecipeIngredient } from "../ingredient/recipe-ingredient";

export interface Recipe {
    id?: number,
    name: String,
    url: String,
    ingredients: RecipeIngredient[]
}