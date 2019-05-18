import { Recipe } from "./recipe";
import { NewRecipe } from "./new-recipe";
import { ShortRecipe } from "./short-recipe";

export interface RecipeRepo {
    getRecipes(): Promise<ShortRecipe[]>,
    getRecipe(id: number): Promise<Recipe>,
    addRecipe(recipe: NewRecipe): Promise<Recipe>,
    updateRecipe(recipe: Recipe): Promise<Recipe>,
    deleteRecipe(id: number): Promise<boolean>
}