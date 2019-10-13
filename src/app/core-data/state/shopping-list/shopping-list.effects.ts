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
import { map, filter, withLatestFrom, switchMap, mergeMap, tap } from 'rxjs/operators';
import { UserActionTypes, GetUserComplete, ResetDefaultOnDeleteRequest, ResetDefaultOnDeleteComplete } from '../user/user.actions';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { ShoppingListItemsActionTypes, RemoveItemsFromListRequest, RemoveItemsFromListComplete } from '../shopping-list-item/shopping-list-items.actions';
import { zip, empty, of, EMPTY } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ShoppingListEffects {

    constructor(
        private readonly actions$: Actions,
        private dataPersisence: DataPersistence<ShoppingListState>,
        private readonly service: ShoppingListService,
        private readonly store: Store<AppState>,
        private readonly router: Router,
        private route: ActivatedRoute
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
                if(action.id && params['id'] && params['id'] !== action.id) {
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
        switchMap(action => [
                new RemoveItemsFromListRequest(action.id), 
                new ResetDefaultOnDeleteRequest(action.id)
            ]
        )
    );

    @Effect()
    updateDefaultList$ = this.actions$.pipe(
        ofType<DeleteShoppingListComplete>(ShoppingListActionTypes.DeleteShoppingListComplete),
        withLatestFrom(this.store),
        mergeMap(([action, store]) => {
            if (!store.user.default_list_id) {
                return of(new CreateDefaultListRequest())
            } else if(store.shoppingLists.defaultListId === action.id) {
                return of(new SetDefaultList(store.user.default_list_id));
            } else {
                return EMPTY;
            }
        })
    );

    deletePreReq$ = zip(
        this.actions$.pipe(ofType<RemoveItemsFromListComplete>(ShoppingListItemsActionTypes.RemoveItemsFromListComplete)),
        this.actions$.pipe(ofType<ResetDefaultOnDeleteComplete>(UserActionTypes.ResetDefaultOnDeleteComplete))
    );

    @Effect()
    deletePreReqComplete$ = this.deletePreReq$.pipe(
        mergeMap(([removeItems]) => this.service.deleteShoppingList(removeItems.listId)),
        map(id => new DeleteShoppingListComplete(id))
    );
}