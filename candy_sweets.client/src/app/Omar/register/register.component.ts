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
    // Get the value of the confirm password field
    const confirmPasswordInput = document.querySelector(
      'input[placeholder="Confirm your password"]'
    ) as HTMLInputElement;

    // Ensure password matches the confirm password
    if (data.password !== confirmPasswordInput.value) {
      alert('Passwords do not match. Please re-enter your passwords.');
      return; // Stop form submission
    }

    const newUser = {
      name : data.name, // Spread operator to include all form data
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
      image: 'https://th.bing.com/th/id/OIP.iTB9Mey53IOcod1S0kIqkQHaEn?w=250&h=180&c=7&r=0&o=5&pid=1.7',
      Gender: data.Gender,
      BirthDate: 'waiting',  
      paymentMethods: 'waiting', // Default payment method
      role: 'user' // Default role
    };

    this.user_api.Post_User_Register(newUser).subscribe(() => {
      alert('User registered successfully!');
    })
  }
}
