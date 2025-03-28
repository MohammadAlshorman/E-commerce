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

  constructor(private user_api: CustomerLoginRegistrationService, private router: Router) { }

  ngOnInit() { }

  adduser(data: any) {
    // التحقق من الحقول الفارغة
    if (!data.name || !data.email || !data.password || !data.phone || !data.Gender) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill all the required fields before proceeding.',
        confirmButtonColor: '#FF69B4'
      });
      return;
    }

    // جلب قيمة حقل تأكيد كلمة المرور
    const confirmPasswordInput = document.querySelector(
      'input[placeholder="Confirm your password"]'
    ) as HTMLInputElement;

    // التحقق من مطابقة كلمة المرور مع التأكيد
    if (data.password !== confirmPasswordInput.value) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please re-enter your passwords.',
        confirmButtonColor: '#FF69B4'
      });
      return;
    }

    // تحقق من وجود المستخدم في الـ API
    this.user_api.Get_User_Login().subscribe((users: any[]) => {

      // التحقق من تطابق البريد الإلكتروني أو رقم الهاتف
      const existingUser = users.find(user => user.email === data.email || user.phone === data.phone);

      if (existingUser) {
        // إذا كان المستخدم موجودًا بالفعل
        Swal.fire({
          icon: 'warning',
          title: 'User Already Exists',
          text: 'User with this Email or Phone Number already exists.',
          confirmButtonColor: '#FF69B4'
        });
      } else {
        // إذا لم يكن موجودًا، نقوم بإنشاء مستخدم جديد
        const newUser = {
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          phone: data.phone,
          image: 'https://th.bing.com/th/id/OIP.iTB9Mey53IOcod1S0kIqkQHaEn?w=250&h=180&c=7&r=0&o=5&pid=1.7',
          Gender: data.Gender,
          BirthDate: 'waiting',
          paymentMethods: 'waiting',
          role: 'user'
        };

        this.user_api.Post_User_Register(newUser).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'User registered successfully!',
            confirmButtonColor: '#FF69B4'
          }).then(() => {
            this.router.navigate(['/Home/Login']);
          });
        });
      }
    });
  }
}
