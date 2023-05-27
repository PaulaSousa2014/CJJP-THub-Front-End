import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/PostModels';

// API auth location
const POST_API = "https://t-hub.up.railway.app/api/posts";
const COMMENT_API = "https://t-hub.up.railway.app/api/comments";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Http client
  constructor(private httpClient: HttpClient) { }

  // POSTS
  // Get all posts
  getPosts(): Observable<any> {
    return this.httpClient.get(POST_API, httpOptions);
  }

  // Get like number
  getPostLikes(id: number): Observable<any> {
    return this.httpClient.get(POST_API + "/" + id + "/likes/ammount", httpOptions);
  }

  // Get number of comments of post
  getPostCommentsNumber(id: number): Observable<any> {
    return this.httpClient.get(POST_API + "/" + id + "/comments/ammount", httpOptions);
  }

  // Create new post
  postNewPost(newPost: Post): Observable<any> {
    return this.httpClient.post(POST_API, newPost, httpOptions);
  }

  // Get post by Id
  getPostById(id: number): Observable<any> {
    return this.httpClient.get(POST_API + "/" + id, httpOptions);
  }

  // COMMENTS
  // Get comments by Post id
  getCommentsByPostId(id: number): Observable<any> {
    return this.httpClient.get(COMMENT_API + "/post/" + id, httpOptions);
  }


}
