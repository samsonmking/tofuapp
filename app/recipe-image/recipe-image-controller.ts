import { Request, Response, NextFunction } from "express";
import boom = require("boom");
import { RecipeImageConverter } from "./recipe-image-converter";
import { RecipeImageStore } from "./recipe-image-store";

export class RecipeImageController {
    constructor(private converter: RecipeImageConverter,
        private store: RecipeImageStore) {

        }

    addNewImage = async(req: Request, res: Response, next: NextFunction) => {
        const recipeId = req.body.recipeId;
        if(!recipeId) {
            return next(boom.badRequest('missing recipe id'));
        }
        const imageUrl = req.body.imageUrl;
        if(!imageUrl) {
            return next(boom.badRequest('missing image url'));
        }

        try {
           await this.converter.saveImage(recipeId, imageUrl);
            res.json({path: this.store.getImagePathForRecipe(recipeId)});
        } catch (e) {
            next(boom.notAcceptable(e));
        }
    }

    updateImage = async(req: Request, res: Response, next: NextFunction) => {
        const recipeId = req.params.recipeId;
        if(!recipeId) {
            return next(boom.badRequest('missing recipe id'));
        }
        const imageUrl = req.body.imageUrl;
        if(!imageUrl) {
            return next(boom.badRequest('missing image url'));
        }

        try {
            await this.converter.saveImage(recipeId, imageUrl);
            res.json({path: this.store.getImagePathForRecipe(recipeId)});
        } catch (e) {
            next(boom.notAcceptable(e));
        }
    }

}