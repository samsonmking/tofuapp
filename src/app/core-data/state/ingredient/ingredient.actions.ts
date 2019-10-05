import { Action } from '@ngrx/store';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';

export enum IngredientActionsType {
    GetIngredientsForRecipeRequest = '[Ingredients] Get ingredients for recipe request',
    GetIngredientsForRecipeComplete = '[Ingredients] Get ingredients for recipe complete',
    GetIngredientsForRecipeInList = '[Ingredients] Get ingredients for recipe in list',
    GetIngredientsForRecipeInListComplete = '[Ingredients] Get ingredients for recipe in list complete'
}

export class GetIngredientsForRecipeRequest implements Action {
    type: string = IngredientActionsType.GetIngredientsForRecipeRequest;
    constructor(public recipeId: number) {}
}

export class GetIngredientsForRecipeComplete implements Action {
    type: string = IngredientActionsType.GetIngredientsForRecipeComplete;
    constructor(public payload: RecipeIngredient[]) {}
}

export class GetIngredientsForRecipeInList implements Action {
    type = IngredientActionsType.GetIngredientsForRecipeInList;
    constructor(public recipeId: number) {}
}

export class GetIngredientsForRecipeInListComplete implements Action {
    type = IngredientActionsType.GetIngredientsForRecipeInListComplete;
    constructor(public payload: RecipeIngredient[]) {}
}

export type IngredientActions = 
    GetIngredientsForRecipeComplete |
    GetIngredientsForRecipeRequest;