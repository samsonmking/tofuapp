import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState } from '../core-data/state/user/user.reducer';
import { UserFacade } from '../core-data/state/user/user.facade';
import { ShoppingListFacade } from '../core-data/state/shopping-list/shopping-list.facade';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../core-data/state';
import { Actions } from '@ngrx/effects';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title = 'tofu';
  user$: Observable<UserState>;
  selectedList$: Observable<string>;
  listSelected$: Observable<boolean>;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly listFacade: ShoppingListFacade,
    private readonly route: Router,
    private readonly store: Store<AppState>,
    private readonly actions$: Actions
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.user$;

    this.selectedList$ = this.listFacade.currentList$.pipe(
      map(list => list ? `lists/${list.id}` : `lists`));

    this.listSelected$ = this.route.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((end: NavigationEnd) => end.url.includes('/lists'))
    );
  }

  logout() {
    this.userFacade.logout();
  }
}
