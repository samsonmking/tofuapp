export interface RecipeIngredient {
    ingredient: string,
    quantity: number,
    unit: Units
}

export enum Units {
    Item = "ITEM",
    Tsp = "TSP",
    Tbsp = "TBSP",
    Cups = "CUPS",
    Oz = "OZ"
}
