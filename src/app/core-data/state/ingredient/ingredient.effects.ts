import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { selectAllIngredients } from './ingredient.reducer';
import {
    IngredientActionsType,
    GetIngredientsForRecipeRequest,
    GetIngredientsForRecipeComplete,
    GetIngredientsForRecipeInList,
    GetIngredientsForRecipeInListComplete,
    GetIngredientsForCurrentListRequest,
    GetIngredientsForCurrentListComplete
} from './ingredient.actions';
import { IngredientService } from '../../services/ingredient/ingredient-service';
import { map, switchMap, withLatestFrom, mergeMap, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppState, selectRecipeIdsInCurrentList, selectIngredients } from '..';
import { Store, select } from '@ngrx/store';
import { GetItemsForListComplete, ShoppingListItemsActionTypes } from '../shopping-list-item/shopping-list-items.actions';
import { EMPTY, zip } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientEffects {

    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<AppState>,
        private ingredientService: IngredientService,
        private readonly store: Store<AppState>) {

    }

    @Effect()
    getIngredientForRecipeInList$ = this.dataPersistence.pessimisticUpdate(IngredientActionsType.GetIngredientsForRecipeInList, {
        run: (action: GetIngredientsForRecipeInList, state) => {
            const storedIngredients = selectAllIngredients(state.ingredients).filter(i => i.recipe_id === action.recipeId);
            if (storedIngredients.length > 0) {
                return new GetIngredientsForRecipeInListComplete(storedIngredients);
            } else {
                return this.ingredientService.getIngredientForRecipe(action.recipeId).pipe(
                    switchMap(ingredients => [
                        new GetIngredientsForRecipeInListComplete(ingredients),
                        new GetIngredientsForRecipeComplete(ingredients)
                    ])
                );
            }
        },

        onError: (action, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    getIngredientsForRecipe$ = this.actions$.pipe(
        ofType<GetIngredientsForRecipeRequest>(IngredientActionsType.GetIngredientsForRecipeRequest),
        withLatestFrom(this.store.pipe(select(selectIngredients))),
        mergeMap(([action, ingredients]) => {
            const inStore = ingredients.findIndex(i => i.recipe_id === action.recipeId) > -1;
            return inStore ? EMPTY : this.ingredientService.getIngredientForRecipe(action.recipeId).pipe(
                map(i => new GetIngredientsForRecipeComplete(i))
            )
        })
    );

    @Effect()
    getCurrentList = this.actions$.pipe(
        ofType<GetItemsForListComplete>(ShoppingListItemsActionTypes.GetItemsForListComplete),
        map(_ =>  new GetIngredientsForCurrentListRequest())
    );

    @Effect()
    getIngredientsForCurrentList$ = this.actions$.pipe(
        ofType<GetIngredientsForCurrentListRequest>(IngredientActionsType.GetIngredientsForCurrentListRequest),
        switchMap(_ => this.store.pipe(
            select(selectRecipeIdsInCurrentList),
            first()
        )),
        switchMap(idSet => {
            const ids = Array.from(idSet);
            const requests$ = ids.map(id => this.ingredientService.getIngredientForRecipe(id));
            return zip(...requests$).pipe(
                map(nested => this.flat(nested)),
                map(ingredients => new GetIngredientsForCurrentListComplete(ingredients))
            )
        })
    );

    private flat<T>(arr: Array<Array<T>>) {
        return arr.reduce((acc, curr) => [...acc, ...curr], []);
    }
}