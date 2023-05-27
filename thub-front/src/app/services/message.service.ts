import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../models/PostModels';
import { Comment } from '../models/CommentModels';
import { Message } from '../models/MessageModels';


// API auth location
const POST_API = 'https://t-hub.up.railway.app/api/messages';
const POST_API_party = 'https://t-hub.up.railway.app/api/messages/party';

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
    return this.httpClient.get(POST_API, httpOptions);
  }

  //Get message by party Id
  getMessageByPartyId(id: number): Observable<any> {
    return this.httpClient.get(POST_API_party + '/' + id, httpOptions);
  }

  // Create new message
  postMessage(newMessage: Message): Observable<any> {
    return this.httpClient.post(POST_API, newMessage, httpOptions);
  }

  // Get post by Id
  getMessageById(id: number): Observable<any> {
    return this.httpClient.get(POST_API + '/' + id, httpOptions);
  }


}
