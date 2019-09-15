import { AppState, selectIngredientsForRecipe } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetIngredientsForRecipeRequest } from './ingredient.actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IngredientFacade {
    constructor(private store: Store<AppState>, private actions$: ActionsSubject) {

    }

    getIngredientsForRecipe(recipeId: number) {
        this.store.dispatch(new GetIngredientsForRecipeRequest(recipeId)) ;
        return this.store.pipe(select(selectIngredientsForRecipe(recipeId)));
    }

}