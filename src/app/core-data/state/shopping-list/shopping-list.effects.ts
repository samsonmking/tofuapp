import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ShoppingListState } from './shopping-list.reducer';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ShoppingListActionTypes, GetListsRequest, GetListsComplete, CreateDefaultListRequest, CreateDefaultListComplete, SetDefaultList } from './shopping-list.actions';
import { map } from 'rxjs/operators';
import { UserActionTypes, GetUserComplete } from '../user/user.actions';

@Injectable({providedIn: 'root'})
export class ShoppingListEffects {

    constructor(
        private readonly actions$: Actions,
        private dataPersisence: DataPersistence<ShoppingListState>,
        private readonly service: ShoppingListService
    ) {}
    
    @Effect()
    getShoppingLists$ = this.dataPersisence.pessimisticUpdate(ShoppingListActionTypes.GetListsRequest, {
        run: (action: GetListsRequest, state: ShoppingListState) => {
            return this.service.getAllShoppingLists().pipe(
                map(lists => new GetListsComplete(lists))
            );
        },
        onError: (action: GetListsRequest, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    getUser$ = this.dataPersisence.pessimisticUpdate(UserActionTypes.GetUserComplete, {
        run: (action: GetUserComplete, state) => {
            return action.user.default_list_id ? 
             new SetDefaultList(action.user.default_list_id) : new CreateDefaultListRequest();
        },
        onError: (action, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    createDefaultList$ = this.dataPersisence.pessimisticUpdate(ShoppingListActionTypes.CreateDefaultListRequest, {
        run: (action, state) => {
            return this.service.addShoppingList({ name: 'DEFAULT' }).pipe(
                map(list => new CreateDefaultListComplete(list))
            );
        },
        onError: (action, error) => {
            console.log('Error', error);
        }
    });

}