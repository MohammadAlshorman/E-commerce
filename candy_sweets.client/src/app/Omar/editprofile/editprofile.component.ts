import { Component, OnInit } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editprofile',
  standalone: false,
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit  {
  user: any = {}; // Object to hold user data
  userId: any | null = null; // Logged-in user's ID

  constructor(
    private user_api: CustomerLoginRegistrationService,
    private router: Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to BehaviorSubject to get the logged-in user's ID
    this.user_api.userId$.subscribe((userId) => {
      if (userId) {
        this.userId = userId; // Save the user ID
        // Fetch user details from the API
        this.user_api.Get_User_Login().subscribe((data) => {
          this.user = data.find((u: any) => u.ID === userId);
        });
      } else {
        alert('No user is logged in!');
        this.router.navigate(['login']); // Redirect to login if no user is logged in
      }
    });
  }

  // Method to update user details
  updateProfile() {
    if (this.userId) {
      this.user_api.Update_User(this.userId, this.user).subscribe(() => {
        alert('Profile updated successfully!');
        this.router.navigate(['profile']); // Redirect to profile page
      }, (error) => {
        console.error('Error updating profile:', error);
        alert('There was an issue updating your profile. Please try again.');
      });
    }
  }
  resetPassword() {
    this.router.navigate(['/Home/Reset']);
  }
}
