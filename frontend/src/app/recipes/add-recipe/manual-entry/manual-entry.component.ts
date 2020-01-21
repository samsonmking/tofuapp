import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';
import { Observable } from 'rxjs';
import { map, merge } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent implements OnInit, OnDestroy {
  private readonly urlRegex: RegExp = /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/;

  @ViewChild('entryFrom') entryForm;
  readonly errors$: Observable<string[]>;
  
  newRecipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    url: ['', Validators.compose([Validators.required, Validators.pattern(this.urlRegex)])],
    imageUrl: ['', Validators.compose([Validators.required, Validators.pattern(this.urlRegex)])],
    ingredients: ['', Validators.required]
  });

  constructor(
    private readonly recipeFacade: RecipeFacade,
    private readonly formBuilder: FormBuilder,
    private readonly snackbar: MatSnackBar) {

    this.errors$ = this.recipeFacade.recipeCreationErrors$.pipe(
      map(errorAction => errorAction.payload),
      merge(this.recipeFacade.recipeCreated$.pipe(
        map(_ => null)
      ))
    );
  }

  ngOnInit() {
    this.recipeFacade.recipeCreated$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.entryForm.resetForm();
        this.snackbar.open('Recipe Added', null, { duration: 5000 });
      });

    this.recipeFacade.recipeCreationErrors$
      .pipe(untilDestroyed(this))
      .subscribe(_ => {
        this.newRecipeForm.controls['ingredients'].setErrors({ 'invalid': true });
        this.snackbar.open('Errors Occured While Trying To Add Recipe', null, { duration: 5000 });
      });
  }

  ngOnDestroy(): void {
    // Clean-up handled by untilDestroyed
  }

  onRecipeSubmit() {
    this.recipeFacade.submitRecipe(this.newRecipeForm.value);
  }

}
