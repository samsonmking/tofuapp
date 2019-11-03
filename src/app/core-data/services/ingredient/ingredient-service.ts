import { Observable } from 'rxjs';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: ServicesModule })
export class IngredientService {
    constructor(private http: HttpClient) {}

    getIngredientForRecipe(recipeId: number): Observable<RecipeIngredient[]> {
        return this.http.get<RecipeIngredient[]>(`http://localhost:3000/recipe/${recipeId}/ingredients`).pipe(first());
    }
}