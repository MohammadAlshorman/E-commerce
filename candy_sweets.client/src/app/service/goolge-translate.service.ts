import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoolgeTranslateService {

  constructor() { }

  loadGoogleTranslateScript() {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
  }
}
