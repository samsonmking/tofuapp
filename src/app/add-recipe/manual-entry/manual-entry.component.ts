import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManualEntryFacade } from 'src/app/core-data/state/manual-entry/manual-entry.facade';
import { MatDialogRef } from '@angular/material';

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
    private entryFacade: ManualEntryFacade) {
  }

  ngOnInit() {
    this.entryFacade.recipeCreated$.subscribe(id => {
      if (id) {
        this.newRecipeForm.reset();
      }
    });
  }

  onRecipeSubmit() {
    this.entryFacade.submitRecipe(this.newRecipeForm.value);
  }

}
