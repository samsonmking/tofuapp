import { Recipe } from "./recipe";

export interface RecipeRepo {
    getRecipies(): Promise<Recipe[]>,
    getRecipe(id: number): Promise<Recipe>,
    addRecipe(recipe: Recipe): Promise<Recipe>,
    updateRecipe(recipe: Recipe): Promise<Recipe>,
    deleteRecipe(id: number): Promise<boolean>
}