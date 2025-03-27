import { Component } from '@angular/core';
import { ChatbotService } from '../services/chatbot1.service';

@Component({
  selector: 'app-chatbot',
  standalone: false,  // ⛔️ احذف هذا السطر أو اجعله `false`
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: { text: string, sender: string }[] = [];
  userMessage: string = '';

  constructor(private chatbotService: ChatbotService) { }

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.messages.push({ text: this.userMessage, sender: 'user' });

      this.chatbotService.getResponse(this.userMessage).subscribe(response => {
        this.messages.push({ text: response.output, sender: 'bot' });
      });

      this.userMessage = '';
    }
  }
}
