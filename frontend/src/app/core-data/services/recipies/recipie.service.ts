import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { NewRecipe } from '../../models/manual-entry/new-recipe';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: ServicesModule })
export class RecipeService {
    getAllRecipies(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${environment.baseUrl}/api/recipe`).pipe(first());
    }

    getRecipeDetails(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${environment.baseUrl}/api/recipe/${id}`);
    }

    submitNewRecipe(payload: NewRecipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${environment.baseUrl}/api/recipe`, payload);
    }

    constructor(private http: HttpClient) {}
}