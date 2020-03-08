import { Action } from '@ngrx/store';
import { User } from '../../models/user/user';
import { UserData } from '../../models/user/user-data';

export enum UserActionTypes {
    LoginRequest = '[User] Login Request',
    LoginComplete = '[User] Login Complete',
    LoginUsernameFailed = '[User] Login Username Failed',
    LoginPasswordFailed = '[User] Login Password Failed',
    LoadUserRequest = '[User] Load user request',
    LoadUserComplete = '[User] Load user complete',
    LoadUserFailed = '[User] Load user failed',
    LogoutRequest = '[User] Logout Request',
    LogoutComplete = '[User] Logout Complete',
    RegisterRequest = '[User] Register Request',
    RegisterError = '[User] Register Error',
    RegisterComplete = '[User] Register Complete'
}

export class LoginRequest implements Action {
    type = UserActionTypes.LoginRequest;
    constructor(public username: string, public password: string) {}
}

export class LoginComplete implements Action {
    type = UserActionTypes.LoginComplete;
    constructor(public user: User) { }
}

export class LoginUsernameFailed implements Action {
    type = UserActionTypes.LoginUsernameFailed;
    constructor() { }
}

export class LoginPasswordFailed implements Action {
    type = UserActionTypes.LoginPasswordFailed;
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

export class RegisterRequest implements Action {
    type = UserActionTypes.RegisterRequest;
    constructor(public email: string, public password: string) { }
}

export class RegisterError implements Action {
    type = UserActionTypes.RegisterError;
    constructor(public error: RegisterError.ErrorType) { }
}

export namespace RegisterError {
    export enum ErrorType {
        EmailInUse = 'auth/email-already-in-use',
        InvalidEmail = 'auth/invalid-email',
        WeakPassword = 'auth/weak-password',
        Other = 'other'
    }
}

export class RegisterComplete implements Action {
    type = UserActionTypes.RegisterComplete;
    constructor(public user: User) {}
}

export type UserActions = 
LoginRequest |
LoginComplete |
LoginUsernameFailed |
LoginPasswordFailed |
LogoutRequest |
LogoutComplete |
LoadUserRequest |
LoadUserComplete | 
LoadUserFailed |
RegisterRequest |
RegisterError |
RegisterComplete;