import { IngredientRoutes } from "./ingredient-routes";
import { IngredientController } from "./ingredient-controller";
import { IngredientPSRepo } from "./persistance/ingredient-ps-repo";

const repo = new IngredientPSRepo();
const controller = new IngredientController(repo);

export function getIngredientRoutes() {
    return new IngredientRoutes(controller);
}