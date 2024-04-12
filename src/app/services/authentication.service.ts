import { Injectable } from '@angular/core';
import { account } from '@lib/appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public async Login(email: string, password: string): Promise<boolean> {
    try {
      await account.createEmailSession(email, password);
      sessionStorage.setItem("LoggedIn", "true");
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
    if (sessionStorage.getItem('LoggedIn') == "true")
      return true;
    return false;
  }

}
