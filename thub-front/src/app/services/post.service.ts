import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/PostModels';

// API auth location
const POST_API = 'https://t-hub.up.railway.app/api/posts';
const POST_API_likes = 'https://t-hub.up.railway.app/api/likes';
const COMMENT_API = 'https://t-hub.up.railway.app/api/comments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Http client
  constructor(private httpClient: HttpClient) {}

  // POSTS
  // Get all posts
  getPosts(): Observable<any> {
    return this.httpClient.get(POST_API, httpOptions);
  }

  // Get like number
  getPostLikes(id: number): Observable<any> {
    return this.httpClient.get(
      POST_API + '/' + id + '/likes/ammount',
      httpOptions
    );
  }

  getAllLikes(): Observable<any> {
    return this.httpClient.get(POST_API_likes, httpOptions);
  }

  // Add post like
  addLike(userId: number, postId: number, newLike: any): Observable<any> {
    return this.httpClient.post(
      POST_API_likes + '/' + postId + '/' + userId,
      newLike,
      httpOptions
    );
  }

  //Delete post like
  deleteLike(likeId: number): Observable<any> {
    return this.httpClient.delete(POST_API_likes + '/' + likeId, httpOptions);
  }

  // Get number of comments of post
  getPostCommentsNumber(id: number): Observable<any> {
    return this.httpClient.get(
      POST_API + '/' + id + '/comments/ammount',
      httpOptions
    );
  }

  // Create new post
  postNewPost(newPost: Post): Observable<any> {
    return this.httpClient.post(POST_API, newPost, httpOptions);
  }

  //Delete post by postId
  deletePost(postId: number): Observable<any> {
    return this.httpClient.delete(POST_API + '/' + postId, httpOptions);
  }

  // Get post by Id
  getPostById(id: number): Observable<any> {
    return this.httpClient.get(POST_API + '/' + id, httpOptions);
  }

  // COMMENTS
  // Get comments by Post id
  getCommentsByPostId(id: number): Observable<any> {
    return this.httpClient.get(COMMENT_API + '/post/' + id, httpOptions);
  }
}
