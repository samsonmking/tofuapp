import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AddRecipeModule } from './add-recipe/add-recipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDataModule } from './core-data/core-data.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeThumbComponent } from './recipe-thumb/recipe-thumb.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeThumbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    AddRecipeModule,
    CoreDataModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
