import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private ser: SuleimanserviceService) { }

  categorylist: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';

  recognition: any;
  isListening: boolean = false;

  ngOnInit() {
    this.getproduct();
    this.setupSpeechRecognition();
  }

  getproduct() {
    this.ser.getAllCategory().subscribe((data) => {
      this.categorylist = data;
      this.filteredCategories = data;
    });
  }

  filterCategories() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCategories = this.categorylist.filter(cat =>
      cat.name.toLowerCase().includes(term)
    );
  }

  setupSpeechRecognition() {
    const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.isListening = true;
      const audio = new Audio('https://notificationsounds.com/storage/sounds/file-sounds-1151-pristine.mp3');
      audio.play();
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      this.searchTerm = transcript; // ✅ عرض النص في حقل البحث
      this.filterCategories();      // ✅ تصفية التصنيفات مباشرة

      Swal.fire({
        title: 'Voice Recognized 🎤',
        text: `You said: "${transcript}"`,
        icon: 'success',
        confirmButtonColor: '#FF69B4'
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
      Swal.fire({
        icon: 'warning',
        title: 'Could not recognize voice!',
        text: 'Please try again clearly.',
        confirmButtonColor: '#FF69B4'
      });
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  startVoiceSearch() {
    if (this.isListening) return;
    this.recognition.start();
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
