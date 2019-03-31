import { Injectable } from "@angular/core";
import { ActionsSubject, Store, select } from '@ngrx/store';
import { NewRecipe } from '../../models/manual-entry/new-recipe';
import { EntrySubmitted } from './manual-entry.actions';
import { AppState, selectRecipeCreated } from '..';

@Injectable({
    providedIn: 'root'
})
export class ManualEntryFacade {
    recipeCreated$ = this.store.pipe(select(selectRecipeCreated));

    submitRecipe(recipe: NewRecipe) {
        this.store.dispatch(new EntrySubmitted(recipe));
    }

    constructor(private store: Store<AppState>, 
        private actions$: ActionsSubject) {
    }
}