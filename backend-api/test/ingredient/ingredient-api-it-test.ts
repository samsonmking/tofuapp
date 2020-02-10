import { dropDatabase, createDatabase } from "../../app/db/create-schema";
import { buildApp } from "../../app/app";
import { getIngredientRoutes } from "../../app/ingredient";
import { RecipePSRepo } from "../../app/recipe/recipe-ps-repo";
import request from 'supertest';
import { RecipeIngredient } from "../../app/ingredient/recipe-ingredient";
import { expect } from "chai";
import { IngredientPSRepo } from "../../app/ingredient/persistance/ingredient-ps-repo";
import { dummyCheckToken } from "../mocks/token";
import { apiPrefix } from '../../app/constants';

describe('ingredient-api-it', function () {
    const token = "DUMMY_JWT";
    const user = "DUMMY_USER";

    const addRecipe = async () => {
        const recipeRepo = new RecipePSRepo();
        return await recipeRepo.addRecipe({ name: 'temp', url: 'http://something.com', user_id: user });
    }

    before(async function () {
        await dropDatabase();
        await createDatabase();
    });

    after(async function () {
        await dropDatabase();
    });

    const app = buildApp([getIngredientRoutes(dummyCheckToken(user))], []);

    it('#POST /recipe/:recipeid/ingredient adds new ingredient', async function () {
        const recipe = await addRecipe();
        const payload = {
            recipe_id: recipe.id,
            ingredient: 'cheese',
            quantity: 1,
            unit: "cups"
        };
        const result = await request(app)
            .post(`${apiPrefix}/recipe/${recipe.id}/ingredients`)
            .set('Authorization', `Bearer ${token}`)
            .send(payload);
        const ingredient = result.body as RecipeIngredient;
        expect(ingredient.id).to.not.be.null;
        expect(ingredient).to.contain(payload);
    });

    it('#GET /recipe/:recipeid/ingredients gets all ingredients for recipe', async function () {
        const recipe = await addRecipe();
        const cheese: RecipeIngredient = {
            recipe_id: recipe.id,
            ingredient: "cheese",
            quantity: 1,
            unit: "cups"
        };
        const bread: RecipeIngredient = {
            recipe_id: recipe.id,
            ingredient: "bread",
            quantity: 1,
            unit: "loaf"
        };
        const ingredientRepo = new IngredientPSRepo();
        const expectedIngredients = await ingredientRepo.addIngredients([cheese, bread]);

        const result = await request(app)
            .get(`${apiPrefix}/recipe/${recipe.id}/ingredients`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        const ingredients = result.body as RecipeIngredient[];
        expect(ingredients).to.have.lengthOf(2);
        expect(ingredients).to.deep.equal(expectedIngredients);
    });
});
