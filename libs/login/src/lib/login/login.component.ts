import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Login } from '@ot-demo/libs/services/auth';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'lib-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder
  ) {
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: Login = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Logged in successfully!', response);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
}
