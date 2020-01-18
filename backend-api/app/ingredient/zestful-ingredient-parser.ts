import { IngredientParser } from "./ingredient-parser";
import rp from 'request-promise-native';
import { IngredientParsingResult } from "./ingredients-parsing-result";
import { ParsedIngredient } from "./parsed-ingredient";
const { ZESTFULAPIKEY } = process.env;

export class ZestfulIngredientParser implements IngredientParser {

    public async parse(ingredients: string[]): Promise<IngredientParsingResult> {
        const results: Results = await this.callZestful(ingredients);
        return results.results.reduce<IngredientParsingResult>((acc, current) => {
            if(current.error) {
                return this.updateParsingResult(acc, current.error);
            }
            if(current.ingredientParsed && current.ingredientParsed.product) {
                return this.updateParsingResult(acc, current.error,  this.mapIngredient(current.ingredientParsed))
            } else {
                return this.updateParsingResult(acc, `Could not parse '${current.ingredientRaw}'`);
            }
        }, 
        {
            error: [],
            recipeIngredients: []
        });
    }

    private async callZestful(ingredients: string[]) {
        const options = {
            method: 'POST',
            uri: 'https://zestful.p.rapidapi.com/parseIngredients',
            headers: {
                'X-RapidAPI-Key': ZESTFULAPIKEY,
                'Content-Type': 'application/json'
            },
            body: {
                ingredients: ingredients
            },
            json: true
        }

        return await rp(options);
    }

    private mapIngredient(input: IngredientParsed): ParsedIngredient {
        const addQuantity = (i: IngredientParsed) => i.quantity ? { quantity: i.quantity } : { };
        const addUnit = (i: IngredientParsed) => i.unit ? { unit: i.unit } : { };
        return {
            ingredient: input.product || "Unknown",
            ...addQuantity(input),
            ...addUnit(input)
        }
    }

    private updateParsingResult(original: IngredientParsingResult, error?: string, ingredient?: ParsedIngredient) {
        return {
            error: error ? [...original.error, error] : original.error,
            recipeIngredients: ingredient ? [...original.recipeIngredients, ingredient] : original.recipeIngredients
        };
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