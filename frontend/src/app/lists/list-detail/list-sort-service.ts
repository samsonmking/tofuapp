import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil, publishReplay, refCount } from 'rxjs/operators';
import { combineLatest, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ShoppingListActionTypes } from 'src/app/core-data/state/shopping-list/shopping-list.actions';
import { GetIngredientsForCurrentListComplete, IngredientActionsType } from 'src/app/core-data/state/ingredient/ingredient.actions';
import { Sort } from '@angular/material';
import { DisplayListItem } from 'src/app/core-data/models/shopping-list-item/display-list-item';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ListSortService {
    private handle: Subscription;
    sortedItems$: Observable<DisplayListItem[]>;
    sort$ = new BehaviorSubject<Sort>({ active: 'recipe', direction: 'asc' });
    constructor(
        private readonly listItemsFacade: ShoppingListItemFacade,
        private readonly ingredientFacade: IngredientFacade,
        private readonly recipeFacade: RecipeFacade,
        private readonly actions$: Actions) {
    
        const ingredients$ = this.ingredientFacade.$ingredientState;
        const recipes$ = this.recipeFacade.recipeState$;
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
    
        const listSelectionChanged$ = this.actions$.pipe(
          ofType(ShoppingListActionTypes.SetDefaultList)
        );
    
        const switch$ = this.actions$.pipe(
          ofType<GetIngredientsForCurrentListComplete>(IngredientActionsType.GetIngredientsForCurrentListComplete),
          switchMap(_ => {
            return combineLatest(listItems$, this.sort$).pipe(
              map(([items, sort]) => sortData(items, sort)),
              takeUntil(listSelectionChanged$)
            );
          })
        );
    
        this.sortedItems$ = switch$.pipe(
          publishReplay(),
          refCount()
        );

        this.handle = this.sortedItems$.subscribe();
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
        case 'ingredient': return compare(a.ingredientName.toLowerCase(), b.ingredientName.toLowerCase(), isAsc);
        case 'quantity': return compare(a.ingredientQuantity, b.ingredientQuantity, isAsc);
        case 'unit': return compare(a.ingredientUnit.toLowerCase(), b.ingredientUnit.toLowerCase(), isAsc);
        case 'recipe': return compare(a.recipeName.toLowerCase(), b.recipeName.toLowerCase(), isAsc);
        default: return 0;
      }
    });
  }
  
  function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }