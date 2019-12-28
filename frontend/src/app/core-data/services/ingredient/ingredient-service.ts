import { Observable } from 'rxjs';
import { RecipeIngredient } from '../../models/ingredient/recipe-ingredient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: ServicesModule })
export class IngredientService {
    constructor(private http: HttpClient) {}

    getIngredientForRecipe(recipeId: number): Observable<RecipeIngredient[]> {
        return this.http.get<RecipeIngredient[]>(`${environment.baseUrl}/recipe/${recipeId}/ingredients`).pipe(first());
    }
}