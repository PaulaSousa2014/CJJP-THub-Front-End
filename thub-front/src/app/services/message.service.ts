import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Message } from '../models/MessageModels';

// API auth location
const MESSAGE_API = 'https://t-hub.up.railway.app/api/messages';
const MESSAGE_API_PARTY = 'https://t-hub.up.railway.app/api/messages/party';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // Http client
  constructor(private httpClient: HttpClient) {}

  // MESSAGES
  // Get all messsages
  getMessage(): Observable<any> {
    return this.httpClient
      .get(MESSAGE_API, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Get message by party Id
  getMessageByPartyId(id: number): Observable<any> {
    return this.httpClient
      .get(MESSAGE_API_PARTY + '/' + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Create new message
  postMessage(newMessage: Message): Observable<any> {
    return this.httpClient
      .post(MESSAGE_API, newMessage, httpOptions)
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
