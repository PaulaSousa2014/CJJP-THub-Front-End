import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // Function to log out
  signOut(): void {
    window.sessionStorage.clear();
  }

  // Function to save token to session storage
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  // Function to get token from session storage
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // Function to save user info to session storage
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Function to get user from session storage
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) {
      return JSON.parse(user);
    }

    return {};
  }

}
