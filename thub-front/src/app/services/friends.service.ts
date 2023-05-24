import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// API friends location
const USER_API = "https://t-hub.up.railway.app/api/friends"
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private httpClient: HttpClient) { }

  getFriends() {
    return this.httpClient.get(USER_API, httpOptions);
  }

}
