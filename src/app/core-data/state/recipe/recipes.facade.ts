import { Injectable } from '@angular/core';
import { AppState, selectAllRecipes, selectRecipeEntities, selectRecipeById } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetAllRequest } from './recipes.actions';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeFacade {
    recipes$ = this.store.pipe(select(selectAllRecipes));

    getAllRecipes(): void {
        this.store.dispatch(new GetAllRequest());
    }

    getRecipe(id: number) {
        return this.store.pipe(select(selectRecipeById(id)));
    }

    constructor(private store: Store<AppState>,
        private actions$: ActionsSubject) {}
}