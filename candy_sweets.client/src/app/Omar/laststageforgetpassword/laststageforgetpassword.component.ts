import { Component, OnInit } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.email = sessionStorage.getItem('verifiedEmail') || '';

    if (!this.email) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized Access',
        text: 'You need to verify your email first.',
        confirmButtonColor: '#FF69B4'
      }).then(() => {
        this.router.navigate(['/Home/ForgetPassword']);
      });
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please try again.',
        confirmButtonColor: '#FF69B4'
      });
      return;
    }

    this.user_api.Get_User_Login().subscribe((data) => {
      const user = data.find((u: any) => u.email === this.email);

      if (user) {
        user.password = this.newPassword; 

        this.user_api.Update_User(user.ID, user).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Password Reset Successfully',
            text: 'You can now login with your new password.',
            confirmButtonColor: '#FF69B4'
          }).then(() => {
            sessionStorage.removeItem('verifiedEmail'); 
            this.router.navigate(['/Home/Login']);
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User not found.',
          confirmButtonColor: '#FF69B4'
        });
      }
    });
  }
}
