import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  standalone: false,
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: string = '';
  randomCode: string = ''; // Random code for verification
  emailVerified: boolean = false; // To track if email verification is done

  constructor(private user_api: CustomerLoginRegistrationService, private router: Router) { }

  verifyEmail() {
    this.user_api.Get_User_Login().subscribe((data) => {
      const user = data.find((u: any) => u.email === this.email);

      if (user) {
        // Email is valid
        alert('Email verified. A verification code has been sent to your email.');
        this.randomCode = this.generateRandomCode(); // Generate random code
        console.log('Generated Code (Simulated):', this.randomCode); // Simulate sending email
        this.emailVerified = true; // Allow user to proceed to the next step
      } else {
        alert('Email does not exist in the system.');
      }
    });
  }

  generateRandomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
  }

  submitCode(inputCode: string) {
    if (inputCode === this.randomCode) {
      alert('Code verified successfully.');
      this.router.navigate(['/Home/LastStep'], { state: { email: this.email } }); // Navigate to reset password
    } else {
      alert('Invalid code. Please try again.');
    }
  }
}
