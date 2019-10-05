import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ListItemsState } from './shopping-list-items.reducer';
import { ShoppingListItemService } from '../../services/shopping-list-item/shopping-list-item.service';
import { AddRecipeToList, ShoppingListItemsActionTypes, AddItemsToList, AddItemsToListComplete, GetItemsForListRequest, GetItemsForListComplete } from './shopping-list-items.actions';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { GetIngredientsForRecipeInList, GetIngredientsForRecipeComplete, GetIngredientsForRecipeInListComplete, IngredientActionsType } from '../ingredient/ingredient.actions';
import { of } from 'rxjs';
import { ShoppingListActionTypes, SetDefaultList } from '../shopping-list/shopping-list.actions';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';
import { AppState } from '..';
import { Store, select } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class ShoppingListItemEffects {

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<AppState>,
        private service: ShoppingListItemService,
    ) {}

    @Effect()
    setDefaultList$ = this.actions$.pipe(
        ofType<SetDefaultList>(ShoppingListActionTypes.SetDefaultList),
        switchMap(defaultList => of(new GetItemsForListRequest(defaultList.id)))
    );

    @Effect()
    getItemsForList$ = this.actions$.pipe(
        ofType<GetItemsForListRequest>(ShoppingListItemsActionTypes.GetItemsForListRequest),
        switchMap(request => this.service.getItemsForList(request.listId)),
        map(items => new GetItemsForListComplete(items))
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
            const listId = state.shoppingLists.selectedId;
            const listItems: ShoppingListItem[] = action.items.map(ri => 
                ({ shopping_list_id: listId, ingredient_id: ri.id, recipe_id: ri.recipe_id }));
            return this.service.addItemsToList(listId, listItems).pipe(
                map(li => {
                    return new AddItemsToListComplete(li);
                })
            );
        },
        onError: (action, error) => console.log('Error', error)
    });

}