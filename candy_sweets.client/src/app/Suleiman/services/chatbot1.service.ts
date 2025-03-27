import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://api.deepai.org/api/text-generator';
  private apiKey = '7833f6eb-e9b5-494f-bcd0-44301f5c4211'; // 🔹 ضع مفتاح API الخاص بك هنا

  constructor(private http: HttpClient) { }

  getResponse(userMessage: string): Observable<any> {
    const headers = new HttpHeaders({
      'Api-Key': this.apiKey
    });

    return this.http.post<any>(this.apiUrl, { text: userMessage }, { headers });
  }
}
