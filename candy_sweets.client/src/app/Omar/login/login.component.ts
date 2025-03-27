import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private user_api: CustomerLoginRegistrationService, private _route: Router) { }
  ngOnInit() { }

  getData(enteredUser: any) {
    //debugger
    this.user_api.Get_User_Login().subscribe((data) => {
      console.log('API Response:', data);
      let user = data.find((p: any) => p.email == enteredUser.email && p.password == enteredUser.password);
      console.log('API Response:', user);
      if (user) {
        alert("login successfully")
        // Save the logged-in user's ID in the BehaviorSubject
        this.user_api.setUserId(user.ID);
        this._route.navigate(['/Home/Profile'])
      } else {
        alert("Invalid Email or password ")

      }

    })
  }

  forgotPassword() {
    this._route.navigate(['/Home/Forget']);
  }
}
