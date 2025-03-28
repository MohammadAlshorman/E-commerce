import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
//  constructor(private user_api: CustomerLoginRegistrationService, private _route: Router) { }
//  ngOnInit() { }

//  getData(enteredUser: any) {
//    //debugger
//    this.user_api.Get_User_Login().subscribe((data) => {
//      console.log('API Response:', data);
//      let user = data.find((p: any) => p.email == enteredUser.email && p.password == enteredUser.password);
//      console.log('API Response:', user);
//      if (user) {
//        alert("login successfully")
//        // Save the logged-in user's ID in the BehaviorSubject
//        this.user_api.setUserId(user.ID);
//        this._route.navigate(['/Home/Profile'])
//      } else {
//        alert("Invalid Email or password ")

//      }

//    })
//  }

//  forgotPassword() {
//    this._route.navigate(['/Home/Forget']);
//  }
//}

  emailInput: string = ''; // Two-way binding for the email field
  passwordInput: string = ''; // Two-way binding for the password field
  emailError: string | null = null; // Holds the email error message
  passwordError: string | null = null; // Holds the password error message

  constructor(private user_api: CustomerLoginRegistrationService, private _route: Router) { }

  ngOnInit() { }

  getData(enteredUser: any) {
    if (!enteredUser.email || !enteredUser.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill in both Email and Password.',
        confirmButtonColor: '#FF69B4'
      });
      return; 
    }

    this.user_api.Get_User_Login().subscribe((data) => {
      let user = data.find((p: any) => p.email == enteredUser.email && p.password == enteredUser.password);

      if (user) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.user_api.login(user.ID, user.name);
          this._route.navigate(['/']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Login',
          text: 'Invalid Email or Password. Please try again.',
          confirmButtonColor: '#FF69B4'
        });
      }
    });
  }

  // Navigate to the Forgot Password page
  forgotPassword(): void {
    this._route.navigate(['/Home/Forget']);
  }
}
