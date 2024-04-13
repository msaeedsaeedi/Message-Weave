import { Injectable } from '@angular/core';
import { account, BUCKET_ID_PROFILE_PHOTOS, COLLECTION_ID_USERS, DATABASE_ID, databases, ID, storage } from '@lib/appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public async Login(email: string, password: string): Promise<boolean> {
    try {
      if (await this.IsLoggedIn())
        this.Logout();
      await account.createEmailSession(email, password);
      return true;
    }
    catch {
      return false;
    }
  }

  public async Register(name: string, email: string, password: string, photo: File): Promise<boolean> {
    try {
      const id = (await account.create(ID.unique(), email, password, name)).$id;

      if (await this.Login(email, password)) {
        const image_id = (await storage.createFile(BUCKET_ID_PROFILE_PHOTOS, ID.unique(), photo)).$id;

        await databases.createDocument(DATABASE_ID, COLLECTION_ID_USERS, ID.unique(), {
          user_id: id,
          Username: name,
          Photo: image_id
        });
        return true;
      }
      console.log("Login Failed");
      return false;
    } catch (error) {
      return false;
    }
  }

  public async Logout(): Promise<boolean> {
    try {
      await account.deleteSession('current');
      return true;
    }
    catch {
      return false;
    }
  }

  public async IsLoggedIn(): Promise<boolean> {
    try {
      await account.get();
      return true;
    } catch (error) {
      return false;
    }

  }

}
