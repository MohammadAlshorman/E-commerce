import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nameInput: string = '';
  genderInput: string = 'I prefer not to say';
  emailInput: string = '';
  phoneInput: string = '';
  addressInput: string = '';
  passwordInput: string = '';

  nameError: string | null = null;
  genderError: string | null = null;
  emailError: string | null = null;
  phoneError: string | null = null;
  addressError: string | null = null;
  passwordError: string | null = null;

  //store all user for checking i this email exits beofre this time or not
  allUsers: any[] = [];
  constructor(private user_api: CustomerLoginRegistrationService, private _route: Router) { }

  ngOnInit() {
    this.loadAllUsers();
  }
  // Fetch all users from the API and store them in an array
  loadAllUsers(): void {
    this.user_api.Get_User_Login().subscribe(
      (users) => {
        this.allUsers = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  validateName(): void {
    this.nameError = this.nameInput.trim() ? null : 'Name is required.';
  }

  validateGender(): void {
    this.genderError = this.genderInput ? null : 'Gender is required.';
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !this.emailInput
      ? 'Email is required.'
      : !emailRegex.test(this.emailInput)
        ? 'Please enter a valid email address.'
        : null;
  }

  validatePhone(): void {
    const phoneRegex = /^07[0-9]{8}$/;
    this.phoneError = !this.phoneInput
      ? 'Phone number is required.'
      : !phoneRegex.test(this.phoneInput)
        ? 'Phone number must be 10 digits and start with "07".'
        : null;
  }

  validateAddress(): void {
    this.addressError = this.addressInput.includes(',')
      ? null
      : 'Address must include both City and Governorate.';
  }

  validatePassword(): void {
    this.passwordError = !this.passwordInput
      ? 'Password is required.'
      : this.passwordInput.length < 8
        ? 'Password must be at least 8 characters long.'
        : null;
  }

 

  formHasErrors(): boolean {
    return (
      this.nameError ||
      this.genderError ||
      this.emailError ||
      this.phoneError ||
      this.addressError ||
      this.passwordError

    ) !== null;
  }

  adduser(form: any): void {
    this.validateName();
    this.validateGender();
    this.validateEmail();
    this.validatePhone();
    this.validateAddress();
    this.validatePassword();

    if (this.formHasErrors()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please correct the errors before submitting.',
        confirmButtonColor: '#FF69B4'
      });      return;
    }

    // Check if the email already exists
    const emailExists = this.allUsers.some(user => user.email === this.emailInput);

    if (emailExists) {
      alert('This email is already registered. Please use a different email.');
      return; // Stop registration
    }


    const newUser = {
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
      address: this.addressInput,
      phone: this.phoneInput,
      image: 'https://k.top4top.io/p_3382wl2bp1.png',
      Gender: this.genderInput,
      BirthDate: 'waiting',
      paymentMethods: 'waiting',
      role: 'user',
      OrganizationName:'waiting'
    };

    this.user_api.Post_User_Register(newUser).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registered successfully',
        html: `User <span style="color: #f195b2;">${this.nameInput}</span> registered successfully!`,
        confirmButtonColor: '#FF69B4',

      });
      this._route.navigate(['/Home/Login']);
    });
  }
}
