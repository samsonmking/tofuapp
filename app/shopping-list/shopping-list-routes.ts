import { Route } from "../route";
import express from 'express';
import { ShoppingListController } from "./shopping-list-controller";
import { ShoppingListItemController } from "./shopping-list-item-controller";
import { checkToken } from "../auth";

export class ShoppingListRoutes implements Route {
    constructor(
        private readonly listController: ShoppingListController,
        private readonly itemController: ShoppingListItemController) {

        }

    contributeRoutes(app: express.Application): void {
        app.get('/list', checkToken, this.listController.getShoppingLists);
        app.post('/list', checkToken, this.listController.addShoppingList);
        app.get('/list/:id', checkToken, this.listController.getShoppingList);
        app.put('/list/:id', checkToken, this.listController.updateShoppingList);
        app.delete('/list/:id', checkToken, this.listController.deleteShoppingList);

        app.get('/list/:listid/items', checkToken, this.itemController.getItemsForList);
        app.post('/list/:listid/items', checkToken, this.itemController.addItemsToList);
        app.delete('/list/:listid/items', checkToken, this.itemController.deleteItemsFromList);
        app.delete('/list/:listid/recipe/:recipeid', checkToken, this.itemController.deleteRecipeFromList);
    }

}