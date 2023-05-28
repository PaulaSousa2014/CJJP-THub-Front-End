import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../models/PostModels';
import { Comment } from '../models/CommentModels';

// API auth location
const POST_API = 'https://t-hub.up.railway.app/api/posts';
const POST_API_LIKES = 'https://t-hub.up.railway.app/api/likes';
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

  // Get post by Id
  getPostById(id: number): Observable<any> {
    return this.httpClient.get(POST_API + '/' + id, httpOptions);
  }

  // Create new post
  postNewPost(newPost: Post): Observable<any> {
    return this.httpClient.post(POST_API, newPost, httpOptions);
  }

  //Delete post by postId
  deletePost(postId: number): Observable<any> {
    return this.httpClient.delete(POST_API + '/' + postId, httpOptions);
  }

  //LIKES

  // Get like ammount
  getPostLikes(id: number): Observable<any> {
    return this.httpClient.get(
      POST_API + '/' + id + '/likes/ammount',
      httpOptions
    );
  }

  //Get All likes
  getAllLikes(): Observable<any> {
    return this.httpClient.get(POST_API_LIKES, httpOptions);
  }

  // Add post like
  addLike(userId: number, postId: number, newLike: any): Observable<any> {
    return this.httpClient.post(
      POST_API_LIKES + '/' + postId + '/' + userId,
      newLike,
      httpOptions
    );
  }

  //Delete post like
  deleteLike(likeId: number): Observable<any> {
    return this.httpClient.delete(POST_API_LIKES + '/' + likeId, httpOptions);
  }

  // COMMENTS

  // Get comments by Post id
  getCommentsByPostId(id: number): Observable<any> {
    return this.httpClient.get(COMMENT_API + '/post/' + id, httpOptions);
  }

  // Post new comment
  postComment(newComment: Comment): Observable<any> {
    return this.httpClient.post(COMMENT_API, newComment, httpOptions);
  }

  // Get amount of post comments
  getPostCommentsNumber(id: number): Observable<any> {
    return this.httpClient.get(
      POST_API + '/' + id + '/comments/ammount',
      httpOptions
    );
  }
}
