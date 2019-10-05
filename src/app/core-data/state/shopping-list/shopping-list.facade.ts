import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { GetListsComplete, GetListsRequest } from './shopping-list.actions';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListFacade {
    constructor(private readonly store: Store<AppState>) {}

    public getAllShoppingLists() {
        this.store.dispatch(new GetListsRequest());
    }
}