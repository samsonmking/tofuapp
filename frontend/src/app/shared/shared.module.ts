import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddListComponent } from './add-list/add-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AddListComponent],
  entryComponents: [
    AddListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
