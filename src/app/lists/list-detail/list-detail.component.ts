import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { map, filter, switchMap, first, takeUntil, publishReplay, share, refCount, shareReplay } from 'rxjs/operators';
import { Observable, combineLatest, BehaviorSubject, Subscription } from 'rxjs';
import { IngredientFacade } from 'src/app/core-data/state/ingredient/ingredient.facade';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Sort } from '@angular/material/sort';
import { Actions, ofType } from '@ngrx/effects';
import { GetIngredientsForCurrentListComplete, IngredientActionsType, GetIngredientsForCurrentListRequest } from 'src/app/core-data/state/ingredient/ingredient.actions';
import { SetDefaultList, ShoppingListActionTypes } from 'src/app/core-data/state/shopping-list/shopping-list.actions';
import { DisplayListItem } from 'src/app/core-data/models/shopping-list-item/display-list-item';
import { ListSortService } from './list-sort-service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  sortedItems$: Observable<DisplayListItem[]>;
  displayedColumns: string[] = ['checked', 'ingredient', 'quantity', 'unit', 'recipe'];

  constructor(private readonly listSortService: ListSortService,
    private readonly listItemsFacade: ShoppingListItemFacade) {
    this.sortedItems$ = this.listSortService.sortedItems$
  }

  ngOnInit() {
  }

  setSort(sort: Sort) {
    this.listSortService.sort$.next(sort);
  }

  itemChecked(id: number, isChecked: boolean) {
    this.listItemsFacade.checkListItem(id, isChecked);
  }

}




