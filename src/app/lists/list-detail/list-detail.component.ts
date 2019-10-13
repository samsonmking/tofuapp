import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { map, filter } from 'rxjs/operators';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  sortedItems$: Observable<DisplayListItem[]>;
  sort$ = new BehaviorSubject<Sort>({ active: 'ingredient', direction:'asc'});

  constructor(
    private readonly listItemsFacade: ShoppingListItemFacade,
    private readonly ingredientFacade: IngredientFacade,
    private readonly recipeFacade: RecipeFacade) {

    }

  ngOnInit() {
    const ingredients$ = this.ingredientFacade.$ingredientState.pipe(filter(i => i.ids.length > 0));
    const recipes$ = this.recipeFacade.recipeState$.pipe(filter(r => r.ids.length > 0));
    const items$ = this.listItemsFacade.itemsInCurrentList$.pipe(filter(i => i.length > 0));

    const listItems$ = combineLatest(ingredients$, recipes$, items$).pipe(
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

    this.sortedItems$ = combineLatest(listItems$, this.sort$).pipe(
      map(([items, sort]) => sortData(items, sort))
    )
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
      case 'ingredient': return compare(a.ingredientName, b.ingredientName, isAsc);
      case 'quantity': return compare(a.ingredientQuantity, b.ingredientQuantity, isAsc);
      case 'unit': return compare(a.ingredientUnit, b.ingredientUnit, isAsc);
      case 'recipe': return compare(a.recipeName, b.recipeName, isAsc);
      default: return 0;
    }
  });
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface DisplayListItem {
  itemId: number;
  ingredientName: string;
  ingredientQuantity: number;
  ingredientUnit: string;
  recipeName: string;
}
