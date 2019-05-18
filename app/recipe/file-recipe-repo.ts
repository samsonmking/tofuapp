import { RecipeRepo } from "./recipe-repo";
import { Recipe } from ".";
import { MemoryRecipeRepo } from "./memory-recipe-repo";
import fs from 'fs';
import util from 'util';
import { NewRecipe } from "./new-recipe";
import { ShortRecipe } from "./short-recipe";

export class FileRecipeRepo implements RecipeRepo {
    private readonly innerRepo: MemoryRecipeRepo;

    constructor(private filePath: string) {
        this.innerRepo = new MemoryRecipeRepo();
        if(fs.existsSync(filePath)) {
            const recipies = this.loadFromFile();
            const seed = recipies.reduce<Seed>((acc: Seed, cur: Recipe) => {
                if(cur.id) {
                    acc.recipies.set(cur.id, cur)
                    return Object.assign({}, acc, { index: Math.max(acc.index, cur.id) });
                } else {
                    return acc;
                }
            }, {
                recipies: new Map<number, Recipe>(),
                index: 0
            });

            this.innerRepo = new MemoryRecipeRepo(seed.recipies, seed.index);
        }
    }
    
    getRecipes(): Promise<ShortRecipe[]> {
        return this.innerRepo.getRecipes();
    }    
    
    getRecipe(id: number): Promise<Recipe> {
        return this.innerRepo.getRecipe(id);
    }

    async addRecipe(recipe: NewRecipe): Promise<Recipe> {
        const newRecipe = await this.innerRepo.addRecipe(recipe);
        const updatedRecipies = await this.innerRepo.getFullRecipes();
        await this.saveToFile(updatedRecipies);
        return newRecipe
    }

    async updateRecipe(recipe: Recipe): Promise<Recipe> {
        const updatedRecipe = await this.innerRepo.updateRecipe(recipe);
        const updatedRecipies = await this.innerRepo.getFullRecipes();
        await this.saveToFile(updatedRecipies);
        return updatedRecipe;
    }

    async deleteRecipe(id: number): Promise<boolean> {
        const deleted = await this.innerRepo.deleteRecipe(id);
        if (deleted) {
            const updatedRecipies = await this.innerRepo.getFullRecipes();
            await this.saveToFile(updatedRecipies);
        }
        return deleted;
    }

    private async saveToFile(recipies: Recipe[]) {
        const writeToFile = util.promisify(fs.writeFile);
        await writeToFile(this.filePath, JSON.stringify(recipies, null, 2));
    }

    private loadFromFile() : Recipe[] {
        const recipeJSON = fs.readFileSync(this.filePath);
        return JSON.parse(recipeJSON.toString());
    }
}

interface Seed {
    recipies: Map<number, Recipe>,
    index: number
}