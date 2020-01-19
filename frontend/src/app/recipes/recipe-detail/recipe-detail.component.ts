import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetailDialogComponent } from '../recipe-detail-dialog/recipe-detail-dialog.component';
import { map } from 'rxjs/operators';
import { RecipeFacade } from 'src/app/core-data/state/recipe/recipes.facade';

@Component({
  template: ''
})
export class RecipeDetailComponent {
  private dialogRef: MatDialogRef<RecipeDetailDialogComponent>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private recipeFacade: RecipeFacade) {
    this.route.params
      .pipe(map(params => params.id))
      .subscribe(id => this.openDialog(Number.parseInt(id)));
  }

  openDialog(id: number) {

    const deleteRecipe = () => {
      this.recipeFacade.deleteRecipe(id);
      if(this.dialogRef) {
        this.dialogRef.close();
      }
    }

    this.dialogRef = this.dialog.open(RecipeDetailDialogComponent, 
      { data: 
        { 
          recipeId: id,
          onDelete: deleteRecipe
        },
        width: "500px"
    });

    this.dialogRef.afterClosed().subscribe(_ => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
