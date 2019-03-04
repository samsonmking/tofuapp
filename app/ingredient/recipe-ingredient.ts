export interface RecipeIngredient {
    ingredient: string,
    quantity: number,
    unit: Units
}

export enum Units {
    Item = "item",
    Teaspoon = "teaspoon",
    Tablespoon = "tablespoon",
    Cups = "cup",
    Oz = "oz"
}
