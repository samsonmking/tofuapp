import { Route } from "../route";
import express from 'express';
import { ShoppingListController } from "./shopping-list-controller";
import { ShoppingListItemController } from "./shopping-list-item-controller";
import { checkToken } from "../auth";
import { apiPrefix } from '../constants';
import { Request, Response, NextFunction } from 'express';

export class ShoppingListRoutes implements Route {
    constructor(
        private readonly listController: ShoppingListController,
        private readonly itemController: ShoppingListItemController,
        private readonly auth: (req: Request, res: Response, next: NextFunction) => Promise<void>) {

        }

    contributeRoutes(app: express.Application): void {
        app.get(`${apiPrefix}/list`, this.auth, this.listController.getShoppingLists);
        app.post(`${apiPrefix}/list`, this.auth, this.listController.addShoppingList);
        app.get(`${apiPrefix}/list/:id`, this.auth, this.listController.getShoppingList);
        app.put(`${apiPrefix}/list/:id`, this.auth, this.listController.updateShoppingList);
        app.delete(`${apiPrefix}/list/:id`, this.auth, this.listController.deleteShoppingList);

        app.get(`${apiPrefix}/list/:listid/items`, this.auth, this.itemController.getItemsForList);
        app.post(`${apiPrefix}/list/:listid/items`, this.auth, this.itemController.addItemsToList);
        app.put(`${apiPrefix}/item/:itemid`, this.auth, this.itemController.updateItem);
        app.delete(`${apiPrefix}/list/:listid/items`, this.auth, this.itemController.deleteItemsFromList);
        app.delete(`${apiPrefix}/list/:listid/recipe/:recipeid`, this.auth, this.itemController.deleteRecipeFromList);
    }

}