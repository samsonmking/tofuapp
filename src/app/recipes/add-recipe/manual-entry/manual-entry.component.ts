import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';

@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent implements OnInit {
  newRecipeForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    imageUrl: new FormControl(''),
    ingredients: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<ManualEntryComponent>,
    private readonly recipeFacade: RecipeFacade) {
  }

  ngOnInit() {
    this.recipeFacade.recipeCreated$.subscribe(id => {
      if (id) {
        this.newRecipeForm.reset();
      }
    });
  }

  onRecipeSubmit() {
    this.recipeFacade.submitRecipe(this.newRecipeForm.value);
  }

}
