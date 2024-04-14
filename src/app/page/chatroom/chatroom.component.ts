import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { account } from '@lib/appwrite';
import { GetNamePipe } from '@pipes/get-name.pipe';
import { GetPhotoPipe } from '@pipes/get-photo.pipe';
import { MessagingService } from '@services/messaging.service';
import { User_R, UsersService } from '@services/users.service';
import { Message, MessageOperation } from 'app/interfaces/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css',
  providers: [MessagingService, UsersService],
  imports: [FormsModule, GetNamePipe, GetPhotoPipe, CommonModule]
})

export class ChatroomComponent implements OnDestroy {
  messages: Message[] = [];
  message: string = '';

  messageService = inject(MessagingService);
  usersService = inject(UsersService);

  user_id: string | undefined;
  users: User_R[] = [];

  usersloaded!: Promise<boolean>;

  listeningMessage!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.initializeUserData();
    this.loadMessages();
    this.listenForMessages();
  }

  ngOnDestroy(): void {
    this.listeningMessage.unsubscribe();
  }


  async initializeUserData(): Promise<void> {
    this.usersloaded = new Promise(async resolve => {
      const user = await account.get();
      this.user_id = user.$id;

      const userData = await this.usersService.getUsers();
      this.users.push(...userData);
      resolve(true);
    })
  }

  async loadMessages(): Promise<void> {
    this.messages = await this.messageService.LoadMessages();
  }

  listenForMessages(): void {
    this.listeningMessage = this.messageService.Listen().subscribe(data => {
      if (data.operation === MessageOperation.Deleted) {
        this.messages = this.messages.filter(message =>
          !(message.id === data.id &&
            message.message === data.message &&
            message.sentby === data.sentby)
        );
      } else {
        this.messages.push(data);
      }
    });
  }

  send(message: string): void {
    this.messageService.SendMessage(message);
  }

  delete(id: string): void {
    this.messageService.DeleteMessage(id);
  }
}
