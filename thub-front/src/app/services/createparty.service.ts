import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from '../models/CreatePartyModels';


// API auth location
const POST_API = "https://t-hub.up.railway.app/api/parties";
const GET_API = "https://t-hub.up.railway.app/api/games";
const GET_API_act = "https://t-hub.up.railway.app/api/activities";

const API_SOCIAL = "https://t-hub.up.railway.app/api/socials";

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
  // Get all games
  getGames(): Observable<any> {
    return this.httpClient.get(GET_API, httpOptions);
  }

   // Get all activities
   getActivities(): Observable<any> {
    return this.httpClient.get(GET_API_act, httpOptions);
  }

   // Get all Social
   getSocial(): Observable<any> {
    return this.httpClient.get(API_SOCIAL, httpOptions);
  }

}