import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@ot-demo/libs/services/auth';

@Component({
  selector: 'lib-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  passwordMismatch = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const {
        confirmPassword,
        ...signupData
      }: { confirmPassword: string; username: string; password: string } =
        this.signupForm.value;

      if (signupData.password === confirmPassword) {
        this.passwordMismatch = false;

        this.authService.signup(signupData).subscribe(
          (response) => {
            console.log('Signup successful', response);
            // Optionally navigate to login or dashboard
          },
          (error) => {
            this.errorMessage = 'Signup failed. Please try again.';
            console.error(error);
          }
        );
      } else {
        this.passwordMismatch = true;
        this.errorMessage = 'Passwords do not match';
      }
    }
  }
}
