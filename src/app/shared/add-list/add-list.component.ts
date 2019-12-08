import { Component, OnInit, Inject } from '@angular/core';
import { ShoppingListFacade } from 'src/app/core-data/state/shopping-list/shopping-list.facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  saveListForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddListComponent>,
    private readonly listFacade: ShoppingListFacade,
    private readonly formBuilder: FormBuilder) {
    this.saveListForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  createList() {
    const listName = this.saveListForm.value.name;
    this.listFacade.createNewList(listName)
    this.dialogRef.close();
  }

}
