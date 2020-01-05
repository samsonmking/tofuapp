import { Route } from "../route";
import express from 'express';
import { IngredientController } from "./ingredient-controller";
import { checkToken } from "../auth";
import { apiPrefix } from '../constants';

export class IngredientRoutes implements Route {
    constructor(private ingredientController: IngredientController) {

    }

    contributeRoutes(app: express.Application): void {
        app.get(`${apiPrefix}/recipe/:recipeid/ingredients`, checkToken, this.ingredientController.getIngredientsForRecipe);
        app.post(`${apiPrefix}/recipe/:recipeid/ingredients`, checkToken, this.ingredientController.addIngredientToRecipe);
    }
}