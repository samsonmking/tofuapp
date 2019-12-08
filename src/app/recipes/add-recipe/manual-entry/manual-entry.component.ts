import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import * as urlRegex from 'url-regex'
@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent implements OnInit {
  newRecipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    url: ['',  Validators.compose([Validators.required, Validators.pattern(urlRegex())])],
    imageUrl: ['', Validators.compose([Validators.required, Validators.pattern(urlRegex())])],
    ingredients: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<ManualEntryComponent>,
    private readonly recipeFacade: RecipeFacade,
    private readonly formBuilder: FormBuilder) {
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
