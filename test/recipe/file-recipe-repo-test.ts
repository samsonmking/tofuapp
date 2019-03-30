import { expect } from 'chai';
import mock from 'mock-fs';
import { FileRecipeRepo } from '../../app/recipe/file-recipe-repo';

describe('file-recipe-repo', () => {

    before(() => {
        mock({});
    });

    after(() => {
        mock.restore();
    });

    it('#addRecipe() saves new entities to disk', async () => {
        const path = 'store.json'; 
        const firstRepo = new FileRecipeRepo(path);
        const newEntry = await firstRepo.addRecipe({
           name: "pizza",
           url: "http://somedomain.com",
           ingredients: [] 
        });

        const testee = new FileRecipeRepo(path);
        const query = await testee.getRecipe(<number>newEntry.id);
        expect(query).to.deep.equal(newEntry);
    });
});