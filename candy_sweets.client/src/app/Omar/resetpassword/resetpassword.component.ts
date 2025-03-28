import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'error',
          title: 'No User Logged In',
          text: 'No user is logged in. Redirecting to login page.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['/Home/Login']);
        });
      }
    });
  }

  changePassword(): void {
    if (this.oldPassword !== this.user.password) {
      Swal.fire({
        icon: 'error',
        title: 'Incorrect Password',
        text: 'Old Password is incorrect.',
        confirmButtonColor: '#FF69B4'
      });
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New Password and Confirm Password do not match.',
        confirmButtonColor: '#FF69B4'
      });
      return;
    }

    // Update the user's password
    this.user.password = this.newPassword;
    this.user_api.Update_User(this.user.ID, this.user).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Password Changed Successfully!',
        text: 'Your password has been updated successfully.',
        confirmButtonColor: '#FF69B4'
      }).then(() => {
        this.router.navigate(['/Home/Profile']);
      });
    }, (error) => {
      console.error('Error changing password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue changing your password. Please try again.',
        confirmButtonColor: '#FF69B4'
      });
    });
  }

  goBackToProfile() {
    this.router.navigate(['/Home/Profile']);
  }
}
