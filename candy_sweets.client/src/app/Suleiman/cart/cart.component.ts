import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { BehaviorSubject } from 'rxjs';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private ser: SuleimanserviceService, private loginserv: CustomerLoginRegistrationService, private _route: Router) { }

  ngOnInit() {
    this.getallitemproduct()
    this.getAllVouchers()
    this.getAlllProduct()

  }
  cartData: any
  getallitemproduct() {
    this.ser.AllCartItems().subscribe((data) => {
      this.cartData = data
      this.ser.cartCount.next(this.cartData.length)
    })
  }
  productdata: any
  getAlllProduct() {
    this.ser.getAllProduct().subscribe((data => {
      this.productdata = data
    }))
  }

  deleteitemfromcart(id: any) {
    this.ser.deleteItemFromCart(id).subscribe(() => {
      alert('item Removed')
      this.getallitemproduct()
    })
  }
  VoucherData: any
  getAllVouchers() {
    this.ser.getAllVouchers().subscribe((data) => {
      this.VoucherData = data
    })
  }

  discountValue: number = 0; // متغير لتخزين الخصم
  checkforvoucher(voucher: any) {
    this.ser.getAllVouchers().subscribe((data) => {
      this.VoucherData = data
      this.VoucherData = this.VoucherData.filter((p: any) => p.voucher == voucher.vouchername)

      if (this.VoucherData.length > 0) {
        this.discountValue = this.VoucherData[0].discount; // استخراج قيمة الخصم
        console.log("الخصم المطبق:", this.discountValue);
        alert("تم تطبيق الخصم: " + this.discountValue);
      } else {
        this.discountValue = 0; // إعادة التعيين إذا لم يكن هناك خصم
        alert("كود الخصم غير صالح");
      }
    })
  }
  
  getSubPrice(): number {
    return this.cartData.reduce((total: number, item: { Price: number; quantity: number; }) => {
      return total + (item.Price * item.quantity);
    }, 0);
  }
  totalafterdiscount: number = 0;
  getTotalPrice(): number {
    let total = this.cartData.reduce((total: number, item: { Price: number; quantity: number; }) => {
      return total + (item.Price * item.quantity);
    }, 0);
    this.totalafterdiscount = total - this.discountValue;
    this.ser.carttotalprice.next(this.totalafterdiscount)
    return this.totalafterdiscount; // تطبيق الخصم على المجموع النهائي
  }
 

  log: any
  isLogin() {
    this.loginserv.isLoggedIn$.subscribe(d => {
      this.log = d
    })
    if (this.log != 0) {
      this._route.navigate(['/checkout'])
    }
    else {
      this._route.navigate(['/Home/Login'])
    }
  }


  getProductName(productId: number) {
    this.ser.getAllProduct()
    const product = this.productdata.find((pro: any) => pro.id == productId);
    return product.name;
  }


} 
