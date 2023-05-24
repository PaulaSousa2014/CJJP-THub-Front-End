import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// API auth location
const POST_API = "https://t-hub.up.railway.app/api/parties";

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



}
