import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  standalone: false,
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  user: any;

  constructor(private user_api: CustomerLoginRegistrationService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the currently logged-in user's data via BehaviorSubject
    this.user_api.userId$.subscribe((userId) => {
      if (userId) {
        this.user_api.Get_User_Login().subscribe((data) => {
          this.user = data.find((u: any) => u.ID === userId);
        });
      } else {
        alert('No user is logged in!');
        this.router.navigate(['/Home/Login']); // Redirect to login if no user is logged in
      }
    });
  }

  changePassword(): void {
    if (this.oldPassword !== this.user.password) {
      alert('Old Password is incorrect.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      alert('New Password and Confirm Password do not match.');
      return;
    }

    // Update the user's password
    this.user.password = this.newPassword;
    this.user_api.Update_User(this.user.ID, this.user).subscribe(() => {
      alert('Password changed successfully!');
      this.router.navigate(['/Home/Profile']); // Redirect to the Profile page
    }, (error) => {
      console.error('Error changing password:', error);
      alert('There was an issue changing your password. Please try again.');
    });
  }
}
