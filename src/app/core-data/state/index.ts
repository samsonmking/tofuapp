import * as fromManualEntry from './manual-entry/manual-entry.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    manualRecipeEntry: fromManualEntry.ManualRecipeEntryState
}

export const reducers: ActionReducerMap<AppState> =  {
    manualRecipeEntry: fromManualEntry.manualEntryReducer
};

export const selectManualEntryState = createFeatureSelector<fromManualEntry.ManualRecipeEntryState>('manualRecipeEntry');

export const selectRecipeCreated = createSelector(
    selectManualEntryState,
    (state: fromManualEntry.ManualRecipeEntryState) => state.recipeId
)