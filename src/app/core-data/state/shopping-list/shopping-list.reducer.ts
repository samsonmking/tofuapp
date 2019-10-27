import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShoppingList } from '../../models/shopping-list/shopping-list';
import { ShoppingListActions, 
    ShoppingListActionTypes, 
    GetListsComplete, 
    CreateDefaultListComplete, 
    SetDefaultList, 
    UpdateShoppingListComplete, 
    DeleteShoppingListComplete } from './shopping-list.actions';

export interface ShoppingListState extends EntityState<ShoppingList> {
    defaultListId?: number;
}

export const adapter: EntityAdapter<ShoppingList> = createEntityAdapter<ShoppingList>();
export const initialState: ShoppingListState = adapter.getInitialState( {
    defaultListId: null
});

const { selectAll, selectEntities } = adapter.getSelectors();
export const selectAllLists = selectAll;
export const selectListEntities = selectEntities;

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActionTypes.GetListsComplete: {
            const listsComplete = action as GetListsComplete;
            return adapter.upsertMany(listsComplete.lists, state);
        }
        case ShoppingListActionTypes.CreateDefaultListComplete: {
            const newDefault = action as CreateDefaultListComplete;
            const newList = newDefault.list;
            return { ...adapter.upsertOne(newList, state), defaultListId: newList.id }
        }
        case ShoppingListActionTypes.SetDefaultList: {
            const setDefault = action as SetDefaultList;
            return { ...state, defaultListId: setDefault.id };
        }
        case ShoppingListActionTypes.UpdateShoppingListComplete: {
            const updated = action as UpdateShoppingListComplete;
            return adapter.upsertOne(updated.list, state);
        }
        case ShoppingListActionTypes.DeleteShoppingListComplete:
            const deleted = action as DeleteShoppingListComplete;
            const updatedDefault = (state.defaultListId === deleted.id) ? null : state.defaultListId
            return { ...adapter.removeOne(deleted.id, state), defaultListId: updatedDefault };
        case ShoppingListActionTypes.RemoveListsFromStore: {
            return { ...adapter.removeAll(state), defaultListId: null };
        }
        default:
            return state;
    }
}