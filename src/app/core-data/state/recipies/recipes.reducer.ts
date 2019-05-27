import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { RecipesActions, RecipesActionTypes, GetAllComplete, RecipeDetailsComplete } from './recipes.actions';

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
            const result = adapter.upsertMany(getAllAction.payload, state);
            return result;
        }
        case RecipesActionTypes.RecipeDetailsComplete: {
            const fullRecipe = (action as RecipeDetailsComplete).payload;
            return adapter.upsertOne(fullRecipe, state);
        }
        default:
            return state;
    }
}
