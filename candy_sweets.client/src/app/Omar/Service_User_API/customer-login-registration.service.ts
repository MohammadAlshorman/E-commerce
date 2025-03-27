import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginRegistrationService {
  // BehaviorSubject to hold the user's ID
  private userIdSubject = new BehaviorSubject<string | null>(null);

  // Observable for other components to subscribe to
  userId$ = this.userIdSubject.asObservable();

  // Method to set the logged-in user's ID
  setUserId(id: any) {
    console.log('this the id:',id);
    this.userIdSubject.next(id);
    console.log('userIdSubject:', this.userIdSubject);
  }
  // Method to clear the user ID (e.g., on logout)
  clearUserId() {
    this.userIdSubject.next(null);
  }
  Update_User(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.User_API_URL}/${id}`, data); // Use PUT for updates
  }
  constructor(private http: HttpClient) { }
  User_API_URL = 'https://67d293ba90e0670699be2925.mockapi.io/user';
  Get_User_Login():Observable<any> {
    return this.http.get<any>(this.User_API_URL);
  }
  Post_User_Register(data: any): Observable<any> {
    return this.http.post<any>(this.User_API_URL,data);
  }

}
