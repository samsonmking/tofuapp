import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualEntryComponent } from './add-recipe/manual-entry/manual-entry.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipe/entry', component: ManualEntryComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
