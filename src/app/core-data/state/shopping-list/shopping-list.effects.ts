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
    DeleteShoppingListComplete, 
    CreateNewListRequest,
    CreateNewListComplete} from './shopping-list.actions';
import { map, filter, withLatestFrom, switchMap, mergeMap, tap } from 'rxjs/operators';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { ShoppingListItemsActionTypes, RemoveItemsFromListRequest, RemoveItemsFromListComplete } from '../shopping-list-item/shopping-list-items.actions';
import { of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { UserActionTypes } from '../user/user.actions';

@Injectable({providedIn: 'root'})
export class ShoppingListEffects {

    constructor(
        private readonly actions$: Actions,
        private dataPersisence: DataPersistence<ShoppingListState>,
        private readonly service: ShoppingListService,
        private readonly store: Store<AppState>,
        private readonly router: Router) {}
    
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
    createDefaultList$ = this.dataPersisence.pessimisticUpdate(ShoppingListActionTypes.CreateDefaultListRequest, {
        run: (action, state) => {
            return this.service.addShoppingList({ name: 'New Shopping List' }).pipe(
                map(list => new CreateDefaultListComplete(list))
            );
        },
        onError: (action, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    createNewList$ = this.actions$.pipe(
        ofType<CreateNewListRequest>(ShoppingListActionTypes.CreateNewListRequest),
        switchMap(action => this.service.addShoppingList({ name: action.name }).pipe(
            map(list => new CreateNewListComplete(list))
        ))
    );

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

    @Effect({ dispatch: false })
    defaultCreated$ = this.actions$.pipe(
        ofType<CreateDefaultListComplete>(ShoppingListActionTypes.CreateDefaultListComplete),
        withLatestFrom(this.actions$.pipe(ofType<RouterNavigatedAction<RouterStateUrl>>(ROUTER_NAVIGATED))),
        tap(([action, route]) => {
            if(route.payload.routerState.url.includes('lists')) {
                this.router.navigate([`/lists/${action.list.id}`]);
            }
        })
    );

    @Effect({ dispatch: false })
    defaultSet$ = this.actions$.pipe(
        ofType<SetDefaultList>(ShoppingListActionTypes.SetDefaultList),
        withLatestFrom(this.actions$.pipe(ofType<RouterNavigatedAction<RouterStateUrl>>(ROUTER_NAVIGATED))),
        tap(([action, route]) => {
            if(route.payload.routerState.url.includes('lists')) {
                const params = route.payload.routerState.params;
                if(action.id) {
                    this.router.navigate([`/lists/${action.id}`]);
                }
            }
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
        map(action => new RemoveItemsFromListRequest(action.id))
    );

    @Effect()
    updateDefaultList$ = this.actions$.pipe(
        ofType(ShoppingListActionTypes.DeleteShoppingListComplete, ShoppingListActionTypes.GetListsComplete),
        withLatestFrom(this.store),
        mergeMap(([action, store]) => {
            if (store.shoppingLists.defaultListId) {    // selected list was not deleted => nothing to do
                return EMPTY;
            }
            const listIds = store.shoppingLists.ids;
            if (listIds.length > 0) {                   // other lists available => set default to highest id
                return of(new SetDefaultList(Math.max(...listIds as number[])))
            } else {
                return of(new CreateDefaultListRequest())
            }
        })
    );

    @Effect()
    loggedIn$ = this.actions$.pipe(
        ofType(UserActionTypes.LoginComplete, UserActionTypes.LoadUserComplete),
        map(_ => new GetListsRequest)
    );

    @Effect()
    deletePreReqComplete$ = this.actions$.pipe(
        ofType<RemoveItemsFromListComplete>(ShoppingListItemsActionTypes.RemoveItemsFromListComplete),
        mergeMap((removeItems) => this.service.deleteShoppingList(removeItems.listId)),
        map(id => new DeleteShoppingListComplete(id))
    );
}