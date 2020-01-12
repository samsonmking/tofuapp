import { RecipeRepo } from "./recipe-repo";
import { Request, Response, NextFunction } from "express";
import { IngredientParser } from "../ingredient/ingredient-parser";
import boom from 'boom';
import { RecipeImageConverter } from "../recipe-image";
import { IngredientRepo } from "../ingredient/persistance/ingredient-repo";

export class RecipeController {
    constructor(
        private repo: RecipeRepo,
        private ingredientRepo: IngredientRepo,
        private parser: IngredientParser,
        private imageConverter: RecipeImageConverter
    ) {
    }

    getRecipies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const recipies = await this.repo.getRecipes(req.params.userId);
            res.json(recipies);
        } catch (e) {
            next(e);
        }
    };

    getRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const recipe = await this.repo.getRecipeWithIngredients(parseInt(req.params.id));
            res.json(recipe);
        } catch (e) {
            next(e);
        }
    }

    addNewRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const name: string = req.body.name;
            if (!name) {
                return next(boom.badRequest('missing name'));
            }
            const url: string = req.body.url;
            if (!url) {
                return next(boom.badRequest('missing url'));
            }
            const ingredientRaw: string = req.body.ingredients;
            if (!ingredientRaw) {
                return next(boom.badRequest('missing ingredients'));
            }
            const imageSource: string = req.body.imageUrl;
            if (!imageSource) {
                return next(boom.badRequest('missing image source'));
            }

            const ingredientSource = (<string>ingredientRaw).split(/\r?\n/);
            const parseResults = await this.parser.parse(ingredientSource);
            if (parseResults.error.length > 0) {
                const error = boom.badData('failed to parse ingredients');
                error.reformat();
                (error.output.payload as any).parseErrors = parseResults.error;
                return next(error);
            }

            const newRecipe = await this.repo.addRecipe({
                name: name.toLowerCase(),
                url: url,
                user_id: req.params.userId
            });

            await this.imageConverter.saveImage(newRecipe.id, imageSource);
            const newIngredients = parseResults.recipeIngredients.map((i) =>
                ({ recipe_id: newRecipe.id, ...i }));
            const createdIngredients = await this.ingredientRepo.addIngredients(newIngredients);
            res.json({ ...newRecipe, ingredients: createdIngredients });
        } catch (e) {
            next(e);
        }
    };

    updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedRecipe = await this.repo.updateRecipe(req.body);
            res.json(updatedRecipe);
        } catch (e) {
            next(e);
        }
    }

    deleteRecipe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const deleted = await this.repo.deleteRecipe(id);
            (deleted === true) ? 
                res.status(204).send() : next(boom.badImplementation(`Failed to delete recipe ${id} from database`));
        } catch (e) {
            next(e);
        }
    }
}