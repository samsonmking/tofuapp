import { RecipeImageConverter, ImageConversionResult } from "../../app/recipe-image";

export class MockImageConverter implements RecipeImageConverter {
    saveImage(recipeId: number, uri: string): Promise<ImageConversionResult> {
        return Promise.resolve({ success: true });
    }

    constructor() { }
}