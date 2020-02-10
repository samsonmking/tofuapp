import { IngredientRoutes } from "./ingredient-routes";
import { IngredientController } from "./ingredient-controller";
import { IngredientPSRepo } from "./persistance/ingredient-ps-repo";
import { Request, Response, NextFunction } from 'express';
import { checkToken } from "../auth";

const repo = new IngredientPSRepo();
const controller = new IngredientController(repo);

export function getIngredientRoutes(
    auth: (req: Request, res: Response, next: NextFunction) => Promise<void> = checkToken) {
    return new IngredientRoutes(controller, auth);
}