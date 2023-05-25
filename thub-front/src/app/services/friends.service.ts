import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// API friends location
const FRIENDS_API = "https://t-hub.up.railway.app/api/friends"
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private httpClient: HttpClient) { }

  getFriends() {
    return this.httpClient.get(FRIENDS_API, httpOptions);
  }

  createFriend(userSender: any, userReceiver: any): Observable<any> {
    const friend = { userSender, userReceiver };
    return this.httpClient.post<any>(FRIENDS_API, friend, httpOptions);
  }

  updateFriend(id: number, userSender: any, userReceiver: any, status: boolean): Observable<any> {
    const friend = { id, userSender, userReceiver, status };
    const url = `${FRIENDS_API}/${id}`;
    return this.httpClient.put<any>(url, friend, httpOptions);
  }

  /* Get all friends list */
  getFriendsList(id: number, type: boolean, btn: boolean): Observable<any[]> {
    return this.getFriends().pipe(
      map((data: any) => {
        const friends = data.filter((friend: any) => (friend.userSender.id === id || friend.userReciever.id === id) && friend.status === type);
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

  /* Get friends by id */
  getMyFriends(friends: any[], id: number): any[] {
    return friends.map((friend: any) => {
      if (friend.userSender.id === id) {
        const tempReceiver = { ...friend.userReciever };

        return {
          ...friend,
          userSender: { ...tempReceiver },
          userReciever: { ...friend.userSender }
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

  /* Get only my friend request */
  getMyFriendsRequestSended(friends: any[], id: number): any[] {
    return friends.filter((friend: any) => friend.userReciever.id !== id);
  }

  /* Get all my interacions */
  getFriendsListTest(id: number): Observable<any[]> {
    return this.getFriends().pipe(
      map((data: any) => data.filter((friend: any) => friend.userSender.id === id))
    );
  }


  /* Get all my interacions */
  getFriendsListTestFormat(id: number, condition: boolean): Observable<any[]> {
    return this.getFriends().pipe(
      map((data: any) => {
        const friends = data.filter((friend: any) => (friend.userSender.id === id || friend.userReciever.id === id));
        return this.getMyFriends(friends, id);
      })
    );
  }
}
