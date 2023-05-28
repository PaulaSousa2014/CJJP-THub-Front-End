import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.httpClient.get(MESSAGE_API, httpOptions);
  }

  //Get message by party Id
  getMessageByPartyId(id: number): Observable<any> {
    return this.httpClient.get(MESSAGE_API_PARTY + '/' + id, httpOptions);
  }

  // Create new message
  postMessage(newMessage: Message): Observable<any> {
    return this.httpClient.post(MESSAGE_API, newMessage, httpOptions);
  }
}
