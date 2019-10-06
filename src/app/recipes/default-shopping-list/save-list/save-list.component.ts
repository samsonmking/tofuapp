import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShoppingList } from 'src/app/core-data/models/shopping-list/shopping-list';
import { ShoppingListFacade } from 'src/app/core-data/state/shopping-list/shopping-list.facade';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.css']
})
export class SaveListComponent implements OnInit {
  saveListForm = new FormGroup({
    name: new FormControl('')
  });
  constructor(
    private readonly listFacade: ShoppingListFacade
  ) { }

  ngOnInit() {
  }

  onSaveList() {

  }

}
