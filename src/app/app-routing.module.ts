import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualEntryComponent } from './add-recipe/manual-entry/manual-entry.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe/entry', pathMatch: 'full' },
  { path: 'recipe/entry', component: ManualEntryComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
