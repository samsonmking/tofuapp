import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { Observable } from 'rxjs';
import { DisplayListItem } from 'src/app/core-data/models/shopping-list-item/display-list-item';
import { ListSortService } from './list-sort-service';
import { MatSelectionListChange, MatSelectChange} from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  sortedItems$: Observable<DisplayListItem[]>;
  selectedSort$: Observable<string>;

  constructor(private readonly listSortService: ListSortService,
    private readonly listItemsFacade: ShoppingListItemFacade) {
    this.sortedItems$ = this.listSortService.sortedItems$
    this.selectedSort$ = this.listSortService.sort$.pipe(
      map(value => value.active)
    )
  }

  ngOnInit() {
  }

  itemChecked(id: number, isChecked: boolean) {
    this.listItemsFacade.checkListItem(id, isChecked);
  }

  selectionChanged(event: MatSelectionListChange) {
    this.listItemsFacade.checkListItem(event.option.value.itemId, event.option.selected);
  }

  setSort(event: MatSelectChange) {
    this.listSortService.sort$.next({ active: event.value, direction: 'desc' });
  }
}

