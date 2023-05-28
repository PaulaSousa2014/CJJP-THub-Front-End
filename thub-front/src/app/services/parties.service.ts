import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from '../models/PartyModels';

// API auth location
const POST_API = 'https://t-hub.up.railway.app/api/parties';
const POST_API_JOIN = 'https://t-hub.up.railway.app/api/party_members';
const POST_API_GAMES = 'https://t-hub.up.railway.app/api/games';
const POST_API_ACT = 'https://t-hub.up.railway.app/api/activities';
const POST_API_SOCIAL = 'https://t-hub.up.railway.app/api/socials';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PartiesService {
  // Http client
  constructor(private httpClient: HttpClient) {}

  // Get all parties
  getParties(): Observable<any> {
    return this.httpClient.get(POST_API, httpOptions);
  }

  //TODO change method name
  //Get party by party_id
  getPartiesId(partyId: number): Observable<Party> {
    return this.httpClient.get<Party>(POST_API + '/' + partyId);
  }

  // Create new party
  postNewParty(newParty: Party): Observable<any> {
    return this.httpClient.post(POST_API, newParty, httpOptions);
  }

  // Get all game parties
  getGames(): Observable<any> {
    return this.httpClient.get(POST_API_GAMES, httpOptions);
  }

  // Get all activity parties
  getActivities(): Observable<any> {
    return this.httpClient.get(POST_API_ACT, httpOptions);
  }

  // Get all Social parties
  getSocial(): Observable<any> {
    return this.httpClient.get(POST_API_SOCIAL, httpOptions);
  }

  // Function to delete party by party_id
  deleteParty(partyId: number): Observable<any> {
    return this.httpClient.delete(POST_API + '/' + partyId);
  }

  //JOIN REQUESTS

  // Function to get all parties from user
  getUserPartyList(userId: number): Observable<any> {
    return this.httpClient.get(POST_API_JOIN + '/user/' + userId);
  }

  //Funcion to get partyMemberList by partyId
  getPartyMembersListByPartyId(party_id: number): Observable<any> {
    return this.httpClient.get(POST_API_JOIN + '/party/' + party_id);
  }

  //Function to get party_member_id by party_id & user_id
  getPartyMemberID(party_id: number, user_id: number): Observable<any> {
    return this.httpClient.get(
      POST_API_JOIN + '/id/' + party_id + '/' + user_id
    );
  }

  // Function to add user to a party by party_id & user_id
  joinParty(party_id: number, user_id: number, newJoin: any): Observable<any> {
    return this.httpClient.post(
      POST_API_JOIN + '/' + party_id + '/' + user_id,
      newJoin
    );
  }

  // Exit a party by party_member_id
  exitParty(party_member_id: number): Observable<any> {
    return this.httpClient.delete(POST_API_JOIN + '/' + party_member_id);
  }
}
