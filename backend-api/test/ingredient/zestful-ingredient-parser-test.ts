import { ZestfulIngredientParser } from "../../app/ingredient/zestful-ingredient-parser";
import { expect } from "chai";

describe('zestful-ingredient-parser', function() {
    it('#parse() parses ingredient strings', async function() {
        const testee = new ZestfulIngredientParser();
        const result = await testee.parse([
            "2 cups baby portobello mushrooms, sliced",
            "3 tablespoons extra-virgin olive oil, or more to taste",
            "1 1/2 tbsp cinnamon"
        ]);

        expect(result.error).to.have.lengthOf(0);
        expect(result.recipeIngredients).to.deep.include({
            ingredient: 'baby portobello mushrooms',
            quantity: 2,
            unit: "cup"
        });
        expect(result.recipeIngredients).to.deep.include({
            ingredient: 'extra-virgin olive oil',
            quantity: 3,
            unit: "tablespoon"
        });
        expect(result.recipeIngredients).to.deep.include({
            ingredient: 'cinnamon',
            quantity: 1.5,
            unit: "tablespoon"
        });
    });
    it('#parse() returns error if no ingredient can be parsed', async function() {
        const testee = new ZestfulIngredientParser();
        const result = await testee.parse([
            "1"
        ]);

        expect(result.error).to.have.lengthOf(1);
        expect(result.recipeIngredients).to.have.lengthOf(0);
    });
    it('#parse() unit and quantity are not set if only the ingredient is specified', async function() {
        const testee = new ZestfulIngredientParser();
        const result = await testee.parse([
            "egg"
        ]);

        expect(result.error).to.have.lengthOf(0);
        expect(result.recipeIngredients).to.deep.include({
            ingredient: 'egg'
        });
    })
});