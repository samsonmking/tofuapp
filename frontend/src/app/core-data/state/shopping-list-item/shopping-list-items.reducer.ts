import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
    ShoppingListItemsActionTypes,
    AddItemsToListComplete,
    GetItemsForListComplete,
    RemoveRecipeFromListComplete,
    RemoveItemsFromListComplete,
    CheckShoppingListItemComplete
} from './shopping-list-items.actions';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';
import { RecipesActionTypes, DeleteRecipeComplete } from '../recipe/recipes.actions';
import { Action } from '@ngrx/store';

export interface ListItemsState extends EntityState<ShoppingListItem> {
}

export const adapter: EntityAdapter<ShoppingListItem> = createEntityAdapter<ShoppingListItem>();
const initialState = adapter.getInitialState();

const { selectAll, selectIds, selectEntities } = adapter.getSelectors();
export const selectAllListItems = selectAll;
export const selectListEntities = selectEntities;
export const selectListItemEntities = selectEntities;

export function listItemsReducer(state: ListItemsState = initialState, action: Action): ListItemsState {
    switch(action.type) {
        case ShoppingListItemsActionTypes.GetItemsForListComplete: {
            const itemsAction = action as GetItemsForListComplete;
            return adapter.upsertMany(itemsAction.items, state);
        }
        case ShoppingListItemsActionTypes.AddItemsToListComplete: {
            const addToList = action as AddItemsToListComplete;
            return adapter.upsertMany(addToList.items, state);
        }
        case ShoppingListItemsActionTypes.RemoveRecipeFromListComplete: {
            const deleteRecipe = action as RemoveRecipeFromListComplete;
            const next = adapter.removeMany(deleteRecipe.ids, state);
            return next;
        }
        case ShoppingListItemsActionTypes.RemoveItemsFromListComplete: {
            const deleteItems = action as RemoveItemsFromListComplete;
            return adapter.removeMany(deleteItems.ids, state);
        }
        case ShoppingListItemsActionTypes.RemoveListItemsFromStore: {
            return adapter.removeAll(state);
        }
        case ShoppingListItemsActionTypes.CheckShoppingListItemComplete: {
            const checked = action as CheckShoppingListItemComplete;
            return adapter.upsertOne(checked.payload, state)
        }
        case RecipesActionTypes.DeleteComplete :{
            const deleteRecipe = action as DeleteRecipeComplete;
            return adapter.removeMany(li => li.recipe_id === deleteRecipe.payload, state);
        }
        default:
            return state;
    }
}