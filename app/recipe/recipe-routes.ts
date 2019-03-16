import { Route } from "../route";
import express from 'express';
import { RecipeController } from "./recipe-controller";

export class RecipeRoutes implements Route {
    constructor(private recipeController: RecipeController) {
    }

    contributeRoutes(app: express.Application): void {
        app.get('/recipe', this.recipeController.getRecipies);
        app.get('/recipe/:id', this.recipeController.getRecipe);
        app.post('/recipe', this.recipeController.addNewRecipe);
        app.put('/recipe/:id', this.recipeController.updateRecipe);
    }
}