import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuleimanserviceService {

  constructor(private http: HttpClient) { }



  getProductbyid(id: any) {
    return this.http.get(`https://67e35b6497fc65f53539606a.mockapi.io/products/${id}`)
  }

  getAllProduct() {
    return this.http.get(`https://67e35b6497fc65f53539606a.mockapi.io/products`)
  }

  getRatingsForproduct() {
    return this.http.get('https://67e44f4e2ae442db76d3ee5f.mockapi.io/rating')
  }

  addRatingForproduct(data: any) {
    return this.http.post('https://67e44f4e2ae442db76d3ee5f.mockapi.io/rating' , data)
  }

  addItemsToCart(data: any) {
    return this.http.post('https://67e320ca97fc65f53538d273.mockapi.io/Glace/CartItem' , data)
  }

  getAllCategory() {
    return this.http.get('https://67d293ba90e0670699be2925.mockapi.io/Categories')
  }

}
