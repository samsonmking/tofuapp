import { ShoppingList } from "../models/shopping-list";

export interface ShoppingListRepo {
    getShoppingLists(): Promise<ShoppingList[]>;
    getShoppingList(id: number): Promise<ShoppingList>;
    updateShoppingList(list: ShoppingList): Promise<ShoppingList>;
    addShoppingList(list: ShoppingList): Promise<ShoppingList>;
    deleteShoppingList(id: number): Promise<boolean>;
}
