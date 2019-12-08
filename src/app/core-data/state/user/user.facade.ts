import { AppState, selectUser } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LoginRequest, LogoutRequest } from './user.actions';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserState } from './user.reducer';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    loggedIn$: Observable<boolean>;
    user$: Observable<UserState>;


    constructor(private store: Store<AppState>, private actions$: ActionsSubject) {
        this.loggedIn$ = this.store.pipe(
            select(selectUser),
            map(user => user.loggedIn)
        );

        this.user$ = this.store.pipe(
            select(selectUser)
        );
    }

    login(username: string, password: string) {
        this.store.dispatch(new LoginRequest(username, password));
    }

    logout() {
        this.store.dispatch(new LogoutRequest);
    }
}