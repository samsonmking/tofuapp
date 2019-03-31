import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualEntryComponent } from './manual-entry/manual-entry.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManualEntryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ManualEntryComponent
  ]
})
export class AddRecipeModule { }
