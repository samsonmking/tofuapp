import request from 'supertest';
import { buildApp } from '../../app/app';
import { Recipe, getRecipeRoute } from '../../app/recipe';
import { expect } from 'chai';
import { dropDatabase, createDatabase } from '../../app/db/create-schema';
import { userScaffold } from '../../app/user';
import { MockImageConverter } from '../mocks/mock-image-converter';
import { createToken } from '../mocks/token';
import { apiPrefix } from '../../app/constants';

describe('recipe-api-it', function() {
    const app = buildApp([getRecipeRoute(new MockImageConverter())], []);
    let newRecipe: Recipe;
    let token: string;

    before(async function() {
        await dropDatabase();
        await createDatabase();
        const user = await userScaffold.createUser();
        token = createToken(user);
    });

    after(async function() {
        await dropDatabase();
    });

    it('#POST /recipe adds new recipe', async function() {
        const url = "https://www.tasteofhome.com/recipes/homemade-pizza/";
        const imageUrl = "https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Pizza_EXPS_THcom19_376_C02_14_6b-696x696.jpg";
        const ingredients = "1 cup tomatoe sauce\n2 cups cheese\nflour\n1 teaspoon sugar";
        const result = await request(app)
            .post(`${apiPrefix}/recipe`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "pizza",
                url: url,
                ingredients: ingredients,
                imageUrl: imageUrl
            });
        const recipe = result.body as Recipe;
        expect(recipe.ingredients).to.have.lengthOf(4);
        expect(recipe.name).to.eq("pizza");
        expect(recipe.url).to.eq(url);
        expect(recipe.id).to.be.greaterThan(0);
        newRecipe = recipe;
    });

    it('#GET /recipe/:id returns recipe with matching id', async function() {
        const result = await request(app)
            .get(`${apiPrefix}/recipe/${newRecipe.id}`)
            .set('Authorization', `Bearer ${token}`);
        const recipe = result.body as Recipe;
        expect(recipe).to.deep.equal(newRecipe);
    });

    it('#GET /recipe returns all recipes', async function() {
        const result = await request(app)
            .get(`${apiPrefix}/recipe`)
            .set('Authorization', `Bearer ${token}`);
        const recipes = result.body as Recipe[];
        expect(recipes).to.have.lengthOf(1);
        const {ingredients, ...shortNewRecipe} = newRecipe;
        expect(recipes[0]).to.deep.equal(shortNewRecipe);
    });

    it('#PUT /recipe/:id updates recipe and returns new entity', async function () {
        const result = await request(app)
            .put(`${apiPrefix}/recipe/${newRecipe.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(Object.assign({}, newRecipe, {name: 'cheese pizza'}));
        const updatedRecipe = result.body as Recipe;
        
        const getUpdate = await request(app)
            .get(`${apiPrefix}/recipe/${newRecipe.id}`);
        const queriedRecipe = result.body as Recipe;

        expect(queriedRecipe.name).to.eq('cheese pizza');
        expect(queriedRecipe).to.deep.eq(updatedRecipe);
        expect(queriedRecipe).to.not.deep.include(newRecipe);
    });

});
