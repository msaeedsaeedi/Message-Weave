import { Injectable } from '@angular/core';
import { account, ID } from '@lib/appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public async Login(email: string, password: string): Promise<boolean> {
    try {
      this.Logout();
      await account.createEmailSession(email, password);
      return true;
    }
    catch {
      return false;
    }
  }

  public async Register(name: string, email: string, password: string): Promise<boolean> {
    try {
      await account.create(ID.unique(), email, password, name);
      if (await this.Login(email, password)) {
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
