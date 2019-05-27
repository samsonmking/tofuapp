import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RecipeFacade } from 'src/app/core-data/state/recipies/recipes.facade';
import { Observable } from 'rxjs';
import { DisplayRecipe } from 'src/app/core-data/models/recipe/display-recipe';

@Component({
  selector: 'app-recipe-detail-dialog',
  templateUrl: './recipe-detail-dialog.component.html',
  styleUrls: ['./recipe-detail-dialog.component.css']
})
export class RecipeDetailDialogComponent {
  fullRecipe$: Observable<DisplayRecipe>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private facade: RecipeFacade) {
    const id = Number.parseInt(data.recipeId, 10);
    if (id) {
      this.fullRecipe$ = facade.getRecipeDetails(id);
    }
  }
}
