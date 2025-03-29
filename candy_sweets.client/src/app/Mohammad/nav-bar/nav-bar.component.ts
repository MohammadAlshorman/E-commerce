import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';
import { Router } from '@angular/router';
import { SuleimanserviceService } from '../../Suleiman/suleimanservice.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  userName: string | null = null;
  cartItemCount: number = 0
  constructor(
    private authService: CustomerLoginRegistrationService,
    private router: Router,
    private ser: SuleimanserviceService
  ) { }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

    });

    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });




    this.ser.cartCount$.subscribe(count => {
      this.cartItemCount = count;

    })
     
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/Home/Login']);
  }

  }


