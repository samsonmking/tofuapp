import { IngredientRepo } from "./ingredient-repo";
import { RecipeIngredient } from "../recipe-ingredient";
import { Units } from "../Units";
import { query } from "../../db";

export class IngredientPSRepo implements IngredientRepo {

    public async getIngredientsforRecipe(recipeId: number): Promise<RecipeIngredient[]> {
        const dbResult = await query(`
            SELECT id, recipe_id, ingredient, quantity, unit 
            FROM ingredients
            WHERE recipe_id = $1
            ORDER BY id ASC`, [recipeId]);
        return dbResult.rows.map(row => (
            { ...row, unit: Units[row.unit] }
        ) as RecipeIngredient);
    }    
    
    public async addIngredient(payload: RecipeIngredient): Promise<RecipeIngredient> {
        const dbResult = await query(`
        INSERT INTO ingredients(recipe_id, ingredient, quantity, unit)
        VALUES($1, $2, $3, $4) 
        RETURNING *`, [
            payload.recipe_id,
            payload.ingredient,
            payload.quantity,
            payload.unit
        ]);
        const dbIngredient = dbResult.rows[0];
        return {
            ...dbIngredient,
            quantity: Number.parseFloat(dbIngredient.quantity),
        };
    }

    public async addIngredients(payload: RecipeIngredient[]): Promise<RecipeIngredient[]> {
        const values = payload.reduce((acc, curr) => 
            (acc + (acc ? "," : "") + `('${curr.recipe_id}', '${curr.ingredient}', ${curr.quantity}, '${curr.unit}')`), "");
            
        const dbResult = await query(`
            INSERT INTO ingredients(recipe_id, ingredient, quantity, unit)
            VALUES ${values} 
            RETURNING id, recipe_id, ingredient, quantity, unit`);

        return dbResult.rows.map(dbIngredient => ({
            ...dbIngredient,
            quantity: Number.parseFloat(dbIngredient.quantity),
        }));
    }

    public updateIngredient(payload: RecipeIngredient): Promise<RecipeIngredient> {
        throw new Error("Method not implemented.");
    }

    public deleteIngredient(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}