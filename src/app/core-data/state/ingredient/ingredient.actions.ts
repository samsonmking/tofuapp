import { Action } from '@ngrx/store';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';

export enum IngredientActionsType {
    GetIngredientsForRecipeRequest = '[Ingredients] Get ingredients for recipe request',
    GetIngredientsForRecipeComplete = '[Ingredients] Get ingredients for recipe complete',
    GetIngredientsForRecipeInList = '[Ingredients] Get ingredients for recipe in list',
    GetIngredientsForRecipeInListComplete = '[Ingredients] Get ingredients for recipe in list complete',
    GetIngredientsForCurrentListRequest = '[Ingredients] Get ingredients for current list',
    GetIngredientsForCurrentListComplete = '[Ingredients] Get ingredients for current list complete',
    RemoveIngredientsFromStore = '[Ingredients] Remove ingredients from store'
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

export class GetIngredientsForCurrentListRequest implements Action {
    type = IngredientActionsType.GetIngredientsForCurrentListRequest;
    constructor() {}
}

export class GetIngredientsForCurrentListComplete implements Action {
    type = IngredientActionsType.GetIngredientsForCurrentListComplete;
    constructor(public payload: RecipeIngredient[]) {}
}

export class RemoveIngredientsFromStore implements Action {
    type = IngredientActionsType.RemoveIngredientsFromStore;
    constructor() { }
}

export type IngredientActions = 
    GetIngredientsForRecipeComplete |
    GetIngredientsForRecipeRequest |
    GetIngredientsForCurrentListRequest |
    GetIngredientsForCurrentListComplete |
    RemoveIngredientsFromStore;