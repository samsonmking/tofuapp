import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserFacade } from 'src/app/core-data/state/user/user.facade';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog } from '@angular/material';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly loginForm: FormGroup;
  readonly usernameControl: AbstractControl;
  readonly passwordControl: AbstractControl;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userFacade: UserFacade,
    private readonly ref: ChangeDetectorRef,
    private readonly matDialog: MatDialog
    ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.usernameControl = this.loginForm.controls['username'];
    this.passwordControl = this.loginForm.controls['password'];
   }

  ngOnInit() {
    this.userFacade.usernameFailed$
      .pipe(untilDestroyed(this))  
      .subscribe(_ => {
        this.usernameControl.setErrors({ invalid: true });
        this.ref.markForCheck();
      });

    this.userFacade.passwordFailed$
      .pipe(untilDestroyed(this)) 
      .subscribe(_ => {
        this.passwordControl.setErrors({ invalid: true });
        this.ref.markForCheck();
      });
  }

  ngOnDestroy(): void {
    // Clean-up handled by untilDestroyed
  }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.userFacade.login(username, password);
  }

  resetPassword() {
    this.matDialog.open(ResetPasswordComponent, { width: '400px' });
  }
}
