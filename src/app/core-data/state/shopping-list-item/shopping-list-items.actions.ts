import { Action } from '@ngrx/store';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';

export enum ShoppingListItemsActionTypes {
    GetItemsForListRequest = '[List Items] Get all items for list',
    GetItemsForListComplete = 'List Items] Get all items for list complete',
    AddRecipeToList = '[List Items] Add recipe to list',
    AddItemsToList = '[List Items] Add items to list',
    AddItemsToListComplete = '[List Items] Add items to list complete',
    RemoveRecipeFromList = '[List Items] Remove recipe from list',
    RemoveRecipeFromListComplete = '[List Items] Remove recipe from list complete',
    RemoveItemsFromListRequest = '[List Items] Remove items from list',
    RemoveItemsFromListComplete = '[List Items] Remove items from list complete',
    RemoveListItemsFromStore = '[List Items] Remove list items from store',
    CheckShoppingListItemRequest = '[List Items] Check list item request',
    CheckShoppingListItemComplete = '[List Items] Check list item complete'
}

export class GetItemsForListRequest implements Action {
    type = ShoppingListItemsActionTypes.GetItemsForListRequest;
    constructor(public listId: number) { }
}

export class GetItemsForListComplete implements Action {
    type = ShoppingListItemsActionTypes.GetItemsForListComplete;
    constructor(public items: ShoppingListItem[]) { }
}

export class AddRecipeToList implements Action {
    type = ShoppingListItemsActionTypes.AddRecipeToList;
    constructor(public recipeId: number) { }
}

export class AddItemsToList implements Action {
    type = ShoppingListItemsActionTypes.AddItemsToList;
    constructor(public items: RecipeIngredient[]) { }
}

export class AddItemsToListComplete implements Action {
    type = ShoppingListItemsActionTypes.AddItemsToListComplete;
    constructor(public items: ShoppingListItem[]) { }
}

export class RemoveRecipeFromList implements Action {
    type = ShoppingListItemsActionTypes.RemoveRecipeFromList;
    constructor(public recipeId: number) { }
}

export class RemoveRecipeFromListComplete implements Action {
    type = ShoppingListItemsActionTypes.RemoveRecipeFromListComplete;
    constructor(public ids: number[]) { }
}

export class RemoveItemsFromListRequest implements Action {
    type = ShoppingListItemsActionTypes.RemoveItemsFromListRequest;
    constructor(public listId: number) { }
}

export class RemoveItemsFromListComplete implements Action {
    type = ShoppingListItemsActionTypes.RemoveItemsFromListComplete;
    constructor(public listId: number, public ids: number[]) { }
}

export class RemoveListItemsFromStore implements Action {
    type = ShoppingListItemsActionTypes.RemoveListItemsFromStore;
    constructor() { }
}

export class CheckShoppingListItemRequest implements Action {
    type = ShoppingListItemsActionTypes.CheckShoppingListItemRequest;
    constructor(public id: number, public isChecked: boolean) { }
}

export class CheckShoppingListItemComplete implements Action {
    type = ShoppingListItemsActionTypes.CheckShoppingListItemComplete;
    constructor(public payload: ShoppingListItem) { }
}

export type ListItemActions =
    GetItemsForListRequest |
    GetItemsForListComplete |
    AddRecipeToList |
    AddItemsToList |
    AddItemsToListComplete |
    RemoveRecipeFromList |
    RemoveRecipeFromListComplete |
    RemoveItemsFromListRequest |
    RemoveItemsFromListComplete |
    RemoveListItemsFromStore |
    CheckShoppingListItemRequest |
    CheckShoppingListItemComplete;