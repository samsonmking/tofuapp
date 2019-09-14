import { IngredientRepo } from "./persistance/ingredient-repo";
import { Request, Response, NextFunction } from "express";

export class IngredientController {
    constructor(private repo: IngredientRepo) {

    }

    getIngredientsForRecipe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const ingredients = await this.repo.getIngredientsforRecipe(req.params.recipeid);
            res.json(ingredients);
        } catch (e) {
            next(e);
        }
    }

    addIngredientToRecipe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const newIngredient = await this.repo.addIngredient(req.body);
            res.json(newIngredient);
        } catch (e) {
            next(e);
        }
    }
}