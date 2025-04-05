import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';  // تأكد من أن Router و NavigationEnd مستوردين بشكل صحيح
import { filter } from 'rxjs';  // تأكد من استيراد filter من rxjs

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']  // تأكد من أن styleUrl هو styleUrls
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  showFooter: boolean = true;  // افتراضيًا إظهار الفوتر

  constructor(private http: HttpClient, private router: Router) { }  // حقن Router في الـ constructor

  ngOnInit(): void {
    // اشتراك في أحداث التوجيه
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // التأكد من أنه حدث NavigationEnd
    ).subscribe((event: NavigationEnd) => {
      // يمكنك تحديد منطق إخفاء الفوتر بناءً على المسار
      if (event.urlAfterRedirects === '/Home/Profile' || event.urlAfterRedirects === '/Home/EditProfile' || event.urlAfterRedirects === '/Home/Reset' || event.urlAfterRedirects === '/Home/User_History' || event.urlAfterRedirects ==='/admin-dashboard')
      {
        this.showFooter = false;  // إخفاء الفوتر في صفحة تعديل الملف الشخصي
      } else {
        this.showFooter = true;   // إظهار الفوتر في باقي الصفحات
      }
    });

    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'candy_sweets.client';
}
