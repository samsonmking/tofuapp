import { Route } from "../route";
import express from 'express';
import { ShoppingListController } from "./shopping-list-controller";
import { ShoppingListItemController } from "./shopping-list-item-controller";
import { checkToken } from "../auth";
import { apiPrefix } from '../constants';

export class ShoppingListRoutes implements Route {
    constructor(
        private readonly listController: ShoppingListController,
        private readonly itemController: ShoppingListItemController) {

        }

    contributeRoutes(app: express.Application): void {
        app.get(`${apiPrefix}/list`, checkToken, this.listController.getShoppingLists);
        app.post(`${apiPrefix}/list`, checkToken, this.listController.addShoppingList);
        app.get(`${apiPrefix}/list/:id`, checkToken, this.listController.getShoppingList);
        app.put(`${apiPrefix}/list/:id`, checkToken, this.listController.updateShoppingList);
        app.delete(`${apiPrefix}/list/:id`, checkToken, this.listController.deleteShoppingList);

        app.get(`${apiPrefix}/list/:listid/items`, checkToken, this.itemController.getItemsForList);
        app.post(`${apiPrefix}/list/:listid/items`, checkToken, this.itemController.addItemsToList);
        app.put(`${apiPrefix}/item/:itemid`, checkToken, this.itemController.updateItem);
        app.delete(`${apiPrefix}/list/:listid/items`, checkToken, this.itemController.deleteItemsFromList);
        app.delete(`${apiPrefix}/list/:listid/recipe/:recipeid`, checkToken, this.itemController.deleteRecipeFromList);
    }

}