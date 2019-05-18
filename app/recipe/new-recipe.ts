import { RecipeIngredient } from "../ingredient/recipe-ingredient";

export interface NewRecipe {
    name: String,
    url: String,
    ingredients: RecipeIngredient[]
}