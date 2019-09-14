import { dropDatabase, createDatabase } from "../../app/db/scaffold";
import { buildApp } from "../../app/app";
import { getIngredientRoutes } from "../../app/ingredient";
import { RecipePSRepo } from "../../app/recipe/recipe-ps-repo";
import request from 'supertest';
import { Units } from "../../app/ingredient/Units";
import { RecipeIngredient } from "../../app/ingredient/recipe-ingredient";
import { expect } from "chai";
import { IngredientPSRepo } from "../../app/ingredient/persistance/ingredient-ps-repo";

describe('ingredient-api-it', function() {
    before(async function() {
        await dropDatabase();
        await createDatabase();
    });

    after(async function() {
        await dropDatabase();
    });

    const app = buildApp([getIngredientRoutes()], []);

    it('#POST /recipe/:recipeid/ingredient adds new ingredient', async function() {
        const recipe = await addRecipe();
        const payload = {
            recipe_id: recipe.id,
            ingredient: 'cheese',
            quantity: 1,
            unit: Units.Cups
        };
        const result = await request(app)
            .post(`/recipe/${recipe.id}/ingredients`)
            .send(payload);
        const ingredient = result.body as RecipeIngredient;
        expect(ingredient.id).to.not.be.null;
        expect(ingredient).to.contain(payload);
    });

    it('#GET /recipe/:recipeid/ingredients gets all ingredients for recipe', async function() {
        const recipe = await addRecipe();
        const cheese: RecipeIngredient = {
            recipe_id: recipe.id,
            ingredient: "cheese",
            quantity: 1,
            unit: Units.Cups
        };
        const bread: RecipeIngredient = {
            recipe_id: recipe.id,
            ingredient: "bread",
            quantity: 1,
            unit: Units.Item
        };
        const ingredientRepo = new IngredientPSRepo();
        const expectedIngredients = await ingredientRepo.addIngredients([cheese, bread]);

        const result = await request(app)
            .get(`/recipe/${recipe.id}/ingredients`)
            .send();

        const ingredients = result.body as RecipeIngredient[];
        expect(ingredients).to.have.lengthOf(2);
        expect(ingredients).to.deep.equal(expectedIngredients);
    });
});

async function addRecipe() {
    const recipeRepo = new RecipePSRepo();
    return await recipeRepo.addRecipe({ name: 'temp', url: 'http://something.com' });
}