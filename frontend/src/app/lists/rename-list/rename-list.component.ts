import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShoppingListFacade } from 'src/app/core-data/state/shopping-list/shopping-list.facade';
import { ShoppingList } from 'src/app/core-data/models/shopping-list/shopping-list';

@Component({
  selector: 'app-rename-list',
  templateUrl: './rename-list.component.html',
  styleUrls: ['./rename-list.component.css']
})
export class RenameListComponent implements OnInit {
  renameListForm: FormGroup;
  private readonly list: ShoppingList;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<RenameListComponent>,
    private readonly listFacade: ShoppingListFacade) {
    this.list = this.data.list as ShoppingList;
    this.renameListForm = this.formBuilder.group({
      name: [this.list.name, Validators.required]
    });
  }

  ngOnInit() {
  }

  renameList() {
    const newName = this.renameListForm.value.name;
    this.listFacade.updateShoppingList({ ...this.list, name: newName });
    this.dialogRef.close();
  }

}
