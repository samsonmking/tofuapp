import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ShoppingListState } from './shopping-list.reducer';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ShoppingListActionTypes, 
    GetListsRequest, 
    GetListsComplete, 
    CreateDefaultListRequest,
    CreateDefaultListComplete, 
    SetDefaultList, 
    UpdateShoppingListRequest, 
    UpdateShoppingListComplete, 
    DeleteShoppingListRequest, 
    DeleteShoppingListComplete } from './shopping-list.actions';
import { map, filter, withLatestFrom, switchMap, mergeMap } from 'rxjs/operators';
import { UserActionTypes, GetUserComplete, SetDefaultListRequest, SetDefaultListComplete } from '../user/user.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { ShoppingListItemsActionTypes, RemoveItemsFromListRequest, RemoveItemsFromListComplete } from '../shopping-list-item/shopping-list-items.actions';
import { zip } from 'rxjs';

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
            return this.service.addShoppingList({ name: 'New List' }).pipe(
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

    @Effect()
    deleteShoppingList$ = this.actions$.pipe(
        ofType<DeleteShoppingListRequest>(ShoppingListActionTypes.DeleteShoppingListRequest),
        withLatestFrom(this.store),
        switchMap(([action, store]) => [
            new RemoveItemsFromListRequest(action.id), 
            new SetDefaultListRequest(store.shoppingLists.ids[0] as number)
        ])
    );

    @Effect()
    updateDefaultList$ = this.actions$.pipe(
        ofType<SetDefaultListComplete>(UserActionTypes.SetDefaultListComplete),
        map(action => new SetDefaultList(action.listId))
    );

    deletePreReq$ = zip(
        this.actions$.pipe(ofType<RemoveItemsFromListComplete>(ShoppingListItemsActionTypes.RemoveItemsFromListComplete)),
        this.actions$.pipe(ofType<SetDefaultList>(ShoppingListActionTypes.SetDefaultList))
    );

    @Effect()
    deletePreReqComplete$ = this.deletePreReq$.pipe(
        mergeMap(([removeItems]) => this.service.deleteShoppingList(removeItems.listId)),
        map(id => new DeleteShoppingListComplete(id))
    );
}