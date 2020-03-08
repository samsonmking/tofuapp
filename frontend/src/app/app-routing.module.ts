import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ListsComponent } from './lists/lists.component';
import { ListDetailComponent } from './lists/list-detail/list-detail.component';
import { LoggedInGuard } from './auth/logged-in-guard';
import { LoginComponent } from './auth/login/login.component';
import { NotLoggedInGuard } from './auth/not-logged-in-guard';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'recipes',
    canActivate: [LoggedInGuard],
    component: RecipesComponent,
    children: [
      { path: ':id', component: RecipeDetailComponent }
    ]
  },
  {
    path: 'lists',
    canActivate: [LoggedInGuard],
    component: ListsComponent,
    children: [
      { path: ':id', component: ListDetailComponent }
    ]
  },
  {
    path: 'login',
    component: LandingPageComponent,
    canActivate: [NotLoggedInGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
