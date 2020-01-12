import { Action } from '@ngrx/store';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { NewRecipe } from '../../models/manual-entry/new-recipe';

export enum RecipesActionTypes {
    EntrySubmitted = '[Manual Entry] Form submitted',
    RecipeCreated = '[Manual Entry] Recipe created',
    RecipeCreationError = '[Manual Entry] Recipe creation error',
    GetAllRequest = '[Recipes] Get all recipies request',
    GetAllComplete = '[Recipes] Get all recipes complete',
    RemoveRecipesFromStore = '[Recipes] Remove all from store',
    DeleteRequest = '[Recipes] Delete request',
    DeleteComplete = '[Recipes] Delete complete',
    DeleteError = '[Recipes] Delete error'
}

export class EntrySubmitted implements Action {
    type: string = RecipesActionTypes.EntrySubmitted;
    constructor(public payload: NewRecipe) {}

}

export class RecipeCreated implements Action {
    type: string = RecipesActionTypes.RecipeCreated;
    constructor(public payload: DisplayRecipe) {}
}

export class RecipeCreationError implements Action {
    type: string = RecipesActionTypes.RecipeCreationError;
    constructor(public payload: string[]) {}
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

export class DeleteRecipeRequest implements Action {
    type: string = RecipesActionTypes.DeleteRequest;
    constructor(public payload: number) { }
}

export class DeleteRecipeComplete implements Action {
    type: string = RecipesActionTypes.DeleteComplete;
    constructor(public payload: number) { }
}

export class DeleteRecipeError implements Action {
    type: string = RecipesActionTypes.DeleteError;
    constructor(public payload: any) { }
}

export type RecipesActions =
    GetAllRequest |
    GetAllComplete |
    RemoveRecipesFromStore |
    EntrySubmitted |
    RecipeCreated |
    RecipeCreationError |
    DeleteRecipeRequest |
    DeleteRecipeComplete |
    DeleteRecipeError;
