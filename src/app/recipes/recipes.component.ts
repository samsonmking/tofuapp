import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { RecipeFacade } from '../core-data/state/recipe/recipes.facade';
import { Observable } from 'rxjs';
import { DisplayRecipe } from '../core-data/models/recipe/display-recipe';
import { MatDialog } from '@angular/material';
import { ManualEntryComponent } from './add-recipe/manual-entry/manual-entry.component';
import { map } from 'rxjs/operators';

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
              private dialog: MatDialog) { }

  ngOnInit() {
    this.recipes$ = this.fascade.recipes$.pipe(
      map(recipes => this.chunk(recipes, this.recipesPerRow))
    )
  }

  chunk<T>(arr: Array<T>, chunkSize: number) {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) => 
      arr.slice(i * chunkSize, i * chunkSize + chunkSize));
  }

  addNewRecipe() {
    const dialogRef = this.dialog.open(ManualEntryComponent);
  }

  hashRecipeIds(index, item: DisplayRecipe[]) {
    return ":".concat(...item.map(i => `${i.id}:`));
  }
}
