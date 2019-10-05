import { Request, Response, NextFunction } from "express";
import { ShoppingListItemRepo } from "./persistance/shopping-list-item-repo";

export class ShoppingListItemController {
    constructor(private readonly repo: ShoppingListItemRepo) {

    }

    getItemsForList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const items = await this.repo.getItemsForList(req.params.listid);
            res.json(items);
        } catch (e) {
            next(e);
        }
    }

    addItemsToList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const items = await this.repo.addItemsToList(req.body);
            res.json(items);
        } catch (e) {
            next(e);
        }
    }

}