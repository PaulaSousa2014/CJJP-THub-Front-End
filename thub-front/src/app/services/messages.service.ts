import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivMessage } from '../models/PrivMessageModels';

// API auth location
const POST_API = "https://t-hub.up.railway.app/api/privMessages";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) { }

    // Get all messages
    getMessages(): Observable<any> {
      return this.httpClient.get(POST_API, httpOptions);
    }

    // Create message
    postMessage(newMessage: PrivMessage): Observable<any> {
      return this.httpClient.post(POST_API, newMessage, httpOptions);

    }

}
