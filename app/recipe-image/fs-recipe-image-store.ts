import { RecipeImageStore } from "./recipe-image-store";
import { RecipeImageConverter, ImageConversionResult } from "./recipe-image-converter";
import request from 'request';
import fs from 'fs';
import { imagesRoot } from "./config";
import path from 'path';
import sharp = require("sharp");

export class FileRecipeImageStore implements RecipeImageStore, RecipeImageConverter {
    constructor(private outDir: string = imagesRoot) {

    }

    getImagePathForRecipe(id: number): string {
        return path.normalize(`${this.outDir}/${id}.jpg`)
    }    
    
    saveImage(recipeId: number, uri: string): Promise<ImageConversionResult> {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(this.getImagePathForRecipe(recipeId));
            const resize = sharp().resize(400, 300);
            request(uri).pipe(resize);
            resize.pipe(fileStream);
            fileStream.on('finish', () => {
                resolve({ success: true, error: undefined });
            });
        });
    }
}