import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShoppingList } from '../../models/shopping-list/shopping-list';
import { ShoppingListActions } from './shopping-list.actions';

export interface ShoppingListState extends EntityState<ShoppingList> {
    selectedId?: number;
}

export const adapter: EntityAdapter<ShoppingList> = createEntityAdapter<ShoppingList>();
export const initialState: ShoppingListState = adapter.getInitialState( {
    selectedId: null
});

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions) {
    switch (action.type) {
        default:
            return state;
    }
}