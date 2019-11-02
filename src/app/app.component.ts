import { Component, OnInit } from '@angular/core';
import { UserFacade } from './core-data/state/user/user.facade';
import { Observable } from 'rxjs';
import { UserState } from './core-data/state/user/user.reducer';
import { ShoppingListFacade } from './core-data/state/shopping-list/shopping-list.facade';
import { AppState } from './core-data/state';
import { Store, select } from '@ngrx/store';
import { RecipeFacade } from './core-data/state/recipe/recipes.facade';
import { map, filter } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';
import { Router, NavigationEnd } from '@angular/router';
import { LoadUserRequest } from './core-data/state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
    private readonly actions$: Actions
    ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUserRequest());

    this.store.subscribe(console.log);
    this.actions$.subscribe(console.log);
  }
}
