import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from '../models/CreatePartyModels';


// API auth location
const POST_API = "https://t-hub.up.railway.app/api/parties";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: 'root'
})
export class CreatepartyService {

  constructor(private httpClient: HttpClient) { }

   // Create new post
   postNewParty(newParty: Party): Observable<any> {
    return this.httpClient.post(POST_API, newParty, httpOptions);
  }
}
