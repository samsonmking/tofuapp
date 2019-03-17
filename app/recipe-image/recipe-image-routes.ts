import { Route } from "../route";
import { StaticResource } from "../static-resource";
import { RecipeImageController } from "./recipe-image-controller";
import express from 'express';

export class RecipeImageRoutes implements Route {
    constructor(private controller: RecipeImageController) {

    }

    contributeRoutes(app: express.Application): void {
        app.post('/image/recipe', this.controller.addNewImage);
    }    
    
}