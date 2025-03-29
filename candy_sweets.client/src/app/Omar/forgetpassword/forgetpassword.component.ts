import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  standalone: false,
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: string = '';
  randomCode: string = ''; 
  emailVerified: boolean = false; 
  user: any;

  constructor(private user_api: CustomerLoginRegistrationService, private router: Router) { }

  verifyEmail() {
    this.user_api.Get_User_Login().subscribe((data) => {
      this.user = data.find((u: any) => u.email === this.email);

      if (this.user) {
        this.randomCode = this.generateRandomCode(); 

       
        console.log('Generated Code (Simulated):', this.randomCode);
        Swal.fire({
          icon: 'success',
          title: 'Email Verified',
          text: 'A verification code has been sent to your email.',
          confirmButtonColor: '#FF69B4'
        });

        this.emailVerified = true; 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Email does not exist in the system.',
          confirmButtonColor: '#FF69B4'
        });
      }
    });
  }

  generateRandomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }


  submitCode(inputCode: string) {
    if (inputCode === this.randomCode) {
      Swal.fire({
        icon: 'success',
        title: 'Code Verified Successfully',
        text: 'You can now reset your password.',
        confirmButtonColor: '#FF69B4'
      }).then(() => {
        sessionStorage.setItem('verifiedEmail', this.email);
        this.router.navigate(['/Home/LastStep']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Code',
        text: 'Please try again.',
        confirmButtonColor: '#FF69B4'
      });
    }
  }
}
