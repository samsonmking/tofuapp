import { ShoppingListRepo } from "./shopping-list-repo";
import { ShoppingList } from "../models/shopping-list";
import { query } from "../../db";

export class ShoppingListPSRepo implements ShoppingListRepo {
    public async getShoppingLists(): Promise<ShoppingList[]> {
        const result = await query(`
            SELECT id, name 
            FROM shopping_lists`);
        return result.rows;
    }    
    
    public async getShoppingList(id: number): Promise<ShoppingList> {
        const result = await query(`
            SELECT id, name 
            FROM shopping_lists
            WHERE id=$1`, [id]);
        return result.rows[0];
    }

    public async addShoppingList(list: ShoppingList): Promise<ShoppingList> {
        const result = await query(`
            INSERT INTO shopping_lists (name)
            VALUES ($1) 
            RETURNING id, name`, [list.name]);
        return result.rows[0];
    }
    
    public updateShoppingList(list: ShoppingList): Promise<ShoppingList> {
        throw new Error("Method not implemented.");
    }
    
    public deleteShoppingList(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}