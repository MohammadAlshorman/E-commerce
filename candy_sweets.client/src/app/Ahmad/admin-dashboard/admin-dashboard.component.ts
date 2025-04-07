import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalSales: number = 0;
  totalUsers: number = 0;
  totalOrders: number = 0;
  totalCategories: number = 0;
  totalProducts: number = 0;

  salesData: any[] = [];
  usersData: any[] = [];
  ordersData: any[] = [];
  categoriesData: any[] = [];
  productsData: any[] = [];

  constructor(private dashboardService: DashboardService, private router: Router, private authService: CustomerLoginRegistrationService) { }

  ngOnInit() {
    this.loadSalesData();
    this.loadUsersData();
    this.loadOrdersData();
    this.loadCategoriesData();
    this.loadProductsData();
  }

  loadSalesData() {
    this.dashboardService.getSalesData().subscribe(
      data => {
        this.salesData = data;

        // نستخدم totalAmount بدلاً من amount + نحوله لرقم
        this.totalSales = this.salesData.reduce((sum, sale) => {
          const amount = parseFloat(sale.totalAmount); // تأكد من تحويله لرقم
          return sum + (isNaN(amount) ? 0 : amount); // تجنب NaN
        }, 0);
      },
      error => this.showAlert('Error loading sales data!', 'error')
    );
  }

  loadUsersData() {
    this.dashboardService.getUsersData().subscribe(
      data => {
        this.usersData = data;
        this.totalUsers = this.usersData.length;
      },
    //  error => this.showAlert('Error loading users data!', 'error')
    );
  }

  loadOrdersData() {
    this.dashboardService.getOrdersData().subscribe(
      data => {
        this.ordersData = data;
        this.totalOrders = this.ordersData.length;
      },
    //  error => this.showAlert('Error loading orders data!', 'error')
    );
  }

  loadCategoriesData() {
    this.dashboardService.getCategoriesData().subscribe(
      data => {
        this.categoriesData = data;
        this.totalCategories = this.categoriesData.length;
      },
    //  error => this.showAlert('Error loading categories data!', 'error')
    );
  }

  loadProductsData() {
    this.dashboardService.getProductsData().subscribe(
      data => {
        this.productsData = data;
        this.totalProducts = this.productsData.length;
      },
    //  error => this.showAlert('Error loading products data!', 'error')
    );
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

      // 🧹 استدعاء دالة تسجيل الخروج من الخدمة
      this.authService.logout();

      // ✅ عرض تأكيد
      Swal.fire({
        icon: 'success',
        title: 'Logged Out Successfully!',
        text: 'You have been logged out.',
        confirmButtonColor: '#FF69B4'
      }).then(() => {
        // 🔁 إعادة التوجيه + تحديث الصفحة لضمان تفريغ كل شيء
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          location.reload();
        });
      });
    }
  });
}


  showAlert(message: string, type: string) {
    Swal.fire({
      icon: type === 'success' ? 'success' : 'error',
      title: type === 'success' ? 'Success' : 'Error',
      text: message,
      confirmButtonColor: '#FF69B4'
    });
  }
}
