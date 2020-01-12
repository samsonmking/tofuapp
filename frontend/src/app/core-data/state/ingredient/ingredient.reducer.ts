import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';
import {
    IngredientActionsType,
    GetIngredientsForRecipeComplete,
    GetIngredientsForCurrentListComplete
} from './ingredient.actions';
import { RecipesActionTypes, DeleteRecipeComplete } from '../recipe/recipes.actions';
import { Action } from '@ngrx/store';

export interface IngredientState extends EntityState<RecipeIngredient> {

}

export const adapter: EntityAdapter<RecipeIngredient> = createEntityAdapter<RecipeIngredient>();
export const initialState: IngredientState = adapter.getInitialState();

const { selectAll, selectEntities, selectTotal } = adapter.getSelectors();
export const selectAllIngredients = selectAll;
export const selectIngredientEntities = selectEntities;
export const selectTotalIngredients = selectTotal;

export function ingredientReducer(state: IngredientState = initialState, action: Action): IngredientState {
    switch (action.type) {
        case IngredientActionsType.GetIngredientsForRecipeComplete: {
            const getIngredients = action as GetIngredientsForRecipeComplete;
            return adapter.upsertMany(getIngredients.payload, state);
        }
        case IngredientActionsType.GetIngredientsForCurrentListComplete: {
            const ingredientsForList = action as GetIngredientsForCurrentListComplete;
            return adapter.upsertMany(ingredientsForList.payload, state);
        }
        case IngredientActionsType.RemoveIngredientsFromStore: {
            return adapter.removeAll(state);
        }
        case RecipesActionTypes.DeleteComplete: {
            const deleteRecipe = action as DeleteRecipeComplete;
            adapter.removeMany(i => i.recipe_id === deleteRecipe.payload, state)
        }
        default:
            return state;
    }
}