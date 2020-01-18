import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { ListSelectionComponent } from './list-selection/list-selection.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { RenameListComponent } from './rename-list/rename-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListsComponent,
    ListSelectionComponent,
    ListDetailComponent,
    RenameListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    RenameListComponent
  ]
})
export class ListsModule { }
