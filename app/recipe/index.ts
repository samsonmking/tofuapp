import { ZestfulIngredientParser } from "../ingredient/zestful-ingredient-parser";
import { RecipeController } from "./recipe-controller";
import { RecipeRoutes } from "./recipe-routes";
import { getImageConverter, RecipeImageConverter } from "../recipe-image";
import { RecipeRepo } from "./recipe-repo";
import { RecipePSRepo } from "./recipe-ps-repo";
import { IngredientRepo } from "../ingredient/persistance/ingredient-repo";
import { IngredientPSRepo } from "../ingredient/persistance/ingredient-ps-repo";
export { Recipe } from './models/recipe';

export const getRecipeRoute = (
        imageConverter: RecipeImageConverter = getImageConverter(),
        repo: RecipeRepo = new RecipePSRepo(),
        ingredientRepo: IngredientRepo = new IngredientPSRepo()) => {
    const parser = new ZestfulIngredientParser();
    const recipeController = new RecipeController(repo, ingredientRepo, parser, imageConverter);
    return new RecipeRoutes(recipeController);
}