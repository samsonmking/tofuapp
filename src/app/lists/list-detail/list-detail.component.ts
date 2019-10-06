import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, withLatestFrom, filter, reduce } from 'rxjs/operators';
import { Observable, combineLatest, zip } from 'rxjs';
import { RecipeIngredient } from 'src/app/core-data/models/ingredient/recipe-ingredient';
import { ShoppingListItem } from 'src/app/core-data/models/shopping-list-item/shopping-list-item';
import { Recipe } from 'src/app/core-data/models/recipe/recipe';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { IngredientService } from 'src/app/core-data/services/ingredient/ingredient-service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  listItems$: Observable<DisplayListItem[]>;

  constructor(
    private readonly listItemsFacade: ShoppingListItemFacade,
    private readonly ingredientFacade: IngredientFacade,
    private readonly recipeFacade: RecipeFacade,
    private readonly route: ActivatedRoute,
    private readonly is: IngredientService) {
      const listId$ = this.route.params.pipe(map(params => params.id));
    }

  ngOnInit() {
    const ingredients$ = this.ingredientFacade.$ingredientState.pipe(filter(i => i.ids.length > 0));
    const recipes$ = this.recipeFacade.recipeState$.pipe(filter(r => r.ids.length > 0));
    const items$ = this.listItemsFacade.itemsInCurrentList$.pipe(filter(i => i.length > 0));

    this.listItems$ =  combineLatest(ingredients$, recipes$, items$).pipe(
     map(([ingredients, recipes, items]) => {
       return items.reduce<DisplayListItem[]>((acc, curr) => {
         const recipe = recipes.entities[curr.recipe_id];
         const ingredient = ingredients.entities[curr.ingredient_id];
         if (recipe && ingredient) {
           return [...acc, {
             itemId: curr.id,
             ingredientName: ingredient.ingredient,
             ingredientQuantity: ingredient.quantity,
             ingredientUnit: ingredient.unit,
             recipeName: recipe.name
           }];
         } else {
           return acc;
         }
       }, [])
     })
    );
  }

}

interface DisplayListItem {
  itemId: number;
  ingredientName: string;
  ingredientQuantity: number;
  ingredientUnit: string;
  recipeName: string;
}
