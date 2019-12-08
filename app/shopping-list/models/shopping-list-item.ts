export interface ShoppingListItem {
    id?: number;
    shopping_list_id: number;
    ingredient_id: number;
    recipe_id: number;
    checked: boolean;
}