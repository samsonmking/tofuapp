import { Action } from '@ngrx/store';
import { User } from '../../models/user/user';

export enum UserActionTypes {
    GetUserRequest = '[User] Get user request',
    GetUserComplete = '[User] Get user complete',
    UpdateUserRequest = '[User] Update user request',
    UpdateUserComplete = '[User] Update user complete',
    ResetDefaultOnDeleteRequest = '[User] Reset default list on delete request',
    ResetDefaultOnDeleteComplete = '[User] Reset default list on delete complete'
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

export class ResetDefaultOnDeleteRequest implements Action {
    type: string = UserActionTypes.ResetDefaultOnDeleteRequest;
    constructor(public listToDeleteId: number) {}
}

export class ResetDefaultOnDeleteComplete implements Action {
    type = UserActionTypes.ResetDefaultOnDeleteComplete;
    constructor(public updatedDefaultId: number) {}
}

export type UserActions = 
    GetUserRequest |
    GetUserComplete |
    UpdateUserRequest |
    UpdateUserComplete |
    ResetDefaultOnDeleteRequest |
    ResetDefaultOnDeleteComplete;