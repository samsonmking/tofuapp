import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ListItemsState } from './shopping-list-items.reducer';
import { ShoppingListItemService } from '../../services/shopping-list-item/shopping-list-item.service';
import { AddRecipeToList, ShoppingListItemsActionTypes, AddItemsToList, AddItemsToListComplete, GetItemsForListRequest, GetItemsForListComplete, RemoveRecipeFromList, RemoveRecipeFromListComplete, RemoveItemsFromListRequest, RemoveItemsFromListComplete, CheckShoppingListItemRequest, CheckShoppingListItemComplete } from './shopping-list-items.actions';
import { mergeMap, switchMap, map, withLatestFrom, catchError, first } from 'rxjs/operators';
import { GetIngredientsForRecipeInList, GetIngredientsForRecipeComplete, GetIngredientsForRecipeInListComplete, IngredientActionsType } from '../ingredient/ingredient.actions';
import { of, zip, empty, EMPTY } from 'rxjs';
import { ShoppingListActionTypes, SetDefaultList } from '../shopping-list/shopping-list.actions';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';
import { AppState, selectShoppingListItems, selectShoppingListState, selectShoppingListItemsState, selectShoppingListEntities } from '..';
import { Store, select } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ShoppingListItemEffects {

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<AppState>,
        private service: ShoppingListItemService,
        private store: Store<AppState>
    ) { }

    @Effect()
    setDefaultList$ = this.actions$.pipe(
        ofType<SetDefaultList>(ShoppingListActionTypes.SetDefaultList),
        switchMap(defaultList => defaultList.id ? of(new GetItemsForListRequest(defaultList.id)) : empty())
    );

    @Effect()
    getItemsForList$ = this.actions$.pipe(
        ofType<GetItemsForListRequest>(ShoppingListItemsActionTypes.GetItemsForListRequest),
        withLatestFrom(this.store.pipe(
            select(selectShoppingListItems)
        )),
        mergeMap(([request, listItems]) => {
            if (listItems.findIndex(li => li.shopping_list_id === request.listId) > -1) {
                return of(new GetItemsForListComplete([]))
            } else {
                return this.service.getItemsForList(request.listId).pipe(
                    map(items => new GetItemsForListComplete(items))
                );
            }
        })
    );

    @Effect()
    addRecipeToList$ = this.actions$.pipe(
        ofType<AddRecipeToList>(ShoppingListItemsActionTypes.AddRecipeToList),
        switchMap(r => {
            return of(new GetIngredientsForRecipeInList(r.recipeId));
        })
    );

    @Effect()
    getIngredientForRecipe$ = this.actions$.pipe(
        ofType<GetIngredientsForRecipeInListComplete>(IngredientActionsType.GetIngredientsForRecipeInListComplete),
        switchMap(i => {
            return of(new AddItemsToList(i.payload));
        })
    );

    @Effect()
    addItemsToList$ = this.dataPersistence.pessimisticUpdate(ShoppingListItemsActionTypes.AddItemsToList, {
        run: (action: AddItemsToList, state) => {
            const listId = state.shoppingLists.defaultListId;
            const listItems: ShoppingListItem[] = action.items.map(ri =>
                ({ shopping_list_id: listId, ingredient_id: ri.id, recipe_id: ri.recipe_id, checked: false }));
            return this.service.addItemsToList(listId, listItems).pipe(
                map(li => {
                    return new AddItemsToListComplete(li);
                })
            );
        },
        onError: (action, error) => console.log('Error', error)
    });

    @Effect()
    deleteRecipeFromList$ = this.dataPersistence.pessimisticUpdate(ShoppingListItemsActionTypes.RemoveRecipeFromList, {
        run: (action: RemoveRecipeFromList, state) => {
            const listId = state.shoppingLists.defaultListId;
            return this.service.deleteRecipeFromList(listId, action.recipeId).pipe(
                map(deleted => new RemoveRecipeFromListComplete(deleted))
            );
        },
        onError: (action, error) => console.log('Error', error)
    });

    @Effect()
    removeList$ = this.actions$.pipe(
        ofType<RemoveItemsFromListRequest>(ShoppingListItemsActionTypes.RemoveItemsFromListRequest),
        switchMap(action => zip(of(action.listId), this.service.deleteItemsFromList(action.listId))),
        map(([listId, items]) => new RemoveItemsFromListComplete(listId, items))
    );

    @Effect()
    checkItemRequest = this.actions$.pipe(
        ofType<CheckShoppingListItemRequest>(ShoppingListItemsActionTypes.CheckShoppingListItemRequest),
        withLatestFrom(this.store.pipe(select(selectShoppingListItemsState))),
        mergeMap(([action, lists]) => {
            const existingItem = lists.entities[action.id];
            return this.service.updateShoppingListItem({ ...existingItem, checked: action.isChecked }).pipe(
                map(item => new CheckShoppingListItemComplete(item)),
                catchError(e => EMPTY)
            )
        })
    );

}