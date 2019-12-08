import { Route } from "../route";
import express from 'express';
import { IngredientController } from "./ingredient-controller";
import { checkToken } from "../auth";

export class IngredientRoutes implements Route {
    constructor(private ingredientController: IngredientController) {

    }

    contributeRoutes(app: express.Application): void {
        app.get('/recipe/:recipeid/ingredients', checkToken, this.ingredientController.getIngredientsForRecipe);
        app.post('/recipe/:recipeid/ingredients', checkToken, this.ingredientController.addIngredientToRecipe);
    }
}