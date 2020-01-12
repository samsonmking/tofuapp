import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { RecipesActions, RecipesActionTypes, GetAllComplete, RecipeCreated, DeleteRecipeComplete } from './recipes.actions';

export interface RecipesState extends EntityState<DisplayRecipe> {
}

export const adapter: EntityAdapter<DisplayRecipe> = createEntityAdapter<DisplayRecipe>();
export const initialState: RecipesState = adapter.getInitialState();

const { selectAll, selectIds, selectEntities } = adapter.getSelectors();
export const selectAllRecipes = selectAll;
export const selectRecipeEntities = selectEntities;

export function recipesReducer(state: RecipesState = initialState, action: RecipesActions): RecipesState {
    switch (action.type) {
        case RecipesActionTypes.GetAllComplete: {
            const getAllAction = action as GetAllComplete;
            return adapter.upsertMany(getAllAction.payload, state);
        }
        case RecipesActionTypes.RemoveRecipesFromStore: {
            return adapter.removeAll(state);
        }
        case RecipesActionTypes.RecipeCreated: {
            const addAction = action as RecipeCreated;
            return adapter.upsertOne(addAction.payload, state);
        }
        case RecipesActionTypes.DeleteComplete: {
            const deleteAction = action as DeleteRecipeComplete;
            return adapter.removeOne(deleteAction.payload, state);
        }
        default:
            return state;
    }
}
