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

  forgotPassword() {
    this._route.navigate(['/Home/Forget']);
  }
}
