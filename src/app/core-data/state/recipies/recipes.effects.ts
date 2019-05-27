import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { RecipesState } from './recipes.reducer';
import { RecipeService } from '../../services/recipies/recipie.service';
import { RecipesActionTypes, GetAllRequest, GetAllComplete, GetRecipeDetails, RecipeDetailsComplete } from './recipes.actions';
import { DisplayRecipe } from '../../models/recipe/display-recipe';
import { Recipe } from '../../models/recipe/recipe';
import { map, switchMap } from 'rxjs/operators';
import { selectRecipeEntities } from '..';

@Injectable({providedIn: 'root'})
export class RecipesEffects {

    @Effect()
    getRecipes$ = this.dataPersistance.pessimisticUpdate(RecipesActionTypes.GetAllRequest, {
        run: (action: GetAllRequest, state: RecipesState) => {
            return this.service.getAllRecipies().pipe(
                map(recipes => recipes.map(r => this.getDisplayRecipe(r))),
                map(displayRecipies => new GetAllComplete(displayRecipies))
            );
        },

        onError: (action: GetAllRequest, error) => {
            console.log('Error', error);
        }
    });

    @Effect()
    getRecipeDetails$ = this.dataPersistance.pessimisticUpdate(RecipesActionTypes.GetRecipeDetails, {
        run: (action: GetRecipeDetails, state: RecipesState) => {
            const id = action.payload;
            const lastState = selectRecipeEntities(state)[id];
            if (lastState && lastState.ingredients) {
                return new RecipeDetailsComplete(lastState);
            } else {
                return this.service.getRecipeDetails(id).pipe(
                    map(r => this.getDisplayRecipe(r)),
                    map(r => new RecipeDetailsComplete(Object.assign({}, lastState, r)))
                );
            }
        },

        onError: (action: GetAllRequest, error) => {
            console.log('Error', error);
        }
    });

    private getDisplayRecipe(recipe: Recipe): DisplayRecipe {
        return Object.assign({}, recipe,
            {
                imageUrl: `http://localhost:3000/image/recipe/${recipe.id}.jpg`
            });
    }

    constructor(
        private actions$: Actions,
        private dataPersistance: DataPersistence<RecipesState>,
        private service: RecipeService
    ) {}
}