import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogModule,
  MatListModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatMenuModule,
  MatCheckboxModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    CdkTableModule,
    MatMenuModule,
    ScrollingModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    CdkTableModule,
    MatMenuModule,
    ScrollingModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
