import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  message: string,
  sentby: string
}

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})

export class ChatroomComponent implements OnInit {
  messages: Message[] = [
    {
      message: "Hi",
      sentby: 'Sana Tariq'
    },
    {
      message: "Hello",
      sentby: 'Mohammad Saeed'
    }
  ];

  message: string = '';

  ngOnInit(): void {

  }

  send(message: string): void {
    console.log(message);

  }
}
