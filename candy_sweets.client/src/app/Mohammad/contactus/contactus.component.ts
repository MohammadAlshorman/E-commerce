import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contactus',
  standalone: false,
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  constructor(private http: HttpClient) { }

  onSubmit() {
    const apiUrl = 'https://api.web3forms.com/submit';
    const formPayload = {
      access_key: '3501ed85-b391-48d3-bf74-a98f560d1f44',
      ...this.formData
    };

    this.http.post(apiUrl, formPayload).subscribe({
      next: (res) => {
        console.log('Message sent', res);
        // Hide error and show success message
        document.getElementById('sendmessage')?.style.setProperty('display', 'block');
        document.getElementById('errormessage')?.style.setProperty('display', 'none');
      },
      error: (err) => {
        console.error('Error sending message', err);
        // Hide success message and show error message
        document.getElementById('sendmessage')?.style.setProperty('display', 'none');
        document.getElementById('errormessage')?.style.setProperty('display', 'block');
      }
    });
  }

}
