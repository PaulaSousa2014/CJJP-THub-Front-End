import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from '../models/PostModels';
import { Comment } from '../models/CommentModels';

// API auth location
const POST_API = 'https://t-hub.up.railway.app/api/posts';
const LIKES_API = 'https://t-hub.up.railway.app/api/likes';
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
    return this.httpClient
      .get(POST_API, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get post by postId
  getPostById(id: number): Observable<any> {
    return this.httpClient
      .get(POST_API + '/' + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Create new post
  postNewPost(newPost: Post): Observable<any> {
    return this.httpClient
      .post(POST_API, newPost, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Delete post by postId
  deletePost(postId: number): Observable<any> {
    return this.httpClient
      .delete(POST_API + '/' + postId, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //LIKES

  // Get like ammount by post_id
  getPostLikes(postId: number): Observable<any> {
    return this.httpClient
      .get(POST_API + '/' + postId + '/likes/ammount', httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Get All likes
  getAllLikes(): Observable<any> {
    return this.httpClient
      .get(LIKES_API, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Add post like
  addLike(userId: number, postId: number, user: any): Observable<any> {
    return this.httpClient
      .post(LIKES_API + '/' + postId + '/' + userId, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Delete post like
  deleteLike(likeId: number): Observable<any> {
    return this.httpClient
      .delete(LIKES_API + '/' + likeId, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // COMMENTS

  // Get comments by Post id
  getCommentsByPostId(id: number): Observable<any> {
    return this.httpClient
      .get(COMMENT_API + '/post/' + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Post new comment
  postComment(newComment: Comment): Observable<any> {
    return this.httpClient
      .post(COMMENT_API, newComment, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get amount of post comments
  getPostCommentsNumber(id: number): Observable<any> {
    return this.httpClient
      .get(POST_API + '/' + id + '/comments/ammount', httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete comment
  deletePostComment(id: number): Observable<any> {
    return this.httpClient
      .delete(COMMENT_API + '/' + id, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // ERROR HANDLING

  // Handle API errors
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
