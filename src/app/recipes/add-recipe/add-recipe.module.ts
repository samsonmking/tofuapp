import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualEntryComponent } from './manual-entry/manual-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ManualEntryComponent],
  entryComponents: [ManualEntryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ManualEntryComponent
  ]
})
export class AddRecipeModule { }
