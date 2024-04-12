import { Injectable } from '@angular/core';
import { account } from '@lib/appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedInUser: any;

  public async Login(email: string, password: string): Promise<boolean> {
    try {
      await account.createEmailSession(email, password);
      this.loggedInUser = await account.get();
      return true;
    }
    catch {
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

  public IsLoggedIn(): boolean {
    if (this.loggedInUser)
      return true;
    return false;
  }

}
