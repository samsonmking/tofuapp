import request from 'supertest';
import { buildApp } from '../../app/app';
import { Recipe, getRecipeRoute } from '../../app/recipe';
import { expect } from 'chai';
import { RecipeImageConverter, ImageConversionResult } from '../../app/recipe-image';
import { dropDatabase, createDatabase } from '../../app/db/create-schema';

describe('recipe-api-it', function() {
    before(async function() {
        await dropDatabase();
        await createDatabase();
    });

    after(async function() {
        await dropDatabase();
    });
    
    class MockImageConverter implements RecipeImageConverter {
        saveImage(recipeId: number, uri: string): Promise<ImageConversionResult> {
            return Promise.resolve({success: true});
        }

        constructor() { }
    }
    const app = buildApp([getRecipeRoute(new MockImageConverter())], []);
    let newRecipe: Recipe;

    it('#POST /recipe adds new recipe', async function() {
        const url = "https://www.tasteofhome.com/recipes/homemade-pizza/";
        const imageUrl = "https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Pizza_EXPS_THcom19_376_C02_14_6b-696x696.jpg";
        const ingredients = "1 cup tomatoe sauce\n2 cups cheese\nflour\n1 teaspoon sugar";
        const result = await request(app)
            .post('/recipe')
            .send({
                name: "pizza",
                url: url,
                ingredients: ingredients,
                imageUrl: imageUrl
            });
        const recipe = <Recipe>result.body;
        expect(recipe.ingredients).to.have.lengthOf(4);
        expect(recipe.name).to.eq("pizza");
        expect(recipe.url).to.eq(url);
        expect(recipe.id).to.be.greaterThan(0);
        newRecipe = recipe;
    });

    it('#GET /recipe/:id returns recipe with matching id', async function() {
        const result = await request(app)
            .get(`/recipe/${newRecipe.id}`);
        const recipe = <Recipe>result.body;
        expect(recipe).to.deep.equal(newRecipe);
    });

    it('#GET /recipe returns all recipes', async function() {
        const result = await request(app)
            .get('/recipe');
        const recipes = <Recipe[]>result.body;
        expect(recipes).to.have.lengthOf(1);
        const {ingredients, ...shortNewRecipe} = newRecipe;
        expect(recipes[0]).to.deep.equal(shortNewRecipe);
    });

    it('#PUT /recipe/:id updates recipe and returns new entity', async function () {
        const result = await request(app)
            .put(`/recipe/${newRecipe.id}`)
            .send(Object.assign({}, newRecipe, {name: 'cheese pizza'}));
        const updatedRecipe = <Recipe>result.body;
        
        const getUpdate = await request(app)
            .get(`/recipe/${newRecipe.id}`);
        const queriedRecipe = <Recipe>result.body;

        expect(queriedRecipe.name).to.eq('cheese pizza');
        expect(queriedRecipe).to.deep.eq(updatedRecipe);
        expect(queriedRecipe).to.not.deep.include(newRecipe);
    });

});
