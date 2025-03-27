import { Component, OnInit } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-laststageforgetpassword',
  standalone: false,
  templateUrl: './laststageforgetpassword.component.html',
  styleUrl: './laststageforgetpassword.component.css'
})
export class LaststageforgetpasswordComponent implements OnInit {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private user_api: CustomerLoginRegistrationService, private router: Router) { }

  ngOnInit(): void {
    // Get email passed from the ForgotPasswordComponent
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { email: string };
    this.email = state?.email || '';
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Update the password in the API
    this.user_api.Get_User_Login().subscribe((data) => {
      const user = data.find((u: any) => u.email === this.email);

      if (user) {
        // Update the user's password
        user.password = this.newPassword;

        this.user_api.Update_User(user.ID, user).subscribe(() => {
          alert('Password reset successfully.');
          this.router.navigate(['/Home/Login']); // Redirect to login page
        });
      } else {
        alert('Error: Email not found.');
      }
    });
  }
}
