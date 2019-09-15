import * as fromManualEntry from './manual-entry/manual-entry.reducer';
import * as fromRecipe from './recipe/recipes.reducer';
import * as fromIngredients from './ingredient/ingredient.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    manualRecipeEntry: fromManualEntry.ManualRecipeEntryState;
    recipes: fromRecipe.RecipesState;
    ingredients: fromIngredients.IngredientState;
}

export const reducers: ActionReducerMap<AppState> =  {
    manualRecipeEntry: fromManualEntry.manualEntryReducer,
    recipes: fromRecipe.recipesReducer,
    ingredients: fromIngredients.ingredientReducer
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
export const selectRecipeById = (id: number) => createSelector(
    selectRecipeState,
    (s) => s.entities[id]
);

const selectIngredientState = createFeatureSelector<fromIngredients.IngredientState>('ingredients');
export const selectIngredients = createSelector(
    selectIngredientState,
    fromIngredients.selectAllIngredients
);
export const selectIngredientsForRecipe = (recipeId: number) => createSelector(
    selectIngredients,
    (ingredients) => ingredients.filter(ingredient => ingredient.recipe_id === recipeId)
);

export const selectTotalIngredientsForRecipe = (recipeId: number) => createSelector(
    selectIngredients,
    (ingredients) => ingredients.filter(ingredient => ingredient.recipe_id === recipeId).length
)
