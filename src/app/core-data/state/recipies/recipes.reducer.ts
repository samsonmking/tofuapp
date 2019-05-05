import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { RecipesActions, RecipesActionTypes, GetAllComplete } from './recipes.actions';

export interface RecipesState extends EntityState<DisplayRecipe> {
}

export const adapter: EntityAdapter<DisplayRecipe> = createEntityAdapter<DisplayRecipe>();
export const initialState: RecipesState = adapter.getInitialState();

export function recipesReducer(state = initialState, action: RecipesActions): RecipesState {
    switch(action.type) {
        case RecipesActionTypes.GetAllComplete: {
            const getAllAction = <GetAllComplete>action;
            return adapter.addAll(getAllAction.payload, state);
        }
        default:
            return state;
    }
}

const { selectAll } = adapter.getSelectors();

export const selectAllRecipes = selectAll;