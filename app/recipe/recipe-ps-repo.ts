import { RecipeRepo } from "./recipe-repo";
import { ShortRecipe } from "./models/short-recipe";
import { Recipe } from ".";
import { NewRecipe } from "./models/new-recipe";
import { query } from "../db";

export class RecipePSRepo implements RecipeRepo {

    public async getRecipes(userId: string): Promise<ShortRecipe[]> {
        const result = await query(`
            SELECT id, name, url from recipes
            WHERE user_id=$1`,
            [userId]);
        return result.rows;
    }

    public async getRecipe(id: number): Promise<ShortRecipe[]> {
        const result = await query('SELECT id, name, url from recipes WHERE id = $1', [id]);
        return result.rows[0];
    }

    public async getRecipeWithIngredients(id: number): Promise<Recipe> {
        const dbRecipe = await query(`
            select row_to_json(nr) as nestedrecipe
            from (
                select r.id, r.url, r.name, (select coalesce(json_agg(ri), '[]'::json)
                    from (
                        select i.ingredient, i.recipe_id, i.id, i.quantity, i.unit 
                        from ingredients i 
                        where recipe_id = r.id
                    ) ri
                ) as ingredients
            from recipes as r) nr
            where id = $1;`,
            [id]);
        return dbRecipe.rows[0].nestedrecipe;
    }

    public async addRecipe(recipe: NewRecipe): Promise<ShortRecipe> {
        const result = await query(`
            INSERT into recipes (name, url, user_id) 
            VALUES($1, $2, $3) 
            RETURNING id, name, url`, 
            [recipe.name, recipe.url, recipe.user_id]);
        return result.rows[0];
    }

    public async addRecipes(recipes: NewRecipe[]): Promise<ShortRecipe> {
        const values = recipes.reduce((acc, curr) => {
            return acc + (acc ? "," : "") + `('${curr.name}', '${curr.url}')`;
        }, "");
        const result = await query(`
            INSERT into recipes (name, url) 
            VALUES ${values} 
            RETURNING name, id`);
        return result.rows[0];
    }

    public async updateRecipe(recipe: Recipe): Promise<ShortRecipe> {
        const result = await query(`
            UPDATE recipes
            SET name = $2, url = $3
            WHERE id = $1 
            RETURNING *`, 
            [recipe.id, recipe.name, recipe.url]);
        return result.rows[0];
    }

    deleteRecipe(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
