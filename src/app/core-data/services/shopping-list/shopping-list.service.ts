import { Observable } from 'rxjs';
import { ShoppingList } from '../../models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';

@Injectable({ providedIn: ServicesModule })
export class ShoppingListService {

    constructor(private readonly http: HttpClient) {

    }

    getAllShoppingLists() {
        return this.http.get<ShoppingList[]>(`http://localhost:3000/list`);
    }

    addShoppingList(list: ShoppingList) {
        return this.http.post<ShoppingList>(`http://localhost:3000/list`, list);
    }
}