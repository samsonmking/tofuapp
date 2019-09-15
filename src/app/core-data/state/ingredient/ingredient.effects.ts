import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { IngredientState } from './ingredient.reducer';
import { RecipesActionTypes } from '../recipe/recipes.actions';
import { IngredientActionsType, GetIngredientsForRecipeRequest, GetIngredientsForRecipeComplete } from './ingredient.actions';
import { IngredientService } from '../../services/ingredient/ingredient-service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class IngredientEffects {

    constructor(
        private actions$: Actions, 
        private dataPersistence: DataPersistence<IngredientState>,
        private ingredientService: IngredientService) {

    }

    @Effect()
    getIngredientsForRecipe$ = this.dataPersistence.pessimisticUpdate(IngredientActionsType.GetIngredientsForRecipeRequest, {
        run: (action: GetIngredientsForRecipeRequest, state: IngredientState) => {
            return this.ingredientService.getIngredientForRecipe(action.recipeId).pipe(
                map(ingredients => new GetIngredientsForRecipeComplete(ingredients))
            );
        },

        onError: (action: GetIngredientsForRecipeRequest, error) => {
            console.log('Error', error);
        }
    });
}