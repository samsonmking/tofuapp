import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import * as urlRegex from 'url-regex'
import { Observable, Subscription } from 'rxjs';
import { map, merge } from 'rxjs/operators';
@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent implements OnInit, OnDestroy {
  private createdHandle: Subscription;
  readonly errors$: Observable<string[]>;

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

      this.errors$ = this.recipeFacade.recipeCreationErrors$.pipe(
        map(errorAction => errorAction.payload),
        merge(this.recipeFacade.recipeCreated$.pipe(
          map(_=> [])
        ))
      );
  }

  ngOnInit() {
    this.createdHandle = this.recipeFacade.recipeCreated$.subscribe(id => {
      if (id) {
        this.newRecipeForm.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.createdHandle.unsubscribe();
  }

  onRecipeSubmit() {
    this.recipeFacade.submitRecipe(this.newRecipeForm.value);
  }

}
