import { Route } from "../route";
import express from 'express';
import { IngredientController } from "./ingredient-controller";
import { apiPrefix } from '../constants';
import { Request, Response, NextFunction } from 'express';

export class IngredientRoutes implements Route {
    constructor(
        private readonly ingredientController: IngredientController,
        private readonly auth: (req: Request, res: Response, next: NextFunction) => Promise<void>) {

    }

    contributeRoutes(app: express.Application): void {
        app.get(`${apiPrefix}/recipe/:recipeid/ingredients`, this.auth, this.ingredientController.getIngredientsForRecipe);
        app.post(`${apiPrefix}/recipe/:recipeid/ingredients`, this.auth, this.ingredientController.addIngredientToRecipe);
    }
}