import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { RecipeFacade } from '../core-data/state/recipe/recipes.facade';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { DisplayRecipe } from '../core-data/models/recipe/display-recipe';
import { MatDialog, MatDrawer } from '@angular/material';
import { ManualEntryComponent } from './add-recipe/manual-entry/manual-entry.component';
import { map, filter, mergeAll, distinctUntilChanged, debounceTime, startWith } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout';
import { ShoppingListFacade } from '../core-data/state/shopping-list/shopping-list.facade';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatDrawer;

  recipes$: Observable<DisplayRecipe[][]>;
  sideNavConfig$: Observable<SideNavConfig>;
  currentListName$: Observable<string>
  mqAlias$: any;
  filterText$ = new Subject<string>();
  searchToggle: boolean;


  constructor(private fascade: RecipeFacade,
    private listFacade: ShoppingListFacade,
    private dialog: MatDialog,
    private readonly mediaObserver: MediaObserver) {

      this.currentListName$ = this.listFacade.currentList$.pipe(
        map(list => list.name)
      )

      const mqAlias$ = this.mediaObserver.asObservable().pipe(
        mergeAll(),
        map(mq => mq.mqAlias)
      );

      this.mqAlias$ = mqAlias$.pipe(filter(alias => alias.length === 2))

      const chunkSize$ = mqAlias$.pipe(
        filter(alias => alias.length === 2),
        map(alias => {
            switch (alias) {
                case 'xs':
                    return 1;
                case 'sm':
                    return 2;
                case 'md':
                    return 3;
                default:
                    return 4;
            }
        }),
        distinctUntilChanged()
    );

    this.sideNavConfig$ = mqAlias$.pipe(
      filter(alias => alias.length === 2),
      map(alias => {
        switch(alias) {
          case 'xs':
            return { open: false, mode: 'over', top: 100, searchShownByDefault: false }
          case 'sm':
            return { open: false, mode: 'over', top: 100, searchShownByDefault: false }
          default:
            return { open: true, mode: 'side', top: 64, searchShownByDefault: true }
        }
      }),
      distinctUntilChanged((curr, prev) => 
        curr.mode === prev.mode && curr.open === prev.open)
    );

    const debounceFilter$ = this.filterText$.pipe(
      debounceTime(500),
      startWith('')
    );

    const filteredRecipes$ = combineLatest(this.fascade.recipes$, debounceFilter$).pipe(
      map(([recipes, fString]) => 
        fString.length > 0 ? recipes.filter(r => r.name.toLowerCase().includes(fString.toLowerCase())) : recipes)
    );

    this.recipes$ = combineLatest(filteredRecipes$, chunkSize$).pipe(
        map(([recipes, size]) => this.chunk(recipes, size)),
    );
  }

  chunk<T>(arr: Array<T>, chunkSize: number) {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) =>
      arr.slice(i * chunkSize, i * chunkSize + chunkSize));
  }

  ngOnInit() {
  }

  addNewRecipe() {
    const dialogRef = this.dialog.open(ManualEntryComponent);
  }

  hashRecipeIds(index, item: DisplayRecipe[]) {
    return ":".concat(...item.map(i => `${i.id}:`));
  }

  toggle() {
    this.sidenav.toggle();
  }
}

export interface SideNavConfig {
  open: boolean;
  mode: string;
  top: number;
  searchShownByDefault: boolean;
}