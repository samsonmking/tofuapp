import { Request, Response, NextFunction } from "express";
import { ShoppingListItemRepo } from "./persistance/shopping-list-item-repo";
import boom from "boom";

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
            if(e.code && e.code === "23505") { // Unique violation (items already in lst)
                next( boom.conflict(e.message));
            } else {
                next(e);
            }
        }
    }

    updateItem = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const updated = await this.repo.updateItem(req.body);
            res.json(updated);
        } catch (e) {
            next(e);
        }
    }

    deleteRecipeFromList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const deleted = await this.repo.removeRecipeFromList(req.params.listid, req.params.recipeid);
            res.json(deleted);
        } catch (e) {
            next(e);
        }
    }

    deleteItemsFromList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const deleted = await this.repo.removeItemsFromList(req.params.listid);
            res.json(deleted);
        } catch (e) {
            next(e);
        }
    }

}