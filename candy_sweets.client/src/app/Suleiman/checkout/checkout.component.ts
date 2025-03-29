import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private ser: SuleimanserviceService, private _active: ActivatedRoute, private route: Router) { }
  priceafterdiscount: number = 0;
  ngOnInit() {
    this.getallitemfromcart()
    this.ser.carttotalprice$.subscribe((p: number) => {
      this.priceafterdiscount = p
      //alert(p)
      //alert(this.priceafterdiscount)
    })
  }

  productdata: any
  getAlllProduct() {
    this.ser.getAllProduct().subscribe((data => {
      this.productdata = data
    }))
  }

  cartitems: any
  getallitemfromcart() {
    this.ser.AllCartItems().subscribe((data) => {
      this.cartitems = data
      
    })
  }

  getProductName(productId: number) {
    this.ser.getAllProduct()
    const product = this.productdata.find((pro: any) => pro.id == productId);
    return product.name;

  }

  placeOrder() {
    Swal.fire("Your order has been submitted!");
    this.deleteAllCartItems();
  }

  deleteAllCartItems() {
    this.ser.AllCartItems().subscribe((cartItems: any) => {
      if (!cartItems || cartItems.length === 0) {
        this.route.navigate(['/']); // إذا لم يكن هناك عناصر، انتقل مباشرة
        return;
      }

      // إنشاء مصفوفة من طلبات الحذف
      const deleteRequests = cartItems.map((item: any) =>
        this.ser.deleteItemFromCart(item.id)
      );

      // تنفيذ جميع طلبات الحذف بشكل متوازي
      forkJoin(deleteRequests).subscribe({
        next: () => {
          this.route.navigate(['/']); // الانتقال بعد حذف جميع العناصر
        },
        error: (err) => {
          console.error('Error deleting cart items:', err);
          // يمكنك إضافة تعامل مع الأخطاء هنا
          this.route.navigate(['/']);
        }
      });
    });
  }
}
