import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserFacade } from 'src/app/core-data/state/user/user.facade';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RegisterError } from 'src/app/core-data/state/user/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  readonly registerForm: FormGroup;
  readonly emailControl: AbstractControl;
  readonly passwordControl: AbstractControl;
  readonly confirmPasswordControl: AbstractControl;
  emailError: string;
  passwordError: string;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly userFacade: UserFacade,
    private readonly ref: ChangeDetectorRef) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        (control: AbstractControl) => (this.passwordControl && control.value !== this.passwordControl.value) ? { invalid: true } : null
      ])]
    });
    this.emailControl = this.registerForm.controls['email'];
    this.passwordControl = this.registerForm.controls['password'];
    this.confirmPasswordControl = this.registerForm.controls['confirmPassword'];
  }

  ngOnInit() {
    this.userFacade.registerFailed$
      .pipe(untilDestroyed(this))
      .subscribe(e => {
        switch(e.error) {
          case RegisterError.ErrorType.EmailInUse:
            this.emailControl.setErrors({ invalid: true });
            this.emailError = "Email already in use";
            break;
          case RegisterError.ErrorType.InvalidEmail:
            this.emailControl.setErrors({ invalid: true });
            this.emailError = "Invalid email";
            break;
          case RegisterError.ErrorType.WeakPassword:
            this.passwordControl.setErrors({ invalid: true });
            this.passwordError = "Password too weak";
            break;
          default:
            break;
        }
        this.ref.markForCheck();
      })
  }

  ngOnDestroy(): void {
   // Clean-up handled by untilDestroy
  }

  register() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.userFacade.register(email, password);
  }

}
