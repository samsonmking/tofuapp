import { IngredientParser } from "./ingredient-parser";
import { RecipeIngredient, Units } from "./recipe-ingredient";
import rp from 'request-promise-native';
import { IngredientParsingResult } from "./ingredients-parsing-result";
import { apiKey } from "./config";

export class ZestfulIngredientParser {
    async parse(ingredients: string[]): Promise<IngredientParsingResult> {
        const options = {
            method: 'POST',
            uri: 'https://zestful.p.rapidapi.com/parseIngredients',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: {
                ingredients: ingredients
            },
            json: true
        }

        const results: Results = await rp(options);
        return results.results.reduce<IngredientParsingResult>((acc, current) => {
            
            return this.updateParsingResult(acc, current.error, current.ingredientParsed ? {
                ingredient: current.ingredientParsed.product || '',
                quantity: current.ingredientParsed.quantity || 0,
                unit: this.getUnit(current.ingredientParsed.unit)
            } : undefined)
        }, 
        {
            error: [],
            recipeIngredients: []
        });

    }

    private updateParsingResult(original: IngredientParsingResult, error?: string, ingredient?: RecipeIngredient) {
        return {
            error: error ? [...original.error, error] : original.error,
            recipeIngredients: ingredient ? [...original.recipeIngredients, ingredient] : original.recipeIngredients
        };
    }

    private getUnit(unit?: string): Units {
        if(!unit) {
            return Units.Item;
        } else {
            switch(unit) {
                case Units.Cups.toString():
                    return Units.Cups;
                case Units.Oz.toString():
                    return Units.Oz;
                case Units.Tablespoon.toString():
                    return Units.Tablespoon;
                case Units.Teaspoon.toString():
                    return Units.Teaspoon;
                default:
                    return Units.Item;
            }
        }
    }
}

interface Results {
    error?: string,
    results: Result[]
}

interface Result {
    error?: string,
    ingredientParsed?: IngredientParsed,
    ingredientRaw: string
}

interface IngredientParsed {
    quantity?: number,
    unit?: string,
    product?: string,
    preparationNotes?: string
}