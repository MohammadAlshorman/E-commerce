import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private ser: SuleimanserviceService) { }

  ngOnInit() {
    this.getallitemproduct()
    this.getAllVouchers()

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

  getTotalPrice(): number {
    let total = this.cartData.reduce((total: number, item: { Price: number; quantity: number; }) => {
      return total + (item.Price * item.quantity);
    }, 0);

    return total - this.discountValue; // تطبيق الخصم على المجموع النهائي
  }

  //getProductName(productId: number) {
  //  const product = this.productdata.find((pro: any) => pro.id == productId);
  //  return product ? product.name : 'Unknown Category';
  //}


}
