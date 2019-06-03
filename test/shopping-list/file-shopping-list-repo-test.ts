import { expect } from "chai";
import mock from "mock-fs";
import { ShoppingList } from "../../app/shopping-list/models/shopping-list";
import { FileShoppingListRepo } from "../../app/shopping-list/persistance/fs-shopping-list-repo";

describe("file-shopping-list-repo", function() {
    const path = "lists.json";
    const newList: ShoppingList = {
        name: "test",
        items: [
            { ingredient: "cheese", recipeQuantities: [] }
        ]
    };

    before(function() {
        mock({});
    });

    after(function() {
        mock.restore();
    });

    it("#addShoppingList() saves new entity to disk", async function() {
        const repo_1 = new FileShoppingListRepo(path);
        const newEntry = await repo_1.addShoppingList(newList);

        const repo_2 = new FileShoppingListRepo(path);
        const result = await repo_2.getShoppingList(newEntry.id as number);
        expect(result).to.deep.equal(newEntry);
    });

    it("#addShoppingList() ids continues from highest count saved to disk", async function() {
        const repo_1 = new FileShoppingListRepo(path);
        const firstEntry = await repo_1.addShoppingList(newList);
        const secondEntry = await repo_1.addShoppingList(newList);

        const repo_2 = new FileShoppingListRepo(path);
        const thirdEntry = await repo_2.addShoppingList(newList);
        const secondId = secondEntry.id as number;
        const thirdId = thirdEntry.id as number;

        expect(thirdId - secondId).to.equal(1);
    });
});
