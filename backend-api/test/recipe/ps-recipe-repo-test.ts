import { expect } from 'chai';
import { RecipePSRepo } from '../../app/recipe/recipe-ps-repo';
import { dropDatabase, createDatabase } from '../../app/db/create-schema';
import { userScaffold } from '../../app/user';

describe('ps-recipe-repo', function() {
    let user: string;
    before(async function() {
        await dropDatabase();
        await createDatabase();
       user = await userScaffold.createUser();
    });

    after(async function() {
        await dropDatabase();
    });

    it('#addRecipe() saves new entities to disk', async function() {
        const firstRepo = new RecipePSRepo();
        const newEntry = await firstRepo.addRecipe({
           name: "pizza",
           url: "http://somedomain.com",
           user_id: user
        });

        const testee = new RecipePSRepo();
        const query = await testee.getRecipe(newEntry.id);
        expect(query).to.deep.equal(newEntry);
    });
});