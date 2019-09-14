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

    getRecipies = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const recipies = await this.repo.getRecipes();
            res.json(recipies);
        } catch (e) {
            next(e);
        }
    };

    getRecipe = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const recipe = await this.repo.getRecipeWithIngredients(parseInt(req.params.id));
            res.json(recipe);
        } catch (e) {
            next(e);
        }
    }

    addNewRecipe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const name = req.body.name;
            if (!name) {
                return next(boom.badRequest('missing name'));
            }
            const url = req.body.url;
            if(!url) {
                return next(boom.badRequest('missing url'));
            }
            const ingredientRaw = req.body.ingredients;
            if(!ingredientRaw) {
                return next(boom.badRequest('missing ingredients'));
            }
            const imageSource = req.body.imageUrl;
            if(!imageSource) {
                return next(boom.badRequest('missing image source'));
            }

            const ingredientSource = (<string>ingredientRaw).split(/\r?\n/);
            const parseResults = await this.parser.parse(ingredientSource);
            if(parseResults.error.length > 0) {
                return next(boom.badData('failed to parse ingredients'));
            }

            const newRecipe = await this.repo.addRecipe({
                name: name,
                url: url,
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

    updateRecipe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedRecipe = await this.repo.updateRecipe(req.body);
            res.json(updatedRecipe);
        } catch (e) {
            next(e);
        }
    }
}