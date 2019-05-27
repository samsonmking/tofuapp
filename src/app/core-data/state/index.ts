import * as fromManualEntry from './manual-entry/manual-entry.reducer';
import * as fromRecipe from './recipies/recipes.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DisplayRecipe } from '../models/recipe/display-recipe';

export interface AppState {
    manualRecipeEntry: fromManualEntry.ManualRecipeEntryState;
    recipes: fromRecipe.RecipesState;
}

export const reducers: ActionReducerMap<AppState> =  {
    manualRecipeEntry: fromManualEntry.manualEntryReducer,
    recipes: fromRecipe.recipesReducer
};

export const selectManualEntryState = createFeatureSelector<fromManualEntry.ManualRecipeEntryState>('manualRecipeEntry');

export const selectRecipeCreated = createSelector(
    selectManualEntryState,
    (state: fromManualEntry.ManualRecipeEntryState) => state.recipeId
);

const selectRecipeState = createFeatureSelector<fromRecipe.RecipesState>('recipes');
export const selectAllRecipes = createSelector(
    selectRecipeState,
    fromRecipe.selectAllRecipes
);

export const selectRecipeEntities = createSelector(
    selectRecipeState,
    fromRecipe.selectRecipeEntities
);
