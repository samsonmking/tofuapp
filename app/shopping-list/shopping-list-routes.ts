import { Route } from "../route";
import express from 'express';
import { ShoppingListController } from "./shopping-list-controller";
import { ShoppingListItemController } from "./shopping-list-item-controller";

export class ShoppingListRoutes implements Route {
    constructor(
        private readonly listController: ShoppingListController,
        private readonly itemController: ShoppingListItemController) {

        }

    contributeRoutes(app: express.Application): void {
        app.get('/list', this.listController.getShoppingLists);
        app.post('/list', this.listController.addShoppingList);
        app.get('/list/:id', this.listController.getShoppingList);
        app.put('/list/:id', this.listController.updateShoppingList);

        app.get('/list/:listid/items', this.itemController.getItemsForList);
        app.post('/list/:listid/items', this.itemController.addItemsToList);
        app.delete('/list/:listid/recipe/:recipeid', this.itemController.deleteRecipeFromList);
    }

}