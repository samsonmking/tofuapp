import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { map, filter, switchMap, first } from 'rxjs/operators';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Sort } from '@angular/material/sort';
import { Actions, ofType } from '@ngrx/effects';
import { GetIngredientsForCurrentListComplete, IngredientActionsType } from 'src/app/core-data/state/ingredient/ingredient.actions';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  sortedItems$: Observable<DisplayListItem[]>;
  sort$ = new BehaviorSubject<Sort>({ active: 'recipe', direction: 'asc' });
  displayedColumns: string[] = ['checked', 'ingredient', 'quantity', 'unit', 'recipe'];

  constructor(
    private readonly listItemsFacade: ShoppingListItemFacade,
    private readonly ingredientFacade: IngredientFacade,
    private readonly recipeFacade: RecipeFacade,
    private readonly actions$: Actions) {

  }

  ngOnInit() {
    const ingredients$ = this.ingredientFacade.$ingredientState.pipe(filter(i => i.ids.length > 0));
    const recipes$ = this.recipeFacade.recipeState$.pipe(filter(r => r.ids.length > 0));
    const items$ = this.listItemsFacade.itemsInCurrentList$;

    const listItems$ = combineLatest(ingredients$, recipes$, items$).pipe(
      map(([ingredients, recipes, items]) => {
        return items.map(curr => {
          const recipe = recipes.entities[curr.recipe_id];
          const ingredient = ingredients.entities[curr.ingredient_id];
            return {
              itemId: curr.id,
              checked: curr.checked,
              ingredientName: ingredient.ingredient,
              ingredientQuantity: ingredient.quantity,
              ingredientUnit: ingredient.unit,
              recipeName: recipe.name
            };
        })
      })
    );

    this.sortedItems$ = this.actions$.pipe(
      ofType<GetIngredientsForCurrentListComplete>(IngredientActionsType.GetIngredientsForCurrentListComplete),
      switchMap(_ => {
        return combineLatest(listItems$, this.sort$).pipe(
          map(([items, sort]) => sortData(items, sort)),
          first()
        );
      })
    );
  }

  itemChecked(id: number, isChecked: boolean) {
    this.listItemsFacade.checkListItem(id, isChecked);
  }

}

function sortData(items: DisplayListItem[], sort: Sort) {
  const data = items.slice();
  if (!sort.active || sort.direction === '') {
    return data;
  }

  return data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'checked': return compare(a.checked, b.checked, isAsc);
      case 'ingredient': return compare(a.ingredientName, b.ingredientName, isAsc);
      case 'quantity': return compare(a.ingredientQuantity, b.ingredientQuantity, isAsc);
      case 'unit': return compare(a.ingredientUnit, b.ingredientUnit, isAsc);
      case 'recipe': return compare(a.recipeName, b.recipeName, isAsc);
      default: return 0;
    }
  });
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface DisplayListItem {
  itemId: number;
  checked: boolean;
  ingredientName: string;
  ingredientQuantity: number;
  ingredientUnit: string;
  recipeName: string;
}
