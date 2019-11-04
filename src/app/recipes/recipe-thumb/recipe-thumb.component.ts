import { Component, OnInit, Input } from '@angular/core';
import { DisplayRecipe } from 'src/app/core-data/models/recipe/display-recipe';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-thumb',
  templateUrl: './recipe-thumb.component.html',
  styleUrls: ['./recipe-thumb.component.css']
})
export class RecipeThumbComponent implements OnInit {
  @Input() recipe: DisplayRecipe;
  disabled$: Observable<boolean>;
  flag: boolean;

  constructor(
    private readonly listItems: ShoppingListItemFacade) {
    this.disabled$ = this.listItems.recipeIdsInCurrentList$.pipe(
      map(ids => ids.has(this.recipe.id))
    );

  }

  ngOnInit() {

  }

  addRecipeToList() {
    this.listItems.addRecipeToList(this.recipe.id);
  }

}
