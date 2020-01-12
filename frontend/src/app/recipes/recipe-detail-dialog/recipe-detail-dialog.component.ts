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
  private readonly id: number;
  private readonly onDelete: () => void;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private facade: RecipeFacade,
              private ingredientFacade: IngredientFacade) {
    this.id = Number.parseInt(data.recipeId, 10);
    this.onDelete = data.onDelete
    if (this.id) {
      this.fullRecipe$ = facade.getRecipe(this.id);
      this.ingredients$ = ingredientFacade.getIngredientsForRecipe(this.id);
    }
  }

  deleteRecipe() {
    this.onDelete();
  }
}
