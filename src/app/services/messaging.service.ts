import { Injectable } from '@angular/core';
import client, { account, DATABASE_ID, databases, ID, MESSAGES_COLLECTION_ID } from '@lib/appwrite';
import { Message } from 'app/interfaces/message';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public async SendMessage(message: string): Promise<boolean> {
    try {
      await databases.createDocument(DATABASE_ID, MESSAGES_COLLECTION_ID, ID.unique(), { Message: message, Sentby: (await account.get()).name });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async LoadMessages(): Promise<Message[]> {
    const data = await databases.listDocuments(DATABASE_ID, MESSAGES_COLLECTION_ID);
    return data.documents.map(item => {
      return {
        message: item['Message'],
        sentby: item['Sentby']
      }
    });
  }
}
