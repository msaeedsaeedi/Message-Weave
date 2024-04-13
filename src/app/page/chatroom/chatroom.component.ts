import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import client from '@lib/appwrite';
import { MessagingService } from '@services/messaging.service';
import { Message } from 'app/interfaces/message';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})

export class ChatroomComponent implements OnInit {
  messages: Message[] = [];
  message: string = '';

  message_service = inject(MessagingService);

  ngOnInit(): void {
    this.message_service.LoadMessages().then((data) => {
      this.messages = data;
    })
  }

  send(message: string): void {
    console.log(message);
    this.message_service.SendMessage(message);
  }
}
