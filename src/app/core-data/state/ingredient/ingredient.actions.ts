import { Action } from '@ngrx/store';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';

export enum IngredientActionsType {
    GetIngredientsForRecipeRequest = '[Ingredients] Get ingredients for recipe request',
    GetIngredientsForRecipeComplete = '[Ingredients] Get ingredients for recipe complete'
}

export class GetIngredientsForRecipeRequest implements Action {
    type: string = IngredientActionsType.GetIngredientsForRecipeRequest;
    constructor(public recipeId: number) {}
}

export class GetIngredientsForRecipeComplete implements Action {
    type: string = IngredientActionsType.GetIngredientsForRecipeComplete;
    constructor(public payload: RecipeIngredient[]) {}
}

export type IngredientActions = 
    GetIngredientsForRecipeComplete |
    GetIngredientsForRecipeRequest;