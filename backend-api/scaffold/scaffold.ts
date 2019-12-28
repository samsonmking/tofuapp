import { createDatabase, dropDatabase } from "../app/db/create-schema";
import { dispose } from "../app/db/index";
import fs from 'fs';
import { Recipe } from "../app/recipe";
import { RecipePSRepo } from "../app/recipe/recipe-ps-repo";
import { IngredientPSRepo } from "../app/ingredient/persistance/ingredient-ps-repo";
import { userScaffold } from "../app/user";
import { createUser } from "../app/user/scaffold";
const { PGDATABASE } = process.env;

async function importDataFromFile(userId: string, path: string) {
    const payload: string = fs.readFileSync(path).toString();
    await importData(userId, payload);
}

async function importData(userId: string, payload: string) {
    const recipeRepo = new RecipePSRepo();
    const ingredientRepo = new IngredientPSRepo();

    const recipes: Recipe[] = JSON.parse(payload);
    for (const recipe of recipes) {
        const dbRecipe = await recipeRepo.addRecipe({
            name: recipe.name,
            url: recipe.url,
            user_id: userId
        });
        const recipeId = dbRecipe.id;
        const ingredients = recipe.ingredients.map(i => ({ ...i, recipe_id: recipeId }));
        await ingredientRepo.addIngredients(ingredients);
    }   
}

const seed = './scaffold/recipe-store.json';

console.log('[INFO] scaffolding database');
dropDatabase()
    .then(() => console.log(`[INFO] Database ${PGDATABASE} dropped`))
    .then(() => createDatabase())
    .then(() => console.log(`[INFO] Database ${PGDATABASE} created`))
    .then(() => userScaffold.createUser(`samson@samsonmking.com`))
    .then(user => { 
        console.log(`[INFO] Default user '${user}' created`); 
        return user; 
    })
    .then(user => importDataFromFile(user, seed))    
    .then(() => console.log(`[INFO] Database ${PGDATABASE} seeded with data from ${seed}`))
    .then(() => createUser('user@gmail.com', 'password'))
    .then(() => dispose())
    .catch(e => console.log(`[ERROR] ${e}`));