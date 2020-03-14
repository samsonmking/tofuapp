import { ShoppingListItemRepo } from "./shopping-list-item-repo";
import { ShoppingListItem } from "../models/shopping-list-item";
import { query } from "../../db";

export class ShoppingListItemRepoPS implements ShoppingListItemRepo {
    public async getItemsForList(listId: number): Promise<ShoppingListItem[]> {
        const result = await query(`
            SELECT id, shopping_list_id, ingredient_id, recipe_id, checked  
            FROM shopping_list_items 
            WHERE shopping_list_id=$1
            ORDER BY id ASC`, [listId]);
        return result.rows;
    }    
    
    public async addItemToList(payload: ShoppingListItem): Promise<ShoppingListItem> {
        const result = await query(`
            INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, recipe_id) 
            VALUES ($1, $2, $3) 
            RETURNING id, shopping_list_id, ingredient_id, recipe_id, checked`, 
            [payload.shopping_list_id, payload.ingredient_id, payload.recipe_id]);
        return result.rows[0];
    }

    public async addItemsToList(payload: ShoppingListItem[]): Promise<ShoppingListItem[]> {
        const values = payload.reduce((acc, curr) => 
            (acc + (acc ? "," : "") + `('${curr.shopping_list_id}', '${curr.ingredient_id}', '${curr.recipe_id}')`), "");
        const result = await query(`
            INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, recipe_id) 
            VALUES ${values} 
            RETURNING id, shopping_list_id, ingredient_id, recipe_id, checked`);
        return result.rows;
    }

    public async updateItem(payload: ShoppingListItem): Promise<ShoppingListItem> {
        const result = await query(`
            UPDATE shopping_list_items
            SET checked=$2
            WHERE id=$1
            RETURNING id, shopping_list_id, ingredient_id, recipe_id, checked`,
            [
                payload.id,
                payload.checked
            ]);
        return result.rows[0];
    }

    public async removeRecipeFromList(listId: number, recipeId: number): Promise<number[]> {
        const result = await query(`
            DELETE FROM shopping_list_items 
            WHERE shopping_list_id=$1 AND recipe_id=$2 
            RETURNING id`, 
            [listId, recipeId]);
        return result.rows.map(deleted => deleted.id);
    }

    public async removeItemFromList(itemId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async removeItemsFromList(listId: number): Promise<number[]> {
        const deleted = await query(`
            DELETE FROM shopping_list_items
            WHERE shopping_list_id=$1
            RETURNING id`,
            [listId]);
        return deleted.rows.map(deleted => deleted.id);
    }

}