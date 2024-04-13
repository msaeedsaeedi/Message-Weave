import { Injectable } from '@angular/core';
import client, { account, DATABASE_ID, databases, ID, COLLECTION_ID_MESSAGES } from '@lib/appwrite';
import { Message } from 'app/interfaces/message';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public async SendMessage(message: string): Promise<boolean> {
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), { Message: message, Sentby: (await account.get()).name });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async LoadMessages(): Promise<Message[]> {
    const data = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES);
    return data.documents.map(item => {
      return {
        message: item['Message'],
        sentby: item['Sentby']
      }
    });
  }

  public Listen(): Observable<Message> {
    return new Observable(observer => {
      client.subscribe<any>(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, data => {
        observer.next({ message: data.payload.Message, sentby: data.payload.Sentby });
      });
    });
  }
}
