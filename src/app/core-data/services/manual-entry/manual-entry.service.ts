import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NewRecipe } from '../../models/manual-entry/new-recipe';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe/recipe';
import { ServicesModule } from '../services.module';

@Injectable({providedIn: ServicesModule})
export class ManualEntryService {

    submitNewRecipe(payload: NewRecipe): Observable<Recipe> {
        return this.http.post<Recipe>('http://localhost:3000/recipe', payload);
    }

    constructor(
        private http: HttpClient
    ) { }
}