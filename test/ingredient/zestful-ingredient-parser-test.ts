import { ZestfulIngredientParser } from "../../app/ingredient/zestful-ingredient-parser";
import { expect } from "chai";
import { Units } from "../../app/ingredient/recipe-ingredient";

describe('zestful-ingredient-parser', () => {
    it('#parse() parses ingredient strings', async() => {
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
            unit: Units.Cups
        });
        expect(result.recipeIngredients).to.deep.include({
            ingredient: 'extra-virgin olive oil',
            quantity: 3,
            unit: Units.Tablespoon
        });
        expect(result.recipeIngredients).to.deep.include({
            ingredient: 'cinnamon',
            quantity: 1.5,
        unit: Units.Tablespoon
        });
    });
});