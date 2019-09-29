import { Component, OnInit } from '@angular/core';
import { ShoppingListFacade } from 'src/app/core-data/state/shopping-list/shopping-list.facade';
import { Observable } from 'rxjs';
import { ShoppingList } from 'src/app/core-data/models/shopping-list/shopping-list';

@Component({
  selector: 'app-default-shopping-list',
  templateUrl: './default-shopping-list.component.html',
  styleUrls: ['./default-shopping-list.component.css']
})
export class DefaultShoppingListComponent implements OnInit {
  $list;

  constructor(private readonly shoppingListFacade: ShoppingListFacade) { }

  ngOnInit() {
    this.$list = this.shoppingListFacade.defaultShoppingList$;
    this.$list.subscribe(console.log);
  }

}
