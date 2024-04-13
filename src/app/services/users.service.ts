import { Injectable } from '@angular/core';
import { COLLECTION_ID_USERS, DATABASE_ID, databases } from '@lib/appwrite';
import { Query } from 'appwrite';

export interface User_R {
  user_id: string,
  Username: string,
  Photo: URL
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public async getUsers(): Promise<User_R[]> {
    const ret = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_USERS, [Query.select(["user_id", "Username", "Photo"])]);
    return ret.documents.map<User_R>(doc => ({
      user_id: doc['user_id'],
      Username: doc['Username'],
      Photo: <URL>doc["Photo"]
    }));
  }
}
