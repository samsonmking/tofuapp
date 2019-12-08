import { StaticResource } from "../static-resource";
import express from 'express';

export class RecipeImageStatic implements StaticResource{

    contributeStatic(app: express.Application): void {
        app.use('/image/recipe', express.static('images'));
    }
}