import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



// API auth location
const POST_API = "https://t-hub.up.railway.app/api/friends";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  // Http client
  constructor(private httpClient: HttpClient) { }

  //Get parties by user_id
  getMyFriends(id: number): Observable<any> {
    return this.httpClient.get(POST_API+"/"+id, httpOptions);
  }


}
