import { Injectable } from '@angular/core';
import { AppState, selectAllRecipes, selectRecipeById, selectRecipeState } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import {
    GetAllRequest,
    EntrySubmitted,
    RecipeCreated,
    RecipesActionTypes,
    RecipeCreationError,
    DeleteRecipeRequest,
    DeleteRecipeComplete
} from './recipes.actions';
import { NewRecipe } from '../../models/manual-entry/new-recipe';
import { ofType } from '@ngrx/effects';

@Injectable({
    providedIn: 'root'
})
export class RecipeFacade {
    recipeState$ = this.store.pipe(select(selectRecipeState));
    recipes$ = this.store.pipe(select(selectAllRecipes));
    recipeCreated$ = this.actions$.pipe(ofType<RecipeCreated>(RecipesActionTypes.RecipeCreated));
    recipeCreationErrors$ = this.actions$.pipe(ofType<RecipeCreationError>(RecipesActionTypes.RecipeCreationError));
    recipeDeleted$ = this.actions$.pipe(ofType<DeleteRecipeComplete>(RecipesActionTypes.DeleteComplete));

    getAllRecipes(): void {
        this.store.dispatch(new GetAllRequest());
    }

    getRecipe(id: number) {
        return this.store.pipe(select(selectRecipeById(id)));
    }

    submitRecipe(recipe: NewRecipe) {
        this.store.dispatch(new EntrySubmitted(recipe));
    }

    deleteRecipe(id: number) {
        this.store.dispatch(new DeleteRecipeRequest(id));
    }

    constructor(private store: Store<AppState>,
        private actions$: ActionsSubject) {}
}