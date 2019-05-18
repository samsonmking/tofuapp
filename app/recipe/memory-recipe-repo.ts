import { RecipeRepo } from "./recipe-repo";
import { Recipe } from "./recipe";
import { NewRecipe } from "./new-recipe";
import { ShortRecipe } from "./short-recipe";

export class MemoryRecipeRepo implements RecipeRepo {
    private store: Map<number, Recipe>;
    private index: number;

    constructor(seed: Map<number, Recipe> = new Map<number, Recipe>(),
     index: number = 1) {
        this.store = seed;
        this.index = index;
    }

    async getRecipes(): Promise<ShortRecipe[]> {
       return (await this.getFullRecipes()).map(full => {
           const { ingredients, ...short } = full;
           return short;
       });
    }    

    getFullRecipes() : Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            resolve(Array.from(this.store.values()));
        });
    }
    
    getRecipe(id: number): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            this.store.has(id) ? resolve(this.store.get(id)) : reject(`recipe ${id} not found`);
        });
    }

    addRecipe(recipe: NewRecipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            const updatedRecipe = Object.assign({}, recipe, {id: this.index++});
            this.store.set(updatedRecipe.id, updatedRecipe);
            resolve(updatedRecipe);
        });
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            if(this.store.has(recipe.id)) {
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
            if(this.store.has(id)) {
                this.store.delete(id);
                resolve(true);
            } else {
                reject(`not found`);
            }
        });
    }
}