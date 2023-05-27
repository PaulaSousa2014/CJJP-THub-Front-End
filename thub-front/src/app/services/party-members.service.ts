import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// API auth location
const POST_API = "https://t-hub.up.railway.app/api/party_members";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class PartyMembersService {

  // Http client
  constructor(private httpClient: HttpClient) { }

  //Get parties by user_id
  getMyParties(id: number): Observable<any> {
    return this.httpClient.get(POST_API+"/"+id, httpOptions);
  }

}
