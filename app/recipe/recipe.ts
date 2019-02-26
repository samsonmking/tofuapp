import { Ingredient } from "./ingredient";
import { RecipeIngredient } from "./recipe-ingredient";

export interface Recipe {
    id?: number,
    name: String,
    url: String,
    ingredients: RecipeIngredient[]
}