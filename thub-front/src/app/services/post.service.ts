import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// API auth location
const POST_API = "https://t-hub.up.railway.app/api/posts";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Http client
  constructor(private httpClient: HttpClient) { }

  // Get all posts
  getPosts(): Observable<any> {
    return this.httpClient.get(POST_API, httpOptions);
  }

  // Get like number
  getPostLikes(id: number): Observable<any> {
    return this.httpClient.get(POST_API+"/"+id+"/likes/ammount", httpOptions);
  }

  // Get number of comments of post
  getPostCommentsNumber(id: number): Observable<any> {
    return this.httpClient.get(POST_API+"/"+id+"/comments/ammount", httpOptions);
  }


}
