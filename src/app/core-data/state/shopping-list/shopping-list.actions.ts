import { Action } from '@ngrx/store';
import { ShoppingList } from '../../models/shopping-list/shopping-list';

export enum ShoppingListActionTypes {
    GetListsRequest = '[List] Get list request',
    GetListsComplete = '[List] Get list complete',
    SetDefaultList = '[List] Set Default list',
    CreateDefaultListRequest = '[List] Create default list request',
    CreateDefaultListComplete = '[List] Create default list complete'
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
    type = ShoppingListActionTypes.CreateDefaultListRequest
    constructor() {}
}

export class CreateDefaultListComplete implements Action {
    type = ShoppingListActionTypes.CreateDefaultListComplete
    constructor(public list: ShoppingList) {}
}

export type ShoppingListActions = 
    GetListsRequest |
    GetListsComplete |
    SetDefaultList |
    CreateDefaultListRequest |
    CreateDefaultListComplete;