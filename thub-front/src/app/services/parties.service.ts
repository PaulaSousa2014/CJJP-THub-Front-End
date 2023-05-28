import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Party } from '../models/PartyModels';

// API auth location
const PARTY_API = 'https://t-hub.up.railway.app/api/parties';
const PARTY_API_JOIN = 'https://t-hub.up.railway.app/api/party_members';
const PARTY_API_GAMES = 'https://t-hub.up.railway.app/api/games';
const PARTY_API_ACT = 'https://t-hub.up.railway.app/api/activities';
const PARTY_API_SOCIAL = 'https://t-hub.up.railway.app/api/socials';

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
    return this.httpClient
      .get(PARTY_API, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO change method name
  //Get party by party_id
  getPartiesId(partyId: number): Observable<Party> {
    return this.httpClient
      .get<Party>(PARTY_API + '/' + partyId)
      .pipe(catchError(this.handleError));
  }

  // Create new party
  postNewParty(newParty: Party): Observable<any> {
    return this.httpClient
      .post(PARTY_API, newParty, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get all game parties
  getGames(): Observable<any> {
    return this.httpClient
      .get(PARTY_API_GAMES, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get all activity parties
  getActivities(): Observable<any> {
    return this.httpClient
      .get(PARTY_API_ACT, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get all Social parties
  getSocial(): Observable<any> {
    return this.httpClient
      .get(PARTY_API_SOCIAL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Function to delete party by party_id
  deleteParty(partyId: number): Observable<any> {
    return this.httpClient
      .delete(PARTY_API + '/' + partyId)
      .pipe(catchError(this.handleError));
  }

  //JOIN REQUESTS

  // Function to get all parties from user
  getUserPartyList(userId: number): Observable<any> {
    return this.httpClient
      .get(PARTY_API_JOIN + '/user/' + userId)
      .pipe(catchError(this.handleError));
  }

  //Funcion to get partyMemberList by partyId
  getPartyMembersListByPartyId(party_id: number): Observable<any> {
    return this.httpClient
      .get(PARTY_API_JOIN + '/party/' + party_id)
      .pipe(catchError(this.handleError));
  }

  //Function to get party_member_id by party_id & user_id
  getPartyMemberID(party_id: number, user_id: number): Observable<any> {
    return this.httpClient
      .get(PARTY_API_JOIN + '/id/' + party_id + '/' + user_id)
      .pipe(catchError(this.handleError));
  }

  // Function to add user to a party by party_id & user_id
  joinParty(party_id: number, user_id: number, newJoin: any): Observable<any> {
    return this.httpClient
      .post(PARTY_API_JOIN + '/' + party_id + '/' + user_id, newJoin)
      .pipe(catchError(this.handleError));
  }

  // Exit a party by party_member_id
  exitParty(party_member_id: number): Observable<any> {
    return this.httpClient
      .delete(PARTY_API_JOIN + '/' + party_member_id)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
