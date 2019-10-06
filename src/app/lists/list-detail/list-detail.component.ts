import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  constructor(
    private readonly listItemsFacade: ShoppingListItemFacade,
    private readonly route: ActivatedRoute) {
      const listId$ = this.route.params.pipe(map(params => params.id));
    }

  ngOnInit() {
  }

}
