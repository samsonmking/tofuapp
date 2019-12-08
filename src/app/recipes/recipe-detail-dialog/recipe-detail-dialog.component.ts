import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Observable } from 'rxjs';
import { DisplayRecipe } from 'src/app/core-data/models/recipe/display-recipe';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeIngredient } from 'src/app/core-data/models/ingredient/recipe-ingredient';

@Component({
  selector: 'app-recipe-detail-dialog',
  templateUrl: './recipe-detail-dialog.component.html',
  styleUrls: ['./recipe-detail-dialog.component.css']
})
export class RecipeDetailDialogComponent {
  fullRecipe$: Observable<DisplayRecipe>;
  ingredients$: Observable<RecipeIngredient[]>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private facade: RecipeFacade,
              private ingredientFacade: IngredientFacade) {
    const id = Number.parseInt(data.recipeId, 10);
    if (id) {
      this.fullRecipe$ = facade.getRecipe(id);
      this.ingredients$ = ingredientFacade.getIngredientsForRecipe(id);
    }
  }
}
