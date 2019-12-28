import { Observable } from 'rxjs';
import { ShoppingList } from '../../models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: ServicesModule })
export class ShoppingListService {

    constructor(private readonly http: HttpClient) {

    }

    getAllShoppingLists() {
        return this.http.get<ShoppingList[]>(`${environment.baseUrl}/list`);
    }

    addShoppingList(list: ShoppingList) {
        return this.http.post<ShoppingList>(`${environment.baseUrl}/list`, list);
    }

    updateShoppingList(list: ShoppingList) {
        return this.http.put<ShoppingList>(`${environment.baseUrl}/list/${list.id}`, list);
    }

    deleteShoppingList(id: number) {
        return this.http.delete<number>(`${environment.baseUrl}/list/${id}`);
    }
}