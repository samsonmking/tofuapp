import { Route } from "../route";
import express from 'express';
import { RecipeController } from "./recipe-controller";
import { checkToken } from "../auth";
import { apiPrefix } from '../constants';

export class RecipeRoutes implements Route {
    constructor(private recipeController: RecipeController) {
    }

    contributeRoutes(app: express.Application): void {
        app.get(`${apiPrefix}/recipe`, checkToken, this.recipeController.getRecipies);
        app.get(`${apiPrefix}/recipe/:id`, checkToken, this.recipeController.getRecipe);
        app.post(`${apiPrefix}/recipe`, checkToken, this.recipeController.addNewRecipe);
        app.put(`${apiPrefix}/recipe/:id`, checkToken, this.recipeController.updateRecipe);
        app.delete(`${apiPrefix}/recipe/:id`, checkToken, this.recipeController.deleteRecipe);
    }
}