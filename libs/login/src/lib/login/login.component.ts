import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Login } from '@ot-demo/libs/services/auth';

@Component({
  selector: 'lib-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly formbuilder: FormBuilder,
    private readonly router: Router
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
        sessionStorage.setItem('authToken', response.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
}
