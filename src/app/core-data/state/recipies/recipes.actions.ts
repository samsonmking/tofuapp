import { Action } from '@ngrx/store';
import { DisplayRecipe } from '../../models/recipe/display-recipe';

export enum RecipesActionTypes {
    GetAllRequest = '[Recipies] Get all recipies request',
    GetAllComplete = '[Recipies] Get all reciplies complete'
}

export class GetAllRequest implements Action {
    type: string = RecipesActionTypes.GetAllRequest;
    constructor() {}
}

export class GetAllComplete implements Action {
    type: string = RecipesActionTypes.GetAllComplete;
    constructor(public payload: DisplayRecipe[]) {}
}

export type RecipesActions = 
    GetAllRequest |
    GetAllComplete;