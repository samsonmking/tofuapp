import { Component, OnInit } from '@angular/core';
import { ShoppingListFacade } from 'src/app/core-data/state/shopping-list/shopping-list.facade';
import { Observable } from 'rxjs';
import { ShoppingList } from 'src/app/core-data/models/shopping-list/shopping-list';
import { MatDialog, MatSelectChange } from '@angular/material';
import { AddListComponent } from 'src/app/shared/add-list/add-list.component';
import { RenameListComponent } from '../rename-list/rename-list.component';
import { ListSortService } from '../list-detail/list-sort-service';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.css']
})
export class ListSelectionComponent implements OnInit {
  selectedSort: string;
  lists$: Observable<ShoppingList[]>;
  defaultListId$: Observable<number>;

  constructor(
    private readonly listFacade: ShoppingListFacade,
    private readonly matDialog: MatDialog,
    private readonly sortService: ListSortService) {
      this.selectedSort = this.sortService.sort$.value.active;
     }

  ngOnInit() {
    this.lists$ = this.listFacade.lists$;
    this.listFacade.getAllShoppingLists();
    this.defaultListId$ = this.listFacade.currentListId$;
  }

  deleteList(id: number) {
    this.listFacade.deleteShoppingList(id);
  }

  renameList(list: ShoppingList) {
    this.matDialog.open(RenameListComponent, {
      data: { list },
      width: "400px"
    });
  }

  createNewList(){
    this.matDialog.open(AddListComponent, {
      width: "400px",
    });
  }

  setSort(event: MatSelectChange) {
    this.sortService.sort$.next({ active: event.value, direction: 'desc' });
  }

}
