import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuleimanserviceService {

  constructor(private http: HttpClient) { }

  getProductbyid(id: any) {
    return this.http.get<any>(`https://67e35b6497fc65f53539606a.mockapi.io/products/${id}`);
  }

  getAllProduct() {
    return this.http.get<any[]>(`https://67e35b6497fc65f53539606a.mockapi.io/products`);
  }

  getRatingsForproduct() {
    return this.http.get<any[]>('https://67e44f4e2ae442db76d3ee5f.mockapi.io/rating');
  }

  addRatingForproduct(data: any) {
    return this.http.post<any>('https://67e44f4e2ae442db76d3ee5f.mockapi.io/rating', data);
  }

  addItemsToCart(data: any) {
    return this.http.post<any>('https://67e320ca97fc65f53538d273.mockapi.io/Glace/CartItem', data);
  }

  AllCartItems() {
    return this.http.get<any[]>('https://67e320ca97fc65f53538d273.mockapi.io/Glace/CartItem');
  }

  deleteItemFromCart(id: any) {
    return this.http.delete<any>(`https://67e320ca97fc65f53538d273.mockapi.io/Glace/CartItem/${id}`);
  }

  getAllCategory() {
    return this.http.get<any[]>('https://67d293ba90e0670699be2925.mockapi.io/Categories');
  }

  getAllVouchers() {
    return this.http.get<any[]>('https://67e44f4e2ae442db76d3ee5f.mockapi.io/voucher');
  }

  cartCount = new BehaviorSubject<number>(0); // متغير يمكن ملاحظته لحفظ عدد المنتجات

  cartCount$ = this.cartCount.asObservable(); // جعل المتغير قابل للاشتراك

  carttotalprice = new BehaviorSubject<number>(0);

  carttotalprice$ = this.carttotalprice.asObservable();
}
