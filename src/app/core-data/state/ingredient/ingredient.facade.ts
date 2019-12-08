import { AppState, selectIngredientsForRecipe, selectIngredients, selectIngredientState } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetIngredientsForRecipeRequest, GetIngredientsForCurrentListRequest } from './ingredient.actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IngredientFacade {
    $ingredientState = this.store.pipe(select(selectIngredientState));
    $ingredients = this.store.pipe(select(selectIngredients));

    constructor(private store: Store<AppState>, private actions$: ActionsSubject) {

    }

    getIngredientsForRecipe(recipeId: number) {
        this.store.dispatch(new GetIngredientsForRecipeRequest(recipeId)) ;
        return this.store.pipe(select(selectIngredientsForRecipe(recipeId)));
    }

}