import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { RecipeFacade } from '../core-data/state/recipe/recipes.facade';
import { Observable, combineLatest } from 'rxjs';
import { DisplayRecipe } from '../core-data/models/recipe/display-recipe';
import { MatDialog } from '@angular/material';
import { ManualEntryComponent } from './add-recipe/manual-entry/manual-entry.component';
import { map, filter, mergeAll, distinctUntilChanged } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<DisplayRecipe[][]>;
  recipesPerRow = 4;

  constructor(private fascade: RecipeFacade,
    private dialog: MatDialog,
    private readonly mediaObserver: MediaObserver) {
    const chunkSize$ = this.mediaObserver.asObservable().pipe(
      mergeAll(),
      map(mq => mq.mqAlias),
      filter(alias => alias.length === 2),
      map(alias => {
        switch(alias) {
          case 'xs':
          case 'sm':
            return 1;
          case 'md':
            return 2;
          default:
            return 4;
        }
      }),
      distinctUntilChanged()
    );

    this.recipes$ = combineLatest(this.fascade.recipes$, chunkSize$).pipe(
      map(([recipes, size]) => this.chunk(recipes, size))
    )
  }

  ngOnInit() {
  }

  chunk<T>(arr: Array<T>, chunkSize: number) {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) =>
      arr.slice(i * chunkSize, i * chunkSize + chunkSize));
  }

  private flat<T>(arr: Array<Array<T>>) {
    return arr.reduce((acc, curr) => [...acc, ...curr], []);
  }

  addNewRecipe() {
    const dialogRef = this.dialog.open(ManualEntryComponent);
  }

  hashRecipeIds(index, item: DisplayRecipe[]) {
    return ":".concat(...item.map(i => `${i.id}:`));
  }
}
