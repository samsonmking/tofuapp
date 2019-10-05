import { Injectable } from '@angular/core';
import { AppState, selectRecipesInCurrentList, selectRecipeIdsInCurrentList } from '..';
import { Store, select } from '@ngrx/store';
import { AddRecipeToList } from './shopping-list-items.actions';

@Injectable({ providedIn: 'root' })
export class ShoppingListItemFacade {
    recipesInCurrentList$ = this.store.pipe(select(selectRecipesInCurrentList));
    recipeIdsInCurrentList$ = this.store.pipe(select(selectRecipeIdsInCurrentList));

    constructor(private readonly store: Store<AppState>) {
        
    }

    public addRecipeToList(recipeId: number) {
        this.store.dispatch(new AddRecipeToList(recipeId));
    }
}