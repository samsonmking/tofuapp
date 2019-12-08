import { RecipeIngredient } from "../recipe-ingredient";

export interface IngredientRepo {
    getIngredientsforRecipe(recipeId: number): Promise<RecipeIngredient[]>;
    addIngredient(payload: RecipeIngredient): Promise<RecipeIngredient>;
    addIngredients(payload: RecipeIngredient[]): Promise<RecipeIngredient[]>;
    updateIngredient(payload: RecipeIngredient): Promise<RecipeIngredient>;
    deleteIngredient(id: number): Promise<boolean>;
}
