import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule
  ]
})
export class LandingModule { }
