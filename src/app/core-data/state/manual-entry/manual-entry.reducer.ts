import { ManualRecipeEntryActions, ManualEntryActionTypes, EntrySubmitted } from './manual-entry.actions';
import { NewRecipe } from '../../models/manual-entry/new-recipe';

export interface ManualRecipeEntryState {
    name: String,
    recipeUrl: String,
    imageUrl: String,
    ingredients: String,
    errors?: String[],
    recipeId?: number
}

export const initialState: ManualRecipeEntryState = {
    name: "",
    recipeUrl: "",
    imageUrl: "",
    ingredients: ""
}

export function manualEntryReducer(state = initialState, action: ManualRecipeEntryActions) : ManualRecipeEntryState {
    switch(action.type) {
        case ManualEntryActionTypes.EntrySubmitted:
            const entrySubmittedPayload = <NewRecipe>action.payload;
            return {
                name: entrySubmittedPayload.name,
                recipeUrl: entrySubmittedPayload.url,
                imageUrl: entrySubmittedPayload.imageUrl,
                ingredients: entrySubmittedPayload.ingredients
            };
        case ManualEntryActionTypes.RecipeCreated:
            return Object.assign({}, state, { recipeId: action.payload })
        default:
            return state;
    }
}