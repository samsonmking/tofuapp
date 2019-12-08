import { Units } from "./Units";

export interface ParsedIngredient {
    ingredient: string;
    quantity: number;
    unit: Units;
}