import { Injectable } from '@angular/core';
import { AppState, selectAllLists, selectShoppingListState } from '..';
import { Store, select } from '@ngrx/store';
import { GetListsRequest, 
    CreateDefaultListRequest,
    UpdateShoppingListRequest,
    DeleteShoppingListRequest } from './shopping-list.actions';
import { filter, map } from 'rxjs/operators';
import { ShoppingList } from '../../models/shopping-list/shopping-list';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListFacade {
    lists$ = this.store.pipe(select(selectAllLists))
    currentList$ = this.store.pipe(
        select(selectShoppingListState),
        filter(listState => listState.defaultListId && listState.ids.length > 0),
        map(listState => listState.entities[listState.defaultListId])
    );

    constructor(private readonly store: Store<AppState>) {}

    public getAllShoppingLists() {
        this.store.dispatch(new GetListsRequest());
    }

    public createNewDefaultList() {
        this.store.dispatch(new CreateDefaultListRequest());
    }

    public updateShoppingList(list: ShoppingList) {
        this.store.dispatch(new UpdateShoppingListRequest(list));
    }

    public deleteShoppingList(id: number) {
        this.store.dispatch(new DeleteShoppingListRequest(id));
    }
}