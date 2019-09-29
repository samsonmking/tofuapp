import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { UserState } from './user.reducer';
import { UserService } from '../../services/user/user.service';
import { UserActionTypes, GetUserRequest, GetUserComplete, UpdateUserRequest, UpdateUserComplete } from './user.actions';
import { map } from 'rxjs/operators';
import { ShoppingListActionTypes, CreateDefaultListComplete } from '../shopping-list/shopping-list.actions';
import { AppState } from '..';

@Injectable({providedIn: 'root'})
export class UserEffects {

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<AppState>,
        private service: UserService
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
    })

}