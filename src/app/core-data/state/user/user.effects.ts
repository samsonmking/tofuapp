import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { UserState } from './user.reducer';
import { UserService } from '../../services/user/user.service';
import { UserActionTypes, GetUserRequest, GetUserComplete, UpdateUserRequest, UpdateUserComplete, ResetDefaultOnDeleteRequest, ResetDefaultOnDeleteComplete } from './user.actions';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { ShoppingListActionTypes, CreateDefaultListComplete, DeleteShoppingListRequest } from '../shopping-list/shopping-list.actions';
import { AppState, selectUser } from '..';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserEffects {

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<AppState>,
        private service: UserService,
        private store: Store<AppState>
    ) {}

    @Effect()
    getUser$ = this.dataPersistence.pessimisticUpdate(UserActionTypes.GetUserRequest, {
        run: (action: GetUserRequest, state) => {
            return this.service.getUser(action.user).pipe(
                map(user => new GetUserComplete(user))
            );
        },
        onError: (action: GetUserRequest, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    updateUser$ = this.dataPersistence.pessimisticUpdate(UserActionTypes.UpdateUserRequest, {
        run: (action: UpdateUserRequest, state) => {
            return this.service.updateUser(action.user).pipe(
                map(user => new UpdateUserComplete(user))
            );
        },
        onError: (action: UpdateUserRequest, error) => {
            console.log('Error', error)
        }
    });

    @Effect()
    defaultListCreated$ = this.dataPersistence.pessimisticUpdate(ShoppingListActionTypes.CreateDefaultListComplete, {
        run: (action: CreateDefaultListComplete, state) => {
            return new UpdateUserRequest({ ...state.user, default_list_id: action.list.id })
        },
        onError: (action: CreateDefaultListComplete, error) => {
            console.log('Error', error);
        }
    });


    @Effect()
    setDefaultUser = this.actions$.pipe(
        ofType<ResetDefaultOnDeleteRequest>(UserActionTypes.ResetDefaultOnDeleteRequest),
        withLatestFrom(this.store.pipe(select(selectUser))),
        mergeMap(([action, user]) => action.listToDeleteId === user.default_list_id ? 
            this.service.updateUser({ ...user, default_list_id: null }) :
            of(user)
        ),
        map(user => new ResetDefaultOnDeleteComplete(user.default_list_id))
    );

}