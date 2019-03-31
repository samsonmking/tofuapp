import { NewRecipe } from '../../models/manual-entry/new-recipe';
import { Action } from '@ngrx/store';

export enum ManualEntryActionTypes {
    EntrySubmitted = '[Manual Entry] Form submitted',
    RecipeCreated = '[Manual Entry] Recipe created',
    RecipeCreationError = '[Manual Entry] Recipe creation error'
}

export class EntrySubmitted implements Action {
    type: string = ManualEntryActionTypes.EntrySubmitted;
    constructor(public payload: NewRecipe) {}

}

export class RecipeCreated implements Action {
    type: string = ManualEntryActionTypes.RecipeCreated;
    constructor(public payload: number) {}
}

export type ManualRecipeEntryActions = 
    EntrySubmitted |
    RecipeCreated;