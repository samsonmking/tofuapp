import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ShoppingListState } from './shopping-list.reducer';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ShoppingListActionTypes, GetListsRequest, GetListsComplete, CreateDefaultListRequest, CreateDefaultListComplete, SetDefaultList, UpdateShoppingListRequest, UpdateShoppingListComplete } from './shopping-list.actions';
import { map, filter, withLatestFrom, switchMap } from 'rxjs/operators';
import { UserActionTypes, GetUserComplete } from '../user/user.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATED, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';
import { AppState } from '..';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class ShoppingListEffects {

    constructor(
        private readonly actions$: Actions,
        private dataPersisence: DataPersistence<ShoppingListState>,
        private readonly service: ShoppingListService,
        private readonly store: Store<AppState>
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

    @Effect()
    routerNavigationToLists$ = this.actions$.pipe(
        ofType<RouterNavigatedAction<RouterStateUrl>>(ROUTER_NAVIGATED),
        filter(route => {
            return route.payload.routerState.url.includes('lists') &&
                route.payload.routerState.params['id']
        }),
        map(route => {
            const id = parseInt(route.payload.routerState.params['id']);
            return new SetDefaultList(id)
        })
    );

    @Effect()
    updateShoppingList$ = this.actions$.pipe(
        ofType<UpdateShoppingListRequest>(ShoppingListActionTypes.UpdateShoppingListRequest),
        switchMap(action => this.service.updateShoppingList(action.list)),
        map(list => new UpdateShoppingListComplete(list))
    );
}