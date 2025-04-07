import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginRegistrationService {
  User_API_URL = 'https://67d293ba90e0670699be2925.mockapi.io/user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  // ✅ إضافة BehaviorSubject لدور المستخدم
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(loggedIn);

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userIdSubject.next(userId);
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
      this.userNameSubject.next(userName);
    }

    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      this.userRoleSubject.next(userRole);
    }
  }

  // ✅ دوال أساسية للتعامل مع الدور
  setUserRole(role: string): void {
    this.userRoleSubject.next(role);
    localStorage.setItem('userRole', role);
  }

  clearUserRole(): void {
    this.userRoleSubject.next(null);
    localStorage.removeItem('userRole');
  }

  Post_User_Register(data: any): Observable<any> {
    return this.http.post<any>(this.User_API_URL, data);
  }

  Get_User_Login(): Observable<any> {
    return this.http.get<any>(this.User_API_URL);
  }

  Update_User(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.User_API_URL}/${id}`, data);
  }

  Get_Histroy(): Observable<any> {
    return this.http.get<any>("https://67d760e89d5e3a10152ab1ca.mockapi.io/v1/Odrer");
  }

  // ✅ دالة تسجيل الدخول، الآن تستخرج الدور من الـ API
  login(userId: string, userName: string): void {
    this.isLoggedInSubject.next(true);
    this.setUserId(userId);
    this.setUserName(userName);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);

    // ✅ جلب الدور من الـ API وتخزينه
    this.Get_User_Login().subscribe(users => {
      const currentUser = users.find((u: any) => u.ID === userId);
      if (currentUser?.role) {
        this.setUserRole(currentUser.role);
      }
    });
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.clearUserId();
    this.clearUserName();
    this.clearUserRole();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
      localStorage.removeItem('userRole');


      // 🧹 حذف البيانات من التخزين
      localStorage.clear();         // 🔥 يحذف كل البيانات
      sessionStorage.clear();

      console.log('✅ localStorage cleared from service');
  }

  setUserId(id: any): void {
    this.userIdSubject.next(id);
  }

  setUserName(name: string): void {
    this.userNameSubject.next(name);
  }

  clearUserId(): void {
    this.userIdSubject.next(null);
  }

  clearUserName(): void {
    this.userNameSubject.next(null);
  }
}
