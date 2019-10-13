import { Component, OnInit } from '@angular/core';
import { ShoppingListFacade } from 'src/app/core-data/state/shopping-list/shopping-list.facade';
import { Observable } from 'rxjs';
import { ShoppingList } from 'src/app/core-data/models/shopping-list/shopping-list';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.css']
})
export class ListSelectionComponent implements OnInit {
  lists$: Observable<ShoppingList[]>;
  defaultListId$: Observable<number>;

  constructor(private readonly listFacade: ShoppingListFacade) { }

  ngOnInit() {
    this.lists$ = this.listFacade.lists$;
    this.listFacade.getAllShoppingLists();
    this.defaultListId$ = this.listFacade.currentListId$;
  }
  
  deleteList(id: number) {
    this.listFacade.deleteShoppingList(id);
  }

}
