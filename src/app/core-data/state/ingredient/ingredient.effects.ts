import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { IngredientState, selectAllIngredients } from './ingredient.reducer';
import { IngredientActionsType, GetIngredientsForRecipeRequest, GetIngredientsForRecipeComplete, GetIngredientsForRecipeInList, GetIngredientsForRecipeInListComplete } from './ingredient.actions';
import { IngredientService } from '../../services/ingredient/ingredient-service';
import { map, flatMap, merge, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AppState } from '..';

@Injectable({providedIn: 'root'})
export class IngredientEffects {

    constructor(
        private actions$: Actions, 
        private dataPersistence: DataPersistence<AppState>,
        private ingredientService: IngredientService) {

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
}