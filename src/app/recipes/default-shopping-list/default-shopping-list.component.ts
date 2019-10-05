import { Component, OnInit } from '@angular/core';
import { ShoppingListItemFacade } from 'src/app/core-data/state/shopping-list-item/shopping-list-items.facade';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/core-data/models/recipe/recipe';

@Component({
  selector: 'app-default-shopping-list',
  templateUrl: './default-shopping-list.component.html',
  styleUrls: ['./default-shopping-list.component.css']
})
export class DefaultShoppingListComponent implements OnInit {
  public recipesInList$: Observable<Recipe[]>;

  constructor(private readonly itemFacade: ShoppingListItemFacade) { }

  ngOnInit() {
    this.recipesInList$ = this.itemFacade.recipesInCurrentList$;
  }

}
