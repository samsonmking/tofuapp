import { Injectable } from '@angular/core';
import { AppState, selectRecipesInCurrentList } from '..';
import { Store, select } from '@ngrx/store';
import { AddRecipeToList } from './shopping-list-items.actions';

@Injectable({ providedIn: 'root' })
export class ShoppingListItemFacade {
    constructor(private readonly store: Store<AppState>) {
        
    }

    public recipesInCurrentList$ = this.store.pipe(
        select(selectRecipesInCurrentList)
    );

    public addRecipeToList(recipeId: number) {
        this.store.dispatch(new AddRecipeToList(recipeId));
    }
}