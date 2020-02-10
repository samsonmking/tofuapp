import { ShoppingListPSRepo } from "./persistance/ps-shopping-list-repo";
import { ShoppingListItemRepoPS } from "./persistance/ps-shopping-list-item-repo";
import { ShoppingListController } from "./shopping-list-controller";
import { ShoppingListItemController } from "./shopping-list-item-controller";
import { ShoppingListRoutes } from "./shopping-list-routes";
import { Request, Response, NextFunction } from 'express';
import { checkToken } from "../auth";

export function getShoppingListRoutes(
    auth: (req: Request, res: Response, next: NextFunction) => Promise<void> = checkToken) {
    const listRepo = new ShoppingListPSRepo();
    const listController = new ShoppingListController(listRepo);
    const itemRepo = new ShoppingListItemRepoPS();
    const itemController = new ShoppingListItemController(itemRepo);
    return new ShoppingListRoutes(listController, itemController, auth);
}