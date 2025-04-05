declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-google',
  standalone: false,
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '859107006069-05aammgn90k6eh8hrnnsvenpiepr74ph.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLogin(resp);
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',  // اللون الأزرق المملوء
      size: 'large',         // حجم الزر
      shape: 'rectangular',  // شكل الزر
      width: 387,            // عرض الزر
      text: 'signin_with',   // النص داخل الزر
      logo_alignment: 'left' // محاذاة الشعار
    });
  }

  private decodeToken(token : string) {

    return JSON.parse(atob(token.split('.')[1]));

  }

  handleLogin(response: any) {
    if (response) { 
      //decode the token
      const payLoad = this.decodeToken(response.credential);

      //store in session
      sessionStorage.setItem('LoggedInUser', JSON.stringify(payLoad));

      //navigate to home/browse

      //  this.router.navigate(['/']);
      this.router.navigate(['/admin-dashboard']);
    }
  }
}
