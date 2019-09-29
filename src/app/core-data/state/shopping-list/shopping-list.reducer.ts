import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShoppingList } from '../../models/shopping-list/shopping-list';
import { ShoppingListActions, ShoppingListActionTypes, GetListsComplete, CreateDefaultListComplete, SetDefaultList } from './shopping-list.actions';

export interface ShoppingListState extends EntityState<ShoppingList> {
    selectedId?: number;
}

export const adapter: EntityAdapter<ShoppingList> = createEntityAdapter<ShoppingList>();
export const initialState: ShoppingListState = adapter.getInitialState( {
    selectedId: null
});

const { selectAll, selectIds, selectEntities } = adapter.getSelectors();
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
            return { ...adapter.upsertOne(newList, state), selectedId: newList.id }
        }
        case ShoppingListActionTypes.SetDefaultList: {
            const setDefault = action as SetDefaultList;
            return { ...state, selectedId: setDefault.id };
        }
        default:
            return state;
    }
}