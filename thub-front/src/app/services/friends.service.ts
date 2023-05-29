import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


// API friends location
const FRIENDS_API = 'https://t-hub.up.railway.app/api/friends';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private httpClient: HttpClient) {}

  /* GET All friends */
  getFriends() {
    return this.httpClient.get(FRIENDS_API, httpOptions);
  }

  /* Add friend request: status pending */
  createFriend(data: any): Observable<any> {
    return this.httpClient
      .post(FRIENDS_API, data)
      .pipe(catchError(this.handleError));
  }

  /* Update friendRequest: Validar solicitud amitad status accepted */
  updateFriend(id: number, status: any): Observable<any> {
    const url = `${FRIENDS_API}/${id}`;
    return this.httpClient.put(url, status, httpOptions);
  }

  /* Rechazar solicitud de amistad */
  deleteFriend(id: number): Observable<any> {
    const url = `${FRIENDS_API}/${id}`;
    return this.httpClient.delete<any>(url, httpOptions);
  }

  /* Get all friends list */
  getFriendsList(id: number, type: boolean, btn: boolean): Observable<any[]> {
    return this.getFriends().pipe(
      map((data: any) => {
        const friends = data.filter(
          (friend: any) =>
            (friend.userSender.id === id || friend.userReciever.id === id) &&
            friend.status === type
        );
        if (type) {
          return this.getMyFriends(friends, id);
        } else if (!type) {
          if (btn) {
            return this.getMyFriendsRequest(friends, id);
          } else {
            return this.getMyFriendsRequestSended(friends, id);
          }
        }
        return [];
      })
    );
  }

  /* Get friends by user_id */
  getMyFriends(friends: any[], id: number): any[] {
    return friends.map((friend: any) => {
      if (friend.userSender.id === id) {
        const tempReceiver = { ...friend.userReciever };

        return {
          ...friend,
          userSender: { ...tempReceiver },
          userReciever: { ...friend.userSender },
        };
      } else {
        return friend;
      }
    });
  }

  /* Get only my friend request */
  getMyFriendsRequest(friends: any[], id: number): any[] {
    return friends.filter((friend: any) => friend.userSender.id !== id);
  }

  /* Get my friend request sended */
  getMyFriendsRequestSended(friends: any[], id: number): any[] {
    return friends.filter((friend: any) => friend.userReciever.id !== id);
  }

  /* Get all my interacions */
  getFriendsListTest(id: number): Observable<any[]> {
    return this.getFriends().pipe(
      map((data: any) =>
        data.filter((friend: any) => friend.userSender.id === id)
      )
    );
  }

  /* Get all my interacions */
  getFriendsListTestFormat(id: number, condition: boolean): Observable<any[]> {
    return this.getFriends().pipe(
      map((data: any) => {
        const friends = data.filter(
          (friend: any) =>
            friend.userSender.id === id || friend.userReciever.id === id
        );
        return this.getMyFriends(friends, id);
      })
    );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Get friend request to accept
  getFriendsRequestToAccept(idSender: number, idReceiver: number): Observable<any> {
    return this.getFriends().pipe(
      map((data: any) => {
        const friends = data.filter(
          (friend: any) =>
            friend.userSender.id === idSender && friend.userReciever.id === idReceiver
        );
        return friends;
      })
    );
  }
}
