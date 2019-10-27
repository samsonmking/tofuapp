import { Action } from '@ngrx/store';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { Recipe } from '../../models/recipe/recipe';

export enum RecipesActionTypes {
    GetAllRequest = '[Recipes] Get all recipies request',
    GetAllComplete = '[Recipes] Get all recipes complete',
    RemoveRecipesFromStore = '[Recipes] Remove all from store'
}

export class GetAllRequest implements Action {
    type: string = RecipesActionTypes.GetAllRequest;
    constructor() {}
}

export class GetAllComplete implements Action {
    type: string = RecipesActionTypes.GetAllComplete;
    constructor(public payload: DisplayRecipe[]) {}
}

export class RemoveRecipesFromStore implements Action {
    type: string = RecipesActionTypes.RemoveRecipesFromStore;
    constructor() { }
}

export type RecipesActions =
    GetAllRequest |
    GetAllComplete |
    RemoveRecipesFromStore;
