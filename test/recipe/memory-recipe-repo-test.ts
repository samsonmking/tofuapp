import { MemoryRecipeRepo } from "../../app/recipe/memory-recipe-repo";
import { expect } from "chai";
import { Units } from "../../app/ingredient/recipe-ingredient";
import { Recipe } from "../../app/recipe/recipe";

describe('memory-recipe-repo', () => {
    const quiche: Recipe = {
        name: "quiche",
        url: "http://food.com",
        ingredients: [
            {ingredient: "egg", quantity: 4, unit: Units.Item}
        ]
    };
    it('#getRecipies() new repo contains no elements', async function() {
        const testee = new MemoryRecipeRepo();
        const result = await testee.getRecipies();

        expect(result).to.have.lengthOf(0);
    });

    it('#addRecipe() new recepies are added to repo', async () => {
        const testee = new MemoryRecipeRepo();
        const sizeBefore = (await testee.getRecipies()).length;
        const result = await testee.addRecipe(quiche);
        const sizeAfter = (await testee.getRecipies()).length;

        expect(result.id).to.not.be.null;
        expect(sizeAfter).to.equal(sizeBefore + 1);
    });

    it('#deleteRecipe() recepies can be removed from repo', async function() {
        const testee = new MemoryRecipeRepo();
        const sizeBefore = (await testee.getRecipies()).length;
        await testee.addRecipe(quiche);
        const secondQuiche = await testee.addRecipe(quiche);
        const result = await testee.deleteRecipe(<number>secondQuiche.id);
        const sizeAfter = (await testee.getRecipies()).length;

        expect(result).to.be.true;
        expect(sizeAfter).to.equal(sizeBefore + 1);
    });

    it('#updateRecipe() changes recipe record', async function() {
        const testee = new MemoryRecipeRepo();
        const newRecipe = await testee.addRecipe(quiche);
        const updated = await testee.updateRecipe(
            Object.assign({}, newRecipe, {name: "breakfast"}));
        const result = await testee.getRecipe(<number>newRecipe.id);

        expect(result).to.equal(updated);
    })

});