import { Injectable } from "@angular/core";
import { AppState, selectAllRecipes } from '..';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { GetAllRequest } from './recipes.actions';

@Injectable({
    providedIn: 'root'
})
export class RecipeFacade {
    recipes$ = this.store.pipe(select(selectAllRecipes));

    getAllRecipes(): void {
        this.store.dispatch(new GetAllRequest());
    }

    constructor(private store: Store<AppState>,
        private actions$: ActionsSubject) {}
}