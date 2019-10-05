import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ListItemActions, ShoppingListItemsActionTypes, AddItemsToListComplete, GetItemsForListRequest, GetItemsForListComplete } from './shopping-list-items.actions';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';

export interface ListItemsState extends EntityState<ShoppingListItem> {
}

export const adapter: EntityAdapter<ShoppingListItem> = createEntityAdapter<ShoppingListItem>();
const initialState = adapter.getInitialState();

const { selectAll, selectIds, selectEntities } = adapter.getSelectors();
export const selectAllListItems = selectAll;
export const selectListItemEntities = selectEntities;

export function listItemsReducer(state: ListItemsState = initialState, action: ListItemActions): ListItemsState {
    switch(action.type) {
        case ShoppingListItemsActionTypes.GetItemsForListComplete: {
            const itemsAction = action as GetItemsForListComplete;
            return adapter.upsertMany(itemsAction.items, state);
        }
        case ShoppingListItemsActionTypes.AddItemsToListComplete: {
            const addToList = action as AddItemsToListComplete;
            return adapter.upsertMany(addToList.items, state);
        }
        default:
            return state;
    }
}