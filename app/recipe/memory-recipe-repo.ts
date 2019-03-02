import { RecipeRepo } from "./recipe-repo";
import { Recipe } from "./recipe";

export class MemoryRecipeRepo implements RecipeRepo {
    private store: Map<number, Recipe>;
    private index: number;

    constructor() {
        this.store = new Map<number, Recipe>();
        this.index = 1;
    }

    getRecipies(): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            resolve(Array.from(this.store.values()));
        });
    }    
    
    getRecipe(id: number): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            this.store.has(id) ? resolve(this.store.get(id)) : reject(`recipe ${id} not found`);
        });
    }

    addRecipe(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            if(recipe.id) {
                reject(`new recipe cannot have id`);
            } else {
                const updatedRecipe = Object.assign({}, recipe, {id: this.index++});
                this.store.set(updatedRecipe.id, updatedRecipe);
                resolve(updatedRecipe);
            }
        });
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            if(recipe.id && this.store.has(recipe.id)) {
                this.store.delete(recipe.id);
                this.store.set(recipe.id, recipe);
                resolve(recipe);
            } else {
                reject(`recipe ${recipe.id} not found`);
            }
        });
    }

    deleteRecipe(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if(id && this.store.has(id)) {
                this.store.delete(id);
                resolve(true);
            } else {
                reject(`not found`);
            }
        });
    }
}