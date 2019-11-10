import { Client } from 'pg';
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
    const userSchema = `CREATE TABLE IF NOT EXISTS users (
        id text primary key,
        password text not null
    )`;
    await newDb.query(userSchema);
    const recipeSchema = `CREATE TABLE IF NOT EXISTS recipes (
        id serial primary key,
        user_id text references users(id) not null,
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
        name text,
        user_id text references users(id)
    )`;
    await newDb.query(shoppingListSchema);
    const shoppingListItemSchema = `CREATE TABLE IF NOT EXISTS shopping_list_items (
        id serial primary key,
        shopping_list_id integer references shopping_lists(id),
        ingredient_id integer references ingredients(id),
        recipe_id integer references recipes(id),
        checked boolean default 'f',
        unique (ingredient_id, shopping_list_id)
    )`;
    await newDb.query(shoppingListItemSchema);
    await newDb.end();
}

export async function dropDatabase() {
    await dispose();
    const postgres = await connect('postgres');
    await postgres.query(`DROP DATABASE IF EXISTS ${PGDATABASE}`);
    await postgres.end();
}
