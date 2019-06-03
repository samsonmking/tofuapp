import { ShoppingList } from "../models/shopping-list";
import { ShoppingListRepo } from "./shopping-list-repo";

export class MemoryShoppingListRepo implements ShoppingListRepo {
    constructor(private lists: Map<number, ShoppingList> = new Map<number, ShoppingList>(),
                private index: number = 1) {
    }

    public async getShoppingLists(): Promise<ShoppingList[]> {
        return Array.from(this.lists.values());
    }

    public async getShoppingList(id: number): Promise<ShoppingList> {
        if (this.lists.has(id)) {
            return this.lists.get(id) as ShoppingList;
        } else {
            throw new Error(`list with id: ${id} not found`);
        }
    }

    public async updateShoppingList(list: ShoppingList): Promise<ShoppingList> {
        if (list.id && this.lists.has(list.id)) {
            const existingList = this.lists.get(list.id);
            const updatedList = Object.assign({}, existingList, list);
            this.lists.set(list.id, updatedList);
            return updatedList;
        } else  {
            throw new Error(`list with id: ${list.id} not found`);
        }
    }

    public async addShoppingList(list: ShoppingList): Promise<ShoppingList> {
        if (list.id) {
            throw new Error(`list with id; ${list.id} already exists`);
        }
        this.index += 1;
        const newList = Object.assign({}, list, { id: this.index });
        this.lists.set(this.index, newList);
        return newList;
    }

    public async deleteShoppingList(id: number): Promise<boolean> {
        return this.lists.delete(id);
    }
}
