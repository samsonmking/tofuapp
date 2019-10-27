import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { NewRecipe } from '../../models/manual-entry/new-recipe';

@Injectable({ providedIn: ServicesModule })
export class RecipeService {
    getAllRecipies(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`http://localhost:3000/recipe`);
    }

    getRecipeDetails(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`http://localhost:3000/recipe/${id}`);
    }

    submitNewRecipe(payload: NewRecipe): Observable<Recipe> {
        return this.http.post<Recipe>('http://localhost:3000/recipe', payload);
    }

    constructor(private http: HttpClient) {}
}