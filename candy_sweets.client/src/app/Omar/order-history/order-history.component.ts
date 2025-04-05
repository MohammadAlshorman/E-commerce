import { Component } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  userOrders: any[] = [];

  constructor(private userService: CustomerLoginRegistrationService) { }

  ngOnInit(): void {
    // Subscribe to the stored user ID
    this.userService.userId$.subscribe((id) => {

      if (id) {
        this.userService.Get_Histroy().subscribe((orders) => {
          // Filter orders where userId matches the logged-in user
          this.userOrders = orders.filter((order: any) => order.userID == id);
        });
      }
    });
  }

 
}
