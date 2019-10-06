import { Injectable } from '@angular/core';
import { AppState, selectRecipesInCurrentList, selectRecipeIdsInCurrentList, selectItemsInCurrentList } from '..';
import { Store, select } from '@ngrx/store';
import { AddRecipeToList, RemoveRecipeFromList } from './shopping-list-items.actions';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShoppingListItemFacade {
    recipesInCurrentList$ = this.store.pipe(select(selectRecipesInCurrentList));
    recipeIdsInCurrentList$ = this.store.pipe(select(selectRecipeIdsInCurrentList));
    itemsInCurrentList$ = this.store.pipe(select(selectItemsInCurrentList));

    constructor(private readonly store: Store<AppState>) {
        
    }

    public addRecipeToList(recipeId: number) {
        this.store.dispatch(new AddRecipeToList(recipeId));
    }

    public removeRecipeFromList(recipeId: number) {
        this.store.dispatch(new RemoveRecipeFromList(recipeId));
    }
}