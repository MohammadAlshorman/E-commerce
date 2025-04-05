import { Component, OnInit } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  standalone: false,
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
  user: any = {}; // Object to hold user data
  userId: any | null = null; // Logged-in user's ID
  showFooter: boolean = false;  // المتغير الذي يتحكم في إظهار الفوتر
  constructor(
    private user_api: CustomerLoginRegistrationService,
    private router: Router,
    private _route: ActivatedRoute
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
        Swal.fire({
          icon: 'error',
          title: 'No User Logged In',
          text: 'No user is logged in. Redirecting to login page.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['login']); // Redirect to login if no user is logged in
        });
      }
    });
  }

  // Method to update user details
  updateProfile() {
    if (this.userId) {
      this.user_api.Update_User(this.userId, this.user).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['/Home/Profile']); // Redirect to profile page
        });
      }, (error) => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue updating your profile. Please try again.',
          confirmButtonColor: '#FF69B4'
        });
      });
    }
  }

  resetPassword() {
    this.router.navigate(['/Home/Reset']);
  }

  goBackToProfile() {
    this.router.navigate(['/Home/Profile']);
  }
}
