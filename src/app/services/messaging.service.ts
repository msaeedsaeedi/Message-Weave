import client, { account, DATABASE_ID, databases, ID, COLLECTION_ID_MESSAGES } from '@lib/appwrite';
import { Message, OMessage, MessageOperation } from 'app/interfaces/message';
import { Observable } from 'rxjs';

export class MessagingService {

  public async SendMessage(message: string): Promise<boolean> {
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
        Message: message,
        Sentby: (await account.get()).$id
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async DeleteMessage(id: string): Promise<boolean> {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
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
        sentby: item['Sentby'],
        id: item['$id']
      }
    });
  }

  public Listen(): Observable<OMessage> {
    return new Observable(observer => {
      client.subscribe<any>(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, data => {
        if (data.events.includes('databases.*.collections.*.documents.*.create')) {
          observer.next({
            id: data.payload['$id'],
            message: data.payload.Message,
            sentby: data.payload.Sentby,
            operation: MessageOperation.Sent
          });
        } else if (data.events.includes('databases.*.collections.*.documents.*.delete')) {
          observer.next({
            id: data.payload['$id'],
            message: data.payload.Message,
            sentby: data.payload.Sentby,
            operation: MessageOperation.Deleted
          });
        }

      });
    });
  }
}
