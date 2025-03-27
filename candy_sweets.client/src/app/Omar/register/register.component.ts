import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private user_api: CustomerLoginRegistrationService) { }

  ngOnInit() { }

  adduser(data: any) {
    debugger
    const newUser = {
      name : data.name, // Spread operator to include all form data
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
      image: data.image,
      paymentMethods: 'waiting', // Default payment method
      role: 'user' // Default role
    };

    this.user_api.Post_User_Register(newUser).subscribe(() => {
      alert("added")

    })
  }
}
