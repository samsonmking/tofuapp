import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';
import { IngredientActions, IngredientActionsType, GetIngredientsForRecipeComplete } from './ingredient.actions';

export interface IngredientState extends EntityState<RecipeIngredient> {

}

export const adapter: EntityAdapter<RecipeIngredient> = createEntityAdapter<RecipeIngredient>();
export const initialState: IngredientState = adapter.getInitialState();

const { selectAll, selectEntities, selectTotal } = adapter.getSelectors();
export const selectAllIngredients = selectAll;
export const selectIngredientEntities = selectEntities;
export const selectTotalIngredients = selectTotal;

export function ingredientReducer(state: IngredientState = initialState, action: IngredientActions): IngredientState {
    switch (action.type) {
        case IngredientActionsType.GetIngredientsForRecipeComplete: {
            const getIngredients = action as GetIngredientsForRecipeComplete;
            return adapter.upsertMany(getIngredients.payload, state);
        }
        default:
            return state;
    }
}