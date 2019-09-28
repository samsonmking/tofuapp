import { AppState, selectUser } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetUserRequest } from './user.actions';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {

    constructor(private store: Store<AppState>,
        private actions$: ActionsSubject) {}

    user$ = this.store.pipe(select(selectUser));

    getUser(userId: string) {
        this.store.dispatch(new GetUserRequest(userId));
    }
}