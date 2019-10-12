import { Client, Pool } from 'pg';
import { RecipePSRepo } from '../recipe/recipe-ps-repo';
import { IngredientPSRepo } from '../ingredient/persistance/ingredient-ps-repo';
import { Recipe } from '../recipe';
import fs from 'fs';
import { dispose } from '.';
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

async function connect(database: string) {
    if (!PGHOST || !PGUSER || !PGPASSWORD || !PGPORT) {
        throw new Error('Missing postgres env')
    }
    const client = new Client({
        user: PGUSER,
        database,
        password: PGPASSWORD,
        host: PGHOST,
        port: parseInt(PGPORT),
    });
    await client.connect();
    return client;
}

export async function createDatabase() {
    if (!PGDATABASE || !PGHOST || !PGUSER || !PGPASSWORD || !PGPORT) {
        throw new Error('Missing postgres env')
    }
    const postgres = await connect('postgres');
    await postgres.query(`CREATE DATABASE ${PGDATABASE}`);
    await postgres.end();

    const newDb = await connect(PGDATABASE);
    const recipeSchema = `CREATE TABLE IF NOT EXISTS recipes (
        id serial primary key,
        name text not null,
        url text not null
    )`;
    await newDb.query(recipeSchema);
    const ingredientSchema = `CREATE TABLE IF NOT EXISTS ingredients (
        id serial primary key,
        recipe_id integer references recipes(id),
        ingredient text not null,
        quantity decimal,
        unit text
    )`;
    await newDb.query(ingredientSchema);
    const shoppingListSchema = `CREATE TABLE IF NOT EXISTS shopping_lists (
        id serial primary key,
        name text
    )`;
    await newDb.query(shoppingListSchema);
    const shoppingListItemSchema = `CREATE TABLE IF NOT EXISTS shopping_list_items (
        id serial primary key,
        shopping_list_id integer references shopping_lists(id),
        ingredient_id integer references ingredients(id),
        recipe_id integer references recipes(id),
        unique (ingredient_id, shopping_list_id)
    )`;
    await newDb.query(shoppingListItemSchema);
    const userSchema = `CREATE TABLE IF NOT EXISTS users (
        id text primary key,
        default_list_id integer references shopping_lists(id)
    )`;
    await newDb.query(userSchema);
    await newDb.end();
}

export async function importDataFromFile(path: string) {
    const payload: string = fs.readFileSync(path).toString();
    await importData(payload);
}

export async function importData(payload: string) {
    const recipeRepo = new RecipePSRepo();
    const ingredientRepo = new IngredientPSRepo();

    const recipes: Recipe[] = JSON.parse(payload);
    for (const recipe of recipes) {
        const dbRecipe = await recipeRepo.addRecipe({
            name: recipe.name,
            url: recipe.url
        });
        const recipeId = dbRecipe.id;
        const ingredients = recipe.ingredients.map(i => ({ ...i, recipe_id: recipeId }));
        await ingredientRepo.addIngredients(ingredients);
    }   
}

export async function dropDatabase() {
    await dispose();
    const postgres = await connect('postgres');
    await postgres.query(`DROP DATABASE IF EXISTS ${PGDATABASE}`);
    await postgres.end();
}

