import { RecipeRepo } from "./recipe-repo";
import { Request, Response, NextFunction } from "express";

export class RecipeController {
    constructor(private repo: RecipeRepo) { }

    getRecipies = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const recipies = await this.repo.getRecipies();
            res.json(recipies);
        } catch (e) {
            next(e);
        }
    }
}