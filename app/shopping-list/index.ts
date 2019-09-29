import { ShoppingListPSRepo } from "./persistance/ps-shopping-list-repo";
import { ShoppingListItemRepoPS } from "./persistance/ps-shopping-list-item-repo";
import { ShoppingListController } from "./shopping-list-controller";
import { ShoppingListItemController } from "./shopping-list-item-controller";
import { ShoppingListRoutes } from "./shopping-list-routes";

export function getShoppingListRoutes() {
    const listRepo = new ShoppingListPSRepo();
    const listController = new ShoppingListController(listRepo);
    const itemRepo = new ShoppingListItemRepoPS();
    const itemController = new ShoppingListItemController(itemRepo);
    return new ShoppingListRoutes(listController, itemController);
}