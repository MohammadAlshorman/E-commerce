import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailInput: string = ''; // Two-way binding for the email field
  passwordInput: string = ''; // Two-way binding for the password field
  emailError: string | null = null; // Holds the email error message
  passwordError: string | null = null; // Holds the password error message

  constructor(private user_api: CustomerLoginRegistrationService, private _route: Router) { }

  ngOnInit() { }

  // Custom email validation
  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email format
    if (!this.emailInput) {
      this.emailError = 'Email is required.';
    } else if (!emailRegex.test(this.emailInput)) {
      this.emailError = 'Please enter a valid email address.';
    } else {
      this.emailError = null; // Clear error if valid
    }
  }

  // Custom password validation
  validatePassword(): void {
    if (!this.passwordInput) {
      this.passwordError = 'Password is required.';
    } else if (this.passwordInput.length < 8) {
      this.passwordError = 'Password must be at least 8 characters long.';
    } else {
      this.passwordError = null; // Clear error if valid
    }
  }

  // Form submission logic
  getData(enteredUser: any): void {
    // Perform final validation before submitting
    this.validateEmail();
    this.validatePassword();

    // Only proceed if there are no validation errors
    if (this.emailError || this.passwordError) {
      alert('Please correct the errors before submitting the form.');
      return;
    }

    this.user_api.Get_User_Login().subscribe((data) => {
      console.log('API Response:', data);
      let user = data.find(
        (p: any) =>
          p.email === enteredUser.email && p.password === enteredUser.password
      );
      console.log('API Response:', user);
      if (user) {
        alert('Login successfully');
        this.user_api.setUserId(user.ID); // Save the logged-in user's ID
        this._route.navigate(['/Home/Profile']);
      } else {
        alert('Invalid Email or Password');
      }
    });
  }

  // Navigate to the Forgot Password page
  forgotPassword(): void {
    this._route.navigate(['/Home/Forget']);
  }
}
