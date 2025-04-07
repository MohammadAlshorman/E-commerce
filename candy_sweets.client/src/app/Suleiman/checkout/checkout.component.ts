import { Component, OnInit } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  priceafterdiscount: number = 0;
  cartitems: any[] = [];
  productdata: any;

  userInfo: any = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  constructor(
    private ser: SuleimanserviceService,
    private _active: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.getallitemfromcart();
    this.getAlllProduct();
    this.getUserInfo(); // ⬅️ تحميل بيانات المستخدم

    this.ser.carttotalprice$.subscribe((p: number) => {
      this.priceafterdiscount = p;
    });
  }

  getUserInfo() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.ser.getUserById(userId).subscribe((user: any) => {
        this.userInfo = {
          name: user.name || '',
          email: user.email || '',
          address: user.address || '',
          phone: user.phone || ''
        };
      });

    }
  }

  getAlllProduct() {
    this.ser.getAllProduct().subscribe((data => {
      this.productdata = data;
    }));
  }

  getallitemfromcart() {
    this.ser.AllCartItems().subscribe((data) => {
      this.cartitems = data;
    });
  }

  getProductName(productId: number) {
    const product = this.productdata?.find((pro: any) => pro.id == productId);
    return product ? product.name : 'Unknown';
  }

  placeOrder() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to place an order.'
      });
      return;
    }

    if (!this.cartitems || this.cartitems.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Cart is Empty',
        text: 'No items found in your cart.'
      });
      return;
    }

    const paymentMethod = 'Credit Card'; // يمكنك تغييره لاحقاً

    const orderRequests = this.cartitems.map((item: any) => {
      const order = {
        userID: userId,
        paymentMethod: paymentMethod,
        totalAmount: item.Price * item.quantity,
        createAt: new Date().toISOString(),
        ProductID: item.productId
      };
      return this.ser.addOrder(order);
    });

    forkJoin(orderRequests).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your order has been placed successfully.'
        }).then(() => {
          this.deleteAllCartItems();
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: 'Something went wrong while placing your order.'
        });
      }
    });
  }

  deleteAllCartItems() {
    this.ser.AllCartItems().subscribe((cartItems: any[]) => {
      const deleteRequests = cartItems.map((item: any) =>
        this.ser.deleteItemFromCart(item.id)
      );

      forkJoin(deleteRequests).subscribe({
        next: () => {
          this.route.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting cart items:', err);
          this.route.navigate(['/']);
        }
      });
    });
  }
}
