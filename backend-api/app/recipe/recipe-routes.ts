import { Route } from "../route";
import express from 'express';
import { RecipeController } from "./recipe-controller";
import { checkToken } from "../auth";

export class RecipeRoutes implements Route {
    constructor(private recipeController: RecipeController) {
    }

    contributeRoutes(app: express.Application): void {
        app.get('/recipe', checkToken, this.recipeController.getRecipies);
        app.get('/recipe/:id', checkToken, this.recipeController.getRecipe);
        app.post('/recipe', checkToken, this.recipeController.addNewRecipe);
        app.put('/recipe/:id', checkToken, this.recipeController.updateRecipe);
    }
}