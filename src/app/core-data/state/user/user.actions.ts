import { Action } from '@ngrx/store';
import { User } from '../../models/user/user';
import { Auth } from '../../models/user/auth';

export enum UserActionTypes {
    LoginRequest = '[User] Login Request',
    LoginComplete = '[User] Login Complete',
    LoginFailed = '[User] Login Failed',
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
LogoutComplete;