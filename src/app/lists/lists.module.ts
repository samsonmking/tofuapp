import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { ListSelectionComponent } from './list-selection/list-selection.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ListsComponent, ListSelectionComponent, ListDetailComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
  ]
})
export class ListsModule { }
