import { Route } from "../route";
import express from 'express';
import { IngredientController } from "./ingredient-controller";

export class IngredientRoutes implements Route {
    constructor(private ingredientController: IngredientController) {

    }

    contributeRoutes(app: express.Application): void {
        app.get('/recipe/:recipeid/ingredients', this.ingredientController.getIngredientsForRecipe);
        app.post('/recipe/:recipeid/ingredients', this.ingredientController.addIngredientToRecipe);
    }
}