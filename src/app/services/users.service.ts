import { Injectable } from '@angular/core';
import { BUCKET_ID_PROFILE_PHOTOS, COLLECTION_ID_USERS, DATABASE_ID, databases, storage } from '@lib/appwrite';
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
      Photo: this.getPhoto(doc['Photo'])
    }));
  }

  private getPhoto(id: string): URL {
    return storage.getFileView(BUCKET_ID_PROFILE_PHOTOS, id);
  }
}
