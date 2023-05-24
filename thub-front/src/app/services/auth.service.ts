import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// API auth location
const AUTH_API = "https://t-hub.up.railway.app/auth/"

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  // Login function
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + "signin", {
      username,
      password
    }, httpOptions);
  }

  // Register function
  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + "signup", {
      username,
      email,
      password
    }, httpOptions);
  }



}
