import { ShoppingListRepo } from "./shopping-list-repo";
import { ShoppingList } from "../models/shopping-list";
import { query } from "../../db";

export class ShoppingListPSRepo implements ShoppingListRepo {
    public async getShoppingLists(userId: string): Promise<ShoppingList[]> {
        const result = await query(`
            SELECT id, name 
            FROM shopping_lists
            WHERE user_id=$1
            ORDER BY id DESC`, [userId]);
        return result.rows;
    }    
    
    public async getShoppingList(id: number): Promise<ShoppingList> {
        const result = await query(`
            SELECT id, name 
            FROM shopping_lists
            WHERE id=$1`, [id]);
        return result.rows[0];
    }

    public async addShoppingList(userId: string, list: ShoppingList): Promise<ShoppingList> {
        const result = await query(`
            INSERT INTO shopping_lists (name, user_id)
            VALUES ($1, $2) 
            RETURNING id, name`, [list.name, userId]);
        return result.rows[0];
    }
    
    public async updateShoppingList(list: ShoppingList): Promise<ShoppingList> {
        const updated = await query(`
            UPDATE shopping_lists
            SET name=$2 
            WHERE id=$1 
            RETURNING id, name`, [list.id, list.name]);
        return updated.rows[0];
    }
    
    public async deleteShoppingList(id: number): Promise<number> {
        const deleted = await query(`
            DELETE FROM shopping_lists 
            WHERE id=$1 
            RETURNING id`,
            [id]);
        return deleted.rows[0].id;
    }
}