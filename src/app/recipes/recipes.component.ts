import { Component, OnInit } from '@angular/core';
import { RecipeFacade } from '../core-data/state/recipies/recipes.facade';
import { Observable } from 'rxjs';
import { DisplayRecipe } from '../core-data/models/recipe/display-recipe';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ManualEntryComponent } from '../add-recipe/manual-entry/manual-entry.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<DisplayRecipe[]>;

  constructor(private fascade: RecipeFacade,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.recipes$ = this.fascade.recipes$;
    this.fascade.getAllRecipes();
  }

  addNewRecipe() {
    const dialogRef = this.dialog.open(ManualEntryComponent);
  }
}
