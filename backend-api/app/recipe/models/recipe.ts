import { RecipeIngredient } from "../../ingredient/recipe-ingredient";
import { ShortRecipe } from "./short-recipe";

export interface Recipe extends ShortRecipe {
    ingredients: RecipeIngredient[]
}