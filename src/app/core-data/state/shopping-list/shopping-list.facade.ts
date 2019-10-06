import { Injectable } from '@angular/core';
import { AppState, selectAllLists } from '..';
import { Store, select } from '@ngrx/store';
import { GetListsComplete, GetListsRequest } from './shopping-list.actions';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListFacade {
    lists$ = this.store.pipe(select(selectAllLists))
    constructor(private readonly store: Store<AppState>) {}

    public getAllShoppingLists() {
        this.store.dispatch(new GetListsRequest());
    }
}