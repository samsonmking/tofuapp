import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';

@Injectable({ providedIn: ServicesModule })
export class ShoppingListItemService {

    constructor(private readonly http: HttpClient) {

    }

    public addItemsToList(listId: number, items: ShoppingListItem[]) {
        return this.http.post<ShoppingListItem[]>(`http://localhost:3000/list/${listId}/items`, items, 
        { headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })});
    }

    public getItemsForList(listId: number) {
        return this.http.get<ShoppingListItem[]>(`http://localhost:3000/list/${listId}/items`);
    }

    public deleteRecipeFromList(listId: number, recipeId: number) {
        return this.http.delete<number[]>(`http://localhost:3000/list/${listId}/recipe/${recipeId}`);
    }

    public deleteItemsFromList(listId: number) {
        return this.http.delete<number[]>(`http://localhost:3000/list/${listId}/items`);
    }
}