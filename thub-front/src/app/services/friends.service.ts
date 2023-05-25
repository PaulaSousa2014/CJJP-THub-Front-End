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
getFriendsList(id: number): Observable<any[]> {
  return this.getFriends().pipe(
    map((data: any) => {
      const friends = data.filter((friend: any) => friend.userSender.id === id || friend.userReciever.id === id);
      return this.getMyFriends(friends, id);
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
}
