import { ShoppingListRepo } from "./persistance/shopping-list-repo";
import { Request, Response, NextFunction } from "express";

export class ShoppingListController {
    constructor(private readonly repo: ShoppingListRepo) {

    }

    addShoppingList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await this.repo.addShoppingList(req.body);
            res.json(list);
        } catch (e) {
            next(e);
        }
    }

    getShoppingLists = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingLists = await this.repo.getShoppingLists();
            res.json(shoppingLists);
        } catch (e) {
            next(e);
        }
    }

    getShoppingList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingList = await this.repo.getShoppingList(req.params.id);
            res.json(shoppingList);
        } catch (e) {
            next(e);
        }
    }

    updateShoppingList = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const updatedList = await this.repo.updateShoppingList(req.body);
            res.json(updatedList);
        } catch (e) {
            next(e);
        }
    }

    deleteShoppingList = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const deletedList = await this.repo.deleteShoppingList(req.params.id);
            res.json(deletedList);
        } catch (e) {
            next(e);
        }
    }
}