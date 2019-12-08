import { ShoppingList } from "../models/shopping-list";

export interface ShoppingListRepo {
    getShoppingLists(userId: string): Promise<ShoppingList[]>;
    getShoppingList(id: number): Promise<ShoppingList>;
    updateShoppingList(list: ShoppingList): Promise<ShoppingList>;
    addShoppingList(userId: string, list: ShoppingList): Promise<ShoppingList>;
    deleteShoppingList(id: number): Promise<number>;
}
