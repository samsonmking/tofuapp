import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AddRecipeModule } from './add-recipe/add-recipe.module';
import { RecipesComponent } from './recipes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeThumbComponent } from './recipe-thumb/recipe-thumb.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeDetailDialogComponent } from './recipe-detail-dialog/recipe-detail-dialog.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeThumbComponent,
    RecipeDetailComponent,
    RecipeDetailDialogComponent
  ],
  entryComponents: [
    RecipeDetailDialogComponent
  ],
  exports: [
    RecipesComponent,
    RecipeDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AddRecipeModule,
    FlexLayoutModule,
    AppRoutingModule
  ]
})
export class RecipesModule { }
