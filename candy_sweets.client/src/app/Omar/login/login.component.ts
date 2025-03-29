import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailInput: string = '';
  passwordInput: string = '';
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(private user_api: CustomerLoginRegistrationService, private _route: Router) { }

  ngOnInit() { }

  // Validate Email on Input
  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.emailInput) {
      this.emailError = 'Email is required.';
      return false;
    } else if (!emailRegex.test(this.emailInput)) {
      this.emailError = 'Please enter a valid email address.';
      return false;
    } else {
      this.emailError = null;
      return true;
    }
  }

  // Validate Password on Input
  validatePassword(): boolean {
    if (!this.passwordInput) {
      this.passwordError = 'Password is required.';
      return false;
    } else if (this.passwordInput.length < 8) {
      this.passwordError = 'Password must be at least 8 characters long.';
      return false;
    } else {
      this.passwordError = null;
      return true;
    }
  }

  // Login Function
  getData() {
    // Validate inputs before calling API
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please correct the errors before logging in.',
        confirmButtonColor: '#FF69B4'
      });
      return;
    }

    // Fetch user data from API
    this.user_api.Get_User_Login().subscribe({
      next: (data) => {
        let user = data.find((p: any) => p.email === this.emailInput && p.password === this.passwordInput);

        if (user) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!',
            confirmButtonColor: '#FF69B4'
          }).then(() => {
            this.user_api.login(user.ID, user.name);
            this._route.navigate(['/']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Login',
            text: 'Invalid Email or Password. Please try again.',
            confirmButtonColor: '#FF69B4'
          });
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Something went wrong. Please try again later.',
          confirmButtonColor: '#FF69B4'
        });
      }
    });
  }

  // Navigate to Forgot Password Page
  forgotPassword(): void {
    this._route.navigate(['/Home/Forget']);
  }
}

