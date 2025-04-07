import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone:false,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  users: any[] = [];
  combinedData: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: CustomerLoginRegistrationService) { }

  ngOnInit(): void {
    this.loadOrdersAndUsers();
  }

  loadOrdersAndUsers() {
    const ordersApi = 'https://67d760e89d5e3a10152ab1ca.mockapi.io/v1/Odrer';
    const usersApi = 'https://67d293ba90e0670699be2925.mockapi.io/user';

    Promise.all([
      this.http.get<any[]>(ordersApi).toPromise(),
      this.http.get<any[]>(usersApi).toPromise()
    ])
      .then(([orders, users]) => {
        this.orders = orders!;
        this.users = users!;


        // دمج البيانات حسب userID
        this.combinedData = this.orders.map(order => {
          const user = this.users.find(u => u.ID == order.userID);
          return {
            ...order,
            userName: user ? user.name : 'Unknown',
            userEmail: user ? user.email : 'N/A'
          };
        });
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }


  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from the dashboard!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Logged Out Successfully!',
          text: 'You have been logged out.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }
}
