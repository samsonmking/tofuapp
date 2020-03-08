import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState } from '../core-data/state/user/user.reducer';
import { UserFacade } from '../core-data/state/user/user.facade';
import { ShoppingListFacade } from '../core-data/state/shopping-list/shopping-list.facade';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { getRouteUrl, RoutePaths } from '../shared/routes';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  title = 'tofu';
  user$: Observable<UserState>;
  selectedList$: Observable<string>;
  listSelected$: Observable<boolean>;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly listFacade: ShoppingListFacade,
    private readonly route: Router
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.user$;

    this.selectedList$ = this.listFacade.currentList$.pipe(
      map(list => list ? `${RoutePaths.Lists}/${list.id}` : `lists`));

    this.listSelected$ = this.route.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((end: NavigationEnd) => end.url.includes(getRouteUrl(RoutePaths.Lists)))
    );
  }

  logout() {
    this.userFacade.logout();
  }
}
