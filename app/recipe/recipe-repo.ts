import { Recipe } from "./models/recipe";
import { NewRecipe } from "./models/new-recipe";
import { ShortRecipe } from "./models/short-recipe";

export interface RecipeRepo {
    getRecipes(userId: string): Promise<ShortRecipe[]>;
    getRecipeWithIngredients(id: number): Promise<Recipe>;
    addRecipe(recipe: NewRecipe): Promise<ShortRecipe>;
    addRecipes(recipes: NewRecipe[]): Promise<ShortRecipe>;
    updateRecipe(recipe: Recipe): Promise<ShortRecipe>;
    deleteRecipe(id: number): Promise<boolean>;
}