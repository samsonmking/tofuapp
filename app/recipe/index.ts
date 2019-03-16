import { seedRepo } from "./memory-repo-seed";
import { ZestfulIngredientParser } from "../ingredient/zestful-ingredient-parser";
import { RecipeController } from "./recipe-controller";
import { RecipeRoutes } from "./recipe-routes";
import { MemoryRecipeRepo } from "./memory-recipe-repo";
export { Recipe } from './recipe';

export const getRecipeRoute = () => {
    const recipeRepo = new MemoryRecipeRepo();
    const parser = new ZestfulIngredientParser();
    const recipeController = new RecipeController(recipeRepo, parser);
    return new RecipeRoutes(recipeController);
}