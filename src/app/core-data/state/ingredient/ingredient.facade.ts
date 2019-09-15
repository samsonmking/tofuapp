import { AppState, selectIngredientsForRecipe, selectAllRecipes, selectTotalIngredientsForRecipe } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetIngredientsForRecipeRequest } from './ingredient.actions';
import { Injectable } from '@angular/core';
import { tap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientFacade {
    constructor(private store: Store<AppState>, private actions$: ActionsSubject) {

    }

    getIngredientsForRecipe(recipeId: number) {
        const ingredientsForRecipe$ = this.store.pipe(select(selectIngredientsForRecipe(recipeId)));

        return ingredientsForRecipe$.pipe(
            tap(i => {
                if (i.length === 0) { 
                    this.store.dispatch(new GetIngredientsForRecipeRequest(recipeId)) 
                }
            })
        );
    }

}