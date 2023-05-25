import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// API friends location
const USER_API = "https://t-hub.up.railway.app/api/friends"
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private httpClient: HttpClient) { }

  getFriends() {
    return this.httpClient.get(USER_API, httpOptions);
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
