import { Injectable } from '@angular/core';
import { AppState, selectRecipesInCurrentList, selectRecipeIdsInCurrentList, selectItemsInCurrentList, selectDisplayListItems } from '..';
import { Store, select } from '@ngrx/store';
import { AddRecipeToList, RemoveRecipeFromList, CheckShoppingListItemRequest } from './shopping-list-items.actions';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShoppingListItemFacade {
    recipesInCurrentList$ = this.store.pipe(select(selectRecipesInCurrentList));
    recipeIdsInCurrentList$ = this.store.pipe(select(selectRecipeIdsInCurrentList));
    itemsInCurrentList$ = this.store.pipe(select(selectItemsInCurrentList));
    displayItemsInCurrentList$ = this.store.pipe(
        select(selectDisplayListItems),
        filter(result => result.success === true),
        map(result => result.items)
    );

    constructor(private readonly store: Store<AppState>) {
    }

    public addRecipeToList(recipeId: number) {
        this.store.dispatch(new AddRecipeToList(recipeId));
    }

    public removeRecipeFromList(recipeId: number) {
        this.store.dispatch(new RemoveRecipeFromList(recipeId));
    }

    public checkListItem(id: number, isChecked: boolean) {
        return this.store.dispatch(new CheckShoppingListItemRequest(id, isChecked));
    }
}