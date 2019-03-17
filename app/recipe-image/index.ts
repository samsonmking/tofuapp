import { FileRecipeImageStore } from "./fs-recipe-image-store";
import { RecipeImageRoutes } from "./recipe-image-routes";
import { RecipeImageController } from "./recipe-image-controller";
import { RecipeImageStatic } from "./recipe-image-static";

export const getImageRoutes = () => {
    const fileSystemStore = new FileRecipeImageStore();
    const controller = new RecipeImageController(fileSystemStore, fileSystemStore);
    return new RecipeImageRoutes(controller);
}

export const getImageResources = () => {
    return new RecipeImageStatic();
}