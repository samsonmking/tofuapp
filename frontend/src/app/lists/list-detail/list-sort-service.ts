import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { ShoppingListActionTypes } from 'src/app/core-data/state/shopping-list/shopping-list.actions';
import { Sort } from '@angular/material';
import { DisplayListItem } from 'src/app/core-data/models/shopping-list-item/display-list-item';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListSortService {
  sortedItems$: Observable<DisplayListItem[]>;
  sort$ = new BehaviorSubject<Sort>({ active: 'recipe', direction: 'asc' });
  constructor(
    private readonly listItemsFacade: ShoppingListItemFacade,
    private readonly actions$: Actions) {

    const listItems$ = this.listItemsFacade.displayItemsInCurrentList$;

    const listSelectionChanged$ = this.actions$.pipe(
      ofType(ShoppingListActionTypes.SetDefaultList)
    );

    this.sortedItems$  = this.actions$.pipe(
      switchMap(_ => {
        return combineLatest(listItems$, this.sort$).pipe(
          map(([items, sort]) => sortData(items, sort)),
          takeUntil(listSelectionChanged$)
        );
      })
    );
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
      case 'ingredient': return compareNullableString(a.ingredientName, b.ingredientName, isAsc);
      case 'quantity': return compare(a.ingredientQuantity, b.ingredientQuantity, isAsc);
      case 'unit': return compareNullableString(a.ingredientUnit, b.ingredientUnit, isAsc);
      case 'recipe': return compareNullableString(a.recipeName, b.recipeName, isAsc);
      default: return 0;
    }
  });
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareNullableString(a: string, b: string, isAsc: boolean) {
  return ((a ? a.toLowerCase() : "")  < (b ? b.toLowerCase() : "") ? -1 : 1) * (isAsc ? 1 : -1);
}