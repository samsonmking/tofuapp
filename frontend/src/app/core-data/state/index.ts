import * as fromRecipe from './recipe/recipes.reducer';
import * as fromIngredients from './ingredient/ingredient.reducer';
import * as fromUsers from './user/user.reducer';
import * as fromShoppingLists from './shopping-list/shopping-list.reducer';
import * as fromShoppingListItems from './shopping-list-item/shopping-list-items.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Recipe } from '../models/recipe/recipe';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';
import { DisplayListItem } from '../models/shopping-list-item/display-list-item';
import { ShoppingListItem } from '../models/shopping-list-item/shopping-list-item';

export interface AppState {
    recipes: fromRecipe.RecipesState;
    ingredients: fromIngredients.IngredientState;
    user: fromUsers.UserState;
    shoppingLists: fromShoppingLists.ShoppingListState;
    shoppingListItems: fromShoppingListItems.ListItemsState;
    router: RouterReducerState<RouterStateUrl>;
}

// Recipe Selectors
export const reducers: ActionReducerMap<AppState> = {
    recipes: fromRecipe.recipesReducer,
    ingredients: fromIngredients.ingredientReducer,
    user: fromUsers.userReducer,
    shoppingLists: fromShoppingLists.shoppingListReducer,
    shoppingListItems: fromShoppingListItems.listItemsReducer,
    router: routerReducer
};
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
export const selectIngredientEntities = createSelector(
    selectIngredientState,
    fromIngredients.selectIngredientEntities
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
export const selectShoppingListItemsState = createFeatureSelector<fromShoppingListItems.ListItemsState>('shoppingListItems');

export const selectShoppingListItems = createSelector(
    selectShoppingListItemsState,
    fromShoppingListItems.selectAllListItems
);

export const selectShoppingListEntities = createSelector(
    selectShoppingListItemsState,
    fromShoppingListItems.selectListEntities
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
        if (recipe && !recipesInList.has(recipe)) {
            recipesInList.add(recipe)
        }
        return recipesInList;
    }, new Set<Recipe>()))
);

export const selectRecipeIdsInCurrentList = createSelector(
    selectItemsInCurrentList,
    (items) => items.reduce((recipesInList, item) => {
        if (!recipesInList.has(item.recipe_id)) {
            recipesInList.add(item.recipe_id)
        }
        return recipesInList;
    }, new Set<number>())
);

export interface TrySelectDisplayListItems {
    items: DisplayListItem[],
    success: boolean;
}

export const selectDisplayListItems = createSelector(
    selectItemsInCurrentList,
    selectRecipeEntities,
    selectIngredientEntities,
    (items, recipes, ingredients) => recursiveReduce(items, (acc: TrySelectDisplayListItems, curr) => {
        if (acc.success === false) {
            return acc;
        }
        const recipe = recipes[curr.recipe_id];
        const ingredient = ingredients[curr.ingredient_id];
        if (recipe && ingredient) {
            return {
                success: true, items: [...acc.items, {
                    itemId: curr.id,
                    checked: curr.checked,
                    ingredientName: ingredient.ingredient,
                    ingredientQuantity: ingredient.quantity,
                    ingredientUnit: ingredient.unit,
                    recipeName: recipe.name
                }]
            };
        } else {
            return { ...acc, success: false };
        }
    }, { items: [], success: true })
);

function recursiveReduce(arr: ShoppingListItem[],
    callback: (acc: TrySelectDisplayListItems, curr: ShoppingListItem) => TrySelectDisplayListItems,
    acc: TrySelectDisplayListItems) {
    if (arr.length === 0) {
        return acc;
    }
    const result = callback(acc, arr[0]);
    return result.success ? recursiveReduce(arr.slice(1), callback, result) : result;
}

// Router Selectors
export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');