import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from 'src/app/core-data/state/user/user.facade';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  readonly resetForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userFacade: UserFacade,
    private readonly dialogRef: MatDialogRef<ResetPasswordComponent>
    ) {
      this.resetForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      });
     }

  ngOnInit() {
  }

  reset() {
    this.userFacade.resetPassword(this.resetForm.value.email);
    this.dialogRef.close();
  }

}
