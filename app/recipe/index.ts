import { ZestfulIngredientParser } from "../ingredient/zestful-ingredient-parser";
import { RecipeController } from "./recipe-controller";
import { RecipeRoutes } from "./recipe-routes";
import { FileRecipeRepo } from "./file-recipe-repo";
export { Recipe } from './recipe';

export const getRecipeRoute = () => {
    const recipeRepo = new FileRecipeRepo('./data/recipe-store.json');
    const parser = new ZestfulIngredientParser();
    const recipeController = new RecipeController(recipeRepo, parser);
    return new RecipeRoutes(recipeController);
}