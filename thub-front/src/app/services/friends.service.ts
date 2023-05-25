import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  /* Get all fiends list */
  getFriendsList(id: number) {
    let friends: any[] = [];

    this.getFriends().subscribe({
      next: (data: any) => {
        friends = data.filter((friend: any) => friend.userSender.id === id || friend.userReciever.id === id);
        this.getMyFriends(friends, id);
      },
      error: (error: any) => {
        console.log("Cannot get friend", error);
      }
    });
  }

  /* Get friends by id */
  getMyFriends(friends: any[], id: number) {
    friends = friends.map((friend: any) => {
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
