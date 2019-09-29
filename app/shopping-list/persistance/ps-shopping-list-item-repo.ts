import { ShoppingListItemRepo } from "./shopping-list-item-repo";
import { ShoppingListItem } from "../models/shopping-list-item";
import { query } from "../../db";

export class ShoppingListItemRepoPS implements ShoppingListItemRepo {
    public async getItemsForList(listId: number): Promise<ShoppingListItem[]> {
        const result = await query(`
            SELECT id, shopping_list_id, ingredient_id 
            FROM shopping_list_items 
            WHERE shopping_list_id=$1`, [listId]);
        return result.rows;
    }    
    
    public async addItemToList(payload: ShoppingListItem): Promise<ShoppingListItem> {
        const result = await query(`
            INSERT INTO shopping_list_items (shopping_list_id, ingredient_id) 
            VALUES ($1, $2) 
            RETURNING id, shopping_list_id, ingredient_id`, [payload.shoppingListId, payload.ingredientId]);
        return result.rows[0];
    }

    public async addItemsToList(payload: ShoppingListItem[]): Promise<ShoppingListItem[]> {
        const values = payload.reduce((acc, curr) => 
            (acc + (acc ? "," : "") + `('${curr.shoppingListId}', '${curr.ingredientId}')`), "");
        const result = await query(`
            INSERT INTO shopping_list_items (shopping_list_id, ingredient_id) 
            VALUES ${values} 
            RETURNING id, shopping_list_id, ingredient_id`);
        return result.rows;
    }

    public async removeItemFromList(itemId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}