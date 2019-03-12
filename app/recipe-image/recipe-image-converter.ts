export interface RecipeImageConverter {
    saveImage(recipeId: number, uri: string): Promise<ImageConversionResult>
}

export interface ImageConversionResult {
    success: boolean,
    error? : string
}