import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagingService } from '@services/messaging.service';
import { Message } from 'app/interfaces/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})

export class ChatroomComponent implements OnDestroy {
  messages: Message[] = [];
  message: string = '';

  message_service = inject(MessagingService);
  listening_message: Subscription;

  constructor() {
    this.message_service.LoadMessages().then((data) => {
      this.messages = data;
    })

    this.listening_message = this.message_service.Listen().subscribe(data => {
      this.messages.push(data);
    })
  }

  ngOnDestroy(): void {
    this.listening_message.unsubscribe();
  }

  send(message: string): void {
    console.log(message);
    this.message_service.SendMessage(message);
  }
}
