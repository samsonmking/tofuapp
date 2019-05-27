import { Injectable } from '@angular/core';
import { AppState, selectAllRecipes, selectRecipeEntities } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetAllRequest, GetRecipeDetails } from './recipes.actions';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeFacade {
    recipes$ = this.store.pipe(select(selectAllRecipes));

    getAllRecipes(): void {
        this.store.dispatch(new GetAllRequest());
    }

    getRecipeDetails(id: number) {
        this.store.dispatch(new GetRecipeDetails(id));
        return this.store.pipe(
            select(selectRecipeEntities),
            map(entities => entities[id])
        );
    }

    constructor(private store: Store<AppState>,
        private actions$: ActionsSubject) {}
}