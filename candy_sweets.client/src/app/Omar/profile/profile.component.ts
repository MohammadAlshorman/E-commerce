import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;

  constructor(private user_api: CustomerLoginRegistrationService,private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject to get the user's ID
    this.user_api.userId$.subscribe((userId) => {
      if (userId) {
        // Fetch the user's info based on the ID
        this.user_api.Get_User_Login().subscribe((data) => {
          this.user = data.find((u: any) => u.ID === userId);
        });
      } else {
        //alert('No user is logged in!');
        this.router.navigate(['login']); // Redirect to login if no user is logged in
      }
    });
  }
  logout(): void {
    this.user_api.logout();
    this.router.navigate(['/Home/Login']);
  }
  EditProfile() {
    this.router.navigate(['/Home/EditProfile']);
  }
  resetPassword() {
    this.router.navigate(['/Home/Reset']);
  }
}
