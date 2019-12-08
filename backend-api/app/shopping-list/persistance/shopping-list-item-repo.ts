import { ShoppingListItem } from "../models/shopping-list-item";

export interface ShoppingListItemRepo {
    getItemsForList(listId: number): Promise<ShoppingListItem[]>;
    addItemToList(payload: ShoppingListItem): Promise<ShoppingListItem>;
    addItemsToList(payload: ShoppingListItem[]): Promise<ShoppingListItem[]>;
    updateItem(payload: ShoppingListItem): Promise<ShoppingListItem>;
    removeItemFromList(itemId: number): Promise<void>;
    removeRecipeFromList(listId: number, recipeId: number): Promise<number[]>;
    removeItemsFromList(listId: number): Promise<number[]>;
}