import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingListItem } from '../../models/shopping-list-item/shopping-list-item';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: ServicesModule })
export class ShoppingListItemService {

    constructor(private readonly http: HttpClient) {

    }

    public addItemsToList(listId: number, items: ShoppingListItem[]) {
        return this.http.post<ShoppingListItem[]>(`${environment.baseUrl}/api/list/${listId}/items`, items, 
        { headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })});
    }

    public getItemsForList(listId: number) {
        return this.http.get<ShoppingListItem[]>(`${environment.baseUrl}/api/list/${listId}/items`);
    }

    public deleteRecipeFromList(listId: number, recipeId: number) {
        return this.http.delete<number[]>(`${environment.baseUrl}/api/list/${listId}/recipe/${recipeId}`);
    }

    public deleteItemsFromList(listId: number) {
        return this.http.delete<number[]>(`${environment.baseUrl}/api/list/${listId}/items`);
    }

    public updateShoppingListItem(payload: ShoppingListItem) {
        return this.http.put<ShoppingListItem>(`${environment.baseUrl}/api/item/${payload.id}`, payload);
    }
}