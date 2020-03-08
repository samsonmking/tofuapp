import { AppState, selectUser } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LoginRequest, LogoutRequest, LoginUsernameFailed, LoginPasswordFailed, UserActionTypes, RegisterRequest, RegisterError } from './user.actions';
import { Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserState } from './user.reducer';
import { ofType } from '@ngrx/effects';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    loggedIn$: Observable<boolean>;
    user$: Observable<UserState>;
    usernameFailed$: Observable<LoginUsernameFailed>;
    passwordFailed$: Observable<LoginPasswordFailed>;
    registerFailed$: Observable<RegisterError>;
    
    constructor(private store: Store<AppState>, private actions$: ActionsSubject) {
        this.loggedIn$ = this.store.pipe(
            select(selectUser),
            map(user => user.loggedIn)
        );

        this.user$ = this.store.pipe(
            select(selectUser)
        );

        this.usernameFailed$ = this.actions$.pipe(
            ofType<LoginUsernameFailed>(UserActionTypes.LoginUsernameFailed)
        );

        this.passwordFailed$ = this.actions$.pipe(
            ofType<LoginPasswordFailed>(UserActionTypes.LoginPasswordFailed)
        );

        this.registerFailed$ = this.actions$.pipe(
            ofType<RegisterError>(UserActionTypes.RegisterError)
        );
    }

    login(username: string, password: string) {
        this.store.dispatch(new LoginRequest(username, password));
    }

    logout() {
        this.store.dispatch(new LogoutRequest);
    }

    register(email: string, password: string) {
        this.store.dispatch(new RegisterRequest(email, password));
    }

    getAuth() {
        return from(firebase.auth().currentUser.getIdToken())
    }
}