import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { account } from '@lib/appwrite';
import { AuthenticationService } from '@services/authentication.service';
import { MessagingService } from '@services/messaging.service';
import { Message, MessageOperation } from 'app/interfaces/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css',
  providers: [MessagingService]
})

export class ChatroomComponent implements OnDestroy {
  messages: Message[] = [];
  message: string = '';

  message_service = inject(MessagingService);

  user_id: string | undefined;
  listening_message: Subscription;

  constructor() {
    this.message_service.LoadMessages().then((data) => {
      this.messages = data;
    })

    account.get().then(user => {
      this.user_id = user.$id;
    });

    this.listening_message = this.message_service.Listen().subscribe(data => {
      if (data.operation == MessageOperation.Deleted) {
        this.messages = this.messages.filter(message =>
          !(message.id === data.id &&
            message.message === data.message &&
            message.sentby === data.sentby)
        );
      } else {
        this.messages.push(data);
      }
    })
  }

  ngOnDestroy(): void {
    this.listening_message.unsubscribe();
  }

  send(message: string): void {
    this.message_service.SendMessage(message);
  }

  delete(id: string): void {
    this.message_service.DeleteMessage(id);
  }
}
