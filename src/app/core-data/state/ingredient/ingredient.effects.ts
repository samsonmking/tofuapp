import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { IngredientState, selectAllIngredients } from './ingredient.reducer';
import { IngredientActionsType, GetIngredientsForRecipeRequest, GetIngredientsForRecipeComplete, GetIngredientsForRecipeInList, GetIngredientsForRecipeInListComplete, GetIngredientsForCurrentListRequest, GetIngredientsForCurrentListComplete } from './ingredient.actions';
import { IngredientService } from '../../services/ingredient/ingredient-service';
import { map, flatMap, merge, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of, zip, from, forkJoin } from 'rxjs';
import { AppState, selectRecipeIdsInCurrentList } from '..';
import { Store, select } from '@ngrx/store';
import { promise } from 'protractor';
import { GetItemsForListComplete, ShoppingListItemsActionTypes } from '../shopping-list-item/shopping-list-items.actions';

@Injectable({providedIn: 'root'})
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
    getIngredientsForRecipe$ = this.dataPersistence.pessimisticUpdate(IngredientActionsType.GetIngredientsForRecipeRequest, {
        run: (action: GetIngredientsForRecipeRequest, state) => {
            return this.ingredientService.getIngredientForRecipe(action.recipeId).pipe(
                map(ingredients => new GetIngredientsForRecipeComplete(ingredients))
            );
        },

        onError: (action: GetIngredientsForRecipeRequest, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    getCurrentList = this.actions$.pipe(
        ofType<GetItemsForListComplete>(ShoppingListItemsActionTypes.GetItemsForListComplete),
        map(_ => new GetIngredientsForCurrentListRequest())
    );

    @Effect()
    getIngredientsForCurrentList$ = this.actions$.pipe(
        ofType<GetIngredientsForCurrentListRequest>(IngredientActionsType.GetIngredientsForCurrentListRequest),
        switchMap(_ => this.store.pipe(select(selectRecipeIdsInCurrentList))),
        switchMap(idSet => {
            const ids = Array.from(idSet);
            return ids.map(id => new GetIngredientsForRecipeRequest(id))
        })
    );
}