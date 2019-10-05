import { Component, OnInit } from '@angular/core';
import { UserFacade } from './core-data/state/user/user.facade';
import { Observable } from 'rxjs';
import { UserState } from './core-data/state/user/user.reducer';
import { ShoppingListFacade } from './core-data/state/shopping-list/shopping-list.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tofu';
  $user: Observable<UserState>;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly listFacade: ShoppingListFacade) {
    
  }

  ngOnInit(): void {
    this.$user = this.userFacade.user$;
    this.userFacade.getUser('sam');

    this.listFacade.getAllShoppingLists();
  }

}
