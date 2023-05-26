import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from '../models/PartyModels';

// API auth location
const POST_API = "https://t-hub.up.railway.app/api/parties";
const POST_API_JOIN = "https://t-hub.up.railway.app/api/party_members";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class PartiesService {

  // Http client
  constructor(private httpClient: HttpClient) { }

  // Get all parties
  getParties(): Observable<any> {
    return this.httpClient.get(POST_API, httpOptions);
  }

  getPartiesId(id: number): Observable<Party> {
    return this.httpClient.get<Party>(POST_API + "/" + id)
      ;
  }


  // Function to delete character
  deleteParty(id: number): Observable<any> {
    return this.httpClient.delete(POST_API + "/" + id);
  }

  // Function to get all parties from user
  getUserPartyList(id: number): Observable<any> {
    return this.httpClient.get(POST_API_JOIN + "/user/" + id);
  }


}
