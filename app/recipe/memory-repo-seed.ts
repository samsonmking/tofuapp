import { MemoryRecipeRepo } from "./memory-recipe-repo";
import { Units } from "../ingredient/recipe-ingredient";

export const seedRepo = () => {
    const innerRepo = new MemoryRecipeRepo();
    const recipies = [
        {
            name: "quiche",
            url: "http://food.com",
            ingredients: [
                { ingredient: "egg", quantity: 4, unit: Units.Item }
            ]
        },
        {
            name: "pizza",
            url: "http://food.com",
            ingredients: [
                { ingredient: "tomato sauce", quantity: 1, unit: Units.Cups },
                { ingredient: "cheese", quantity: 1, unit: Units.Cups }, 
                { ingredient: "sausage", quantity: 4, unit: Units.Oz }
            ]
        }
    ];
    recipies.forEach(recipe => innerRepo.addRecipe(recipe));
    return innerRepo;
}