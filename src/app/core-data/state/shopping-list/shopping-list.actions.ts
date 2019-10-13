import { Action } from '@ngrx/store';
import { ShoppingList } from '../../models/shopping-list/shopping-list';

export enum ShoppingListActionTypes {
    GetListsRequest = '[List] Get list request',
    GetListsComplete = '[List] Get list complete',
    SetDefaultList = '[List] Set Default list',
    CreateDefaultListRequest = '[List] Create default list request',
    CreateDefaultListComplete = '[List] Create default list complete',
    UpdateShoppingListRequest = '[List] Update shopping list request',
    UpdateShoppingListComplete = '[List] Update shopping list complete',
    DeleteShoppingListRequest = '[List] Delete shopping list',
    DeleteShoppingListComplete = '[List] Delete shopping list complete'
}

export class GetListsRequest implements Action {
    type = ShoppingListActionTypes.GetListsRequest;
    constructor() {}
}

export class GetListsComplete implements Action {
    type = ShoppingListActionTypes.GetListsComplete;
    constructor(public lists: ShoppingList[]) {}
}

export class SetDefaultList implements Action {
    type = ShoppingListActionTypes.SetDefaultList;
    constructor(public id: number) {}
}

export class CreateDefaultListRequest implements Action {
    type = ShoppingListActionTypes.CreateDefaultListRequest;
    constructor() {}
}

export class CreateDefaultListComplete implements Action {
    type = ShoppingListActionTypes.CreateDefaultListComplete;
    constructor(public list: ShoppingList) {}
}

export class UpdateShoppingListRequest implements Action {
    type = ShoppingListActionTypes.UpdateShoppingListRequest;
    constructor(public list: ShoppingList) {}
}

export class UpdateShoppingListComplete implements Action {
    type = ShoppingListActionTypes.UpdateShoppingListComplete;
    constructor(public list: ShoppingList) {}
}

export class DeleteShoppingListRequest implements Action {
    type = ShoppingListActionTypes.DeleteShoppingListRequest;
    constructor(public id: number) {}
}

export class DeleteShoppingListComplete implements Action {
    type = ShoppingListActionTypes.DeleteShoppingListComplete;
    constructor(public id: number) {}
}

export type ShoppingListActions = 
    GetListsRequest |
    GetListsComplete |
    SetDefaultList |
    CreateDefaultListRequest |
    CreateDefaultListComplete |
    UpdateShoppingListRequest |
    UpdateShoppingListComplete |
    DeleteShoppingListRequest |
    DeleteShoppingListComplete;