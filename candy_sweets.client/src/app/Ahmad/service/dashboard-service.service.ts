import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private salesUrl = 'https://67d293ba90e0670699be2925.mockapi.io/Sales';
  private usersUrl = 'https://67d293ba90e0670699be2925.mockapi.io/user';
  private ordersUrl = 'https://67d760e89d5e3a10152ab1ca.mockapi.io/v1/Odrer';
  private categoriesUrl = 'https://67d293ba90e0670699be2925.mockapi.io/Categories';
  private productsUrl = 'https://67e35b6497fc65f53539606a.mockapi.io/products';

  constructor(private http: HttpClient) { }

  getSalesData(): Observable<any[]> {
    return this.http.get<any[]>(this.salesUrl);
  }

  getUsersData(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  getOrdersData(): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl);
  }

  getCategoriesData(): Observable<any[]> {  
    return this.http.get<any[]>(this.categoriesUrl);
  }

  getProductsData(): Observable<any[]> {    
    return this.http.get<any[]>(this.productsUrl);
  }
}
