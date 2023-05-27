import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/UserModels';


// API user location
const USER_API = "https://t-hub.up.railway.app/api/users/"
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

  // Get user by id
  getUser(id: number): Observable<any> {
    return this.httpClient.get(USER_API + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  createUser(data: any): Observable<any> {
    return this.httpClient.post(USER_API, data).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, newUser: any): Observable<any> {
    return this.httpClient.put(USER_API + id, newUser, httpOptions);
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  };

}
