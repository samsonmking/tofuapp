import { Recipe } from '../../models/recipe/recipe';
import { Action } from '@ngrx/store';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';
import { ShoppingListItem } from '../../models/shopping-list/shopping-list-item';

export enum ShoppingListActionTypes {
    AddRecipeToList = '[List] Add recipe to list',
    AddIngredientsToList = '[List] Add ingredients to list',
    AddIngredientsToListComplete = '[List] Add ingredients to list complete'
}

export class AddRecipeToList implements Action {
    type: string = ShoppingListActionTypes.AddRecipeToList;
    constructor(public recipe: Recipe) { }
}

export class AddIngredientsToList implements Action {
    type: string = ShoppingListActionTypes.AddIngredientsToList;
    constructor(public ingredients: RecipeIngredient[]) { }
}

export class AddIngredientsToListComplete implements Action {
    type: string = ShoppingListActionTypes.AddIngredientsToListComplete;
    constructor(public payload: ShoppingListItem[]) { }
}

export type ShoppingListActions = 
    AddRecipeToList |
    AddIngredientsToList |
    AddIngredientsToListComplete;