import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';
import { Component } from '@angular/core';
import { SuleimanserviceService } from '../../Suleiman/suleimanservice.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;

  constructor(
    private authService: CustomerLoginRegistrationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });
  }
export class NavBarComponent {
  constructor(private ser: SuleimanserviceService) { }
  cartItemCount: number = 0
  ngOnInit() {
    this.ser.cartCount$.subscribe(count => {
      this.cartItemCount = count;
      
    })

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/Home/Login']);
  }
}
  }
}
