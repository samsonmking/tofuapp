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

        const result = await this.converter.saveImage(recipeId, imageUrl);
        if(result.success) {
            res.json({path: this.store.getImagePathForRecipe(recipeId)});
        } else {
            next(boom.notAcceptable(result.error));
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

        const result = await this.converter.saveImage(recipeId, imageUrl);
        if(result.success) {
            res.json({path: this.store.getImagePathForRecipe(recipeId)});
        } else {
            next(boom.notAcceptable(result.error));
        }
    }

}