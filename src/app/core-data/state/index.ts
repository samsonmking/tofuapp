import * as fromManualEntry from './manual-entry/manual-entry.reducer';
import * as fromRecipe from './recipe/recipes.reducer';
import * as fromIngredients from './ingredient/ingredient.reducer';
import * as fromUsers from './user/user.reducer';
import * as fromShoppingLists from './shopping-list/shopping-list.reducer';
import * as fromShoppingListItems from './shopping-list-item/shopping-list-items.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Recipe } from '../models/recipe/recipe';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';
import { RouterState } from '@angular/router';

export interface AppState {
    manualRecipeEntry: fromManualEntry.ManualRecipeEntryState;
    recipes: fromRecipe.RecipesState;
    ingredients: fromIngredients.IngredientState;
    user: fromUsers.UserState;
    shoppingLists: fromShoppingLists.ShoppingListState;
    shoppingListItems: fromShoppingListItems.ListItemsState;
    router: RouterReducerState<RouterStateUrl>;
}

// Recipe Selectors
export const reducers: ActionReducerMap<AppState> =  {
    manualRecipeEntry: fromManualEntry.manualEntryReducer,
    recipes: fromRecipe.recipesReducer,
    ingredients: fromIngredients.ingredientReducer,
    user: fromUsers.userReducer,
    shoppingLists: fromShoppingLists.shoppingListReducer,
    shoppingListItems: fromShoppingListItems.listItemsReducer,
    router: routerReducer
};
export const selectManualEntryState = createFeatureSelector<fromManualEntry.ManualRecipeEntryState>('manualRecipeEntry');
export const selectRecipeCreated = createSelector(
    selectManualEntryState,
    (state: fromManualEntry.ManualRecipeEntryState) => state.recipeId
);
export const selectRecipeState = createFeatureSelector<fromRecipe.RecipesState>('recipes');
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

// Ingredient Selectors
export const selectIngredientState = createFeatureSelector<fromIngredients.IngredientState>('ingredients');
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
);

// User Selectors
export const selectUser = createFeatureSelector<fromUsers.UserState>('user');

// Shopping List Selectors
export const selectShoppingListState = createFeatureSelector<fromShoppingLists.ShoppingListState>('shoppingLists');
export const selectAllLists = createSelector(
    selectShoppingListState,
    fromShoppingLists.selectAllLists
);

// Shopping List Item Selectors
export const selectShoppingListItems = createSelector(
    createFeatureSelector<fromShoppingListItems.ListItemsState>('shoppingListItems'),
    fromShoppingListItems.selectAllListItems
);
export const selectItemsInCurrentList = createSelector(
    selectShoppingListItems,
    selectShoppingListState,
    (shoppingListItems, shoppingList) => shoppingListItems.filter(item => 
        item.shopping_list_id === shoppingList.defaultListId)
);

export const selectRecipesInCurrentList = createSelector(
    selectItemsInCurrentList,
    selectRecipeState,
    (items, recipes) => Array.from(items.reduce((recipesInList, item) => {
       const recipe = recipes.entities[item.recipe_id];
       if(recipe && !recipesInList.has(recipe)) {
           recipesInList.add(recipe)
       }
       return recipesInList;
    }, new Set<Recipe>()))
);

export const selectRecipeIdsInCurrentList = createSelector(
    selectItemsInCurrentList,
    selectRecipeState,
    (items, recipes) => items.reduce((recipesInList, item) => {
       const recipe = recipes.entities[item.recipe_id];
       if(recipe && !recipesInList.has(recipe.id)) {
           recipesInList.add(recipe.id)
       }
       return recipesInList;
    }, new Set<number>())
);

// Router Selectors
const selectRouterState = createFeatureSelector<RouterReducerState>('router');