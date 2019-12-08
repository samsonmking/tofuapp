import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from 'src/app/core-data/state/user/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly userFacade: UserFacade) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.userFacade.login(username, password);
  }
}
