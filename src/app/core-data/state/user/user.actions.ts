import { Action } from '@ngrx/store';
import { User } from '../../models/user/user';

export enum UserActionTypes {
    GetUserRequest = '[User] Get user request',
    GetUserComplete = '[User] Get user complete',
    UpdateUserRequest = '[User] Update user request',
    UpdateUserComplete = '[User] Update user complete',
    SetDefaultListRequest = '[User] Set default list request',
    SetDefaultListComplete = '[User] Set default list complete'
}

export class GetUserRequest implements Action {
    type: string = UserActionTypes.GetUserRequest;
    constructor(public user: string) {}
}

export class GetUserComplete implements Action {
    type: string = UserActionTypes.GetUserComplete;
    constructor(public user: User) {}
}

export class UpdateUserRequest implements Action {
    type: string = UserActionTypes.UpdateUserRequest;
    constructor(public user: User) {}
}

export class UpdateUserComplete implements Action {
    type: string = UserActionTypes.UpdateUserComplete;
    constructor(public user: User) {}
} 

export class SetDefaultListRequest implements Action {
    type: string = UserActionTypes.SetDefaultListRequest;
    constructor(public listId: number) {}
}

export class SetDefaultListComplete implements Action {
    type = UserActionTypes.SetDefaultListComplete;
    constructor(public listId: number) {}
}

export type UserActions = 
    GetUserRequest |
    GetUserComplete |
    UpdateUserRequest |
    UpdateUserComplete |
    SetDefaultListRequest |
    SetDefaultListComplete;