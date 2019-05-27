import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AddRecipeModule } from './add-recipe/add-recipe.module';
import { RecipesComponent } from './recipes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeThumbComponent } from './recipe-thumb/recipe-thumb.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeThumbComponent
  ],
  exports: [
    RecipesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AddRecipeModule,
    FlexLayoutModule
  ]
})
export class RecipesModule { }
