import { Action } from '@ngrx/store';
import { User } from '../../models/user/user';
import { Auth } from '../../models/user/auth';
import { UserData } from '../../models/user/user-data';

export enum UserActionTypes {
    LoginRequest = '[User] Login Request',
    LoginComplete = '[User] Login Complete',
    LoginFailed = '[User] Login Failed',
    LoadUserRequest = '[User] Load user request',
    LoadUserComplete = '[User] Load user complete',
    LoadUserFailed = '[User] Load user failed',
    LogoutRequest = '[User] Logout Request',
    LogoutComplete = '[User] Logout Complete'
}

export class LoginRequest implements Action {
    type = UserActionTypes.LoginRequest;
    constructor(public username: string, public password: string) {}
}

export class LoginComplete implements Action {
    type = UserActionTypes.LoginComplete;
    constructor(public user: User, public auth: Auth) { }
}

export class LoginFailed implements Action {
    type = UserActionTypes.LoginFailed;
    constructor() { }
}

export class LoadUserRequest implements Action {
    type = UserActionTypes.LoadUserRequest;
    constructor() { }
}

export class LoadUserComplete implements Action {
    type = UserActionTypes.LoadUserComplete;
    constructor(public userData: UserData) { }
}

export class LoadUserFailed implements Action {
    type = UserActionTypes.LoadUserFailed;
    constructor() { }
}

export class LogoutRequest implements Action {
    type = UserActionTypes.LogoutRequest;
    constructor() { }
}

export class LogoutComplete implements Action {
    type = UserActionTypes.LogoutComplete;
    constructor() { }
}

export type UserActions = 
LoginRequest |
LoginComplete |
LoginFailed |
LogoutRequest |
LogoutComplete |
LoadUserRequest |
LoadUserComplete | 
LoadUserFailed;