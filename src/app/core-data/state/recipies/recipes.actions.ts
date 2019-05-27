import { Action } from '@ngrx/store';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { Recipe } from '../../models/recipe/recipe';

export enum RecipesActionTypes {
    GetAllRequest = '[Recipes] Get all recipies request',
    GetAllComplete = '[Recipes] Get all reciplies complete',
    GetRecipeDetails = '[Recipes] Get recipe details',
    RecipeDetailsComplete = '[Recipes] Get recipe details complete'
}

export class GetAllRequest implements Action {
    type: string = RecipesActionTypes.GetAllRequest;
    constructor() {}
}

export class GetAllComplete implements Action {
    type: string = RecipesActionTypes.GetAllComplete;
    constructor(public payload: DisplayRecipe[]) {}
}

export class GetRecipeDetails implements Action {
    type: string = RecipesActionTypes.GetRecipeDetails;
    constructor(public payload: number) {}
}

export class RecipeDetailsComplete implements Action {
    type: string = RecipesActionTypes.RecipeDetailsComplete;
    constructor(public payload: DisplayRecipe) {}
}

export type RecipesActions =
    GetAllRequest |
    GetAllComplete |
    GetRecipeDetails |
    RecipeDetailsComplete;
