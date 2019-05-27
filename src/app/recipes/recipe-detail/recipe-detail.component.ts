import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetailDialogComponent } from '../recipe-detail-dialog/recipe-detail-dialog.component';
import { map, filter, take } from 'rxjs/operators';

@Component({
  template: ''
})
export class RecipeDetailComponent {
  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
    this.route.params
      .pipe(map(params => params.id))
      .subscribe(id => this.openDialog(id));
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(RecipeDetailDialogComponent, { data: { recipeId: id } });
    dialogRef.afterClosed().subscribe(_ => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
