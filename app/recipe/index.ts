import { ZestfulIngredientParser } from "../ingredient/zestful-ingredient-parser";
import { RecipeController } from "./recipe-controller";
import { RecipeRoutes } from "./recipe-routes";
import { FileRecipeRepo } from "./file-recipe-repo";
import { getImageConverter, RecipeImageConverter } from "../recipe-image";
import { MemoryRecipeRepo } from "./memory-recipe-repo";
import { RecipeRepo } from "./recipe-repo";
export { Recipe } from './recipe';

export const getRecipeRoute = (
        imageConverter: RecipeImageConverter = getImageConverter(),
        repo: String = 'FILE') => {
    const parser = new ZestfulIngredientParser();
    const repoImpl = repo === 'FILE' ? getFileRecipeRepo() : getMemoryRecipeRepo();
    const recipeController = new RecipeController(repoImpl , parser, imageConverter);
    return new RecipeRoutes(recipeController);
}

const getFileRecipeRepo = (path: string = './data/recipe-store.json') => {
    return new FileRecipeRepo(path);
}

const getMemoryRecipeRepo = () => {
    return new MemoryRecipeRepo();
}