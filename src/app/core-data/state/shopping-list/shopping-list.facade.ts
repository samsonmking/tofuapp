import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListFacade {
    constructor(private readonly store: Store<AppState>) {}

    defaultShoppingList$ = this.store;
}