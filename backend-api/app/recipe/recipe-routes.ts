import { Route } from "../route";
import express from 'express';
import { RecipeController } from "./recipe-controller";
import { apiPrefix } from '../constants';
import { Request, Response, NextFunction } from 'express';

export class RecipeRoutes implements Route {
    constructor(
        private readonly recipeController: RecipeController,
        private readonly auth: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    }

    contributeRoutes(app: express.Application): void {
        app.get(`${apiPrefix}/recipe`, this.auth, this.recipeController.getRecipies);
        app.get(`${apiPrefix}/recipe/:id`, this.auth, this.recipeController.getRecipe);
        app.post(`${apiPrefix}/recipe`, this.auth, this.recipeController.addNewRecipe);
        app.put(`${apiPrefix}/recipe/:id`, this.auth, this.recipeController.updateRecipe);
        app.delete(`${apiPrefix}/recipe/:id`, this.auth, this.recipeController.deleteRecipe);
    }
}