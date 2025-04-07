import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbdService {

  constructor(private url: HttpClient) { }

  getCategory() {
    return this.url.get('https://67d293ba90e0670699be2925.mockapi.io/Categories')
  }
  addCategory(data: any) {
    return this.url.post('https://67d293ba90e0670699be2925.mockapi.io/Categories', data)
  }
  editCategory(id: any, data: any) {
    return this.url.put(`https://67d293ba90e0670699be2925.mockapi.io/Categories/${id}`, data)
  }
  deleteCategory(id: any) {
    return this.url.delete(`https://67d293ba90e0670699be2925.mockapi.io/Categories/${id}`)
  }
  getUsers() {
    return this.url.get('https://67d293ba90e0670699be2925.mockapi.io/user')
  }
  deleteUser(id: any) {
    return this.url.delete(`https://67d293ba90e0670699be2925.mockapi.io/user/${id}`)
  }

  updateUser(id: any, data: any) {
    return this.url.put(`https://67d293ba90e0670699be2925.mockapi.io/user/${id}`, data);
  }





}
