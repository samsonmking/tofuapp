import { RecipeIngredient } from './recipe-ingredient';

export interface Recipe {
    id: number;
    name: string;
    url: string;
    ingredients?: RecipeIngredient[];
}
