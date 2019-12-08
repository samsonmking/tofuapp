import { IngredientParser } from "./ingredient-parser";
import { RecipeIngredient } from "./recipe-ingredient";
import { Units } from "./Units";
import rp from 'request-promise-native';
import { IngredientParsingResult } from "./ingredients-parsing-result";
import { apiKey } from "./config";
import { ParsedIngredient } from "./parsed-ingredient";

export class ZestfulIngredientParser implements IngredientParser {
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
            if(current.error) {
                return this.updateParsingResult(acc, current.error);
            }
            if(current.ingredientParsed && current.ingredientParsed.product) {
                return this.updateParsingResult(acc, current.error,  {
                    ingredient: current.ingredientParsed.product,
                    quantity: current.ingredientParsed.quantity || 1,
                    unit: this.getUnit(current.ingredientParsed.unit)
                })
            } else {
                return this.updateParsingResult(acc, `Could not parse '${current.ingredientRaw}'`);
            }
        }, 
        {
            error: [],
            recipeIngredients: []
        });

    }

    private updateParsingResult(original: IngredientParsingResult, error?: string, ingredient?: ParsedIngredient) {
        return {
            error: error ? [...original.error, error] : original.error,
            recipeIngredients: ingredient ? [...original.recipeIngredients, ingredient] : original.recipeIngredients
        };
    }

    private getUnit(unit?: string): Units {
        if(!unit) {
            return Units.Item;
        } else {
            switch(unit.toLowerCase()) {
                case Units.Cups.toString().toLowerCase():
                    return Units.Cups;
                case Units.Oz.toString().toLowerCase():
                    return Units.Oz;
                case Units.Tablespoon.toString().toLowerCase():
                    return Units.Tablespoon;
                case Units.Teaspoon.toString().toLowerCase():
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