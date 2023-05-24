import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // Boolen to change my profile view or other profile view
  myProfile: boolean = true;
  showData: number = 0;

  // User array
  user: any;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private friendsService: FriendsService
    ) {}

  id: number = 3;
  friends: any[] = [];
  isFriendSenderMatchUser: boolean | undefined;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const showDataParam = params.get('showData');
      if (showDataParam !== null) {
        this.showData = parseInt(showDataParam);
      }
    });

    // Logged user info
    this.user = this.tokenStorage.getUser();
    if(this.showData != this.user.id) {
      this.myProfile = false;
    }

    this.getUserById(this.showData);
    console.log(this.myProfile);

    this.getFriends();

  }

  //Function on get user by id
  getUserById(id: number) {
    this.userService.getUser(id).subscribe({
      next: (data: any) => {
        this.user = data;
        console.log(this.user);
      },
      error: (error: any) => {
        console.log("Cannot get user", error);
      }
    });
  }

  // Import friends
  getFriends() {
    this.friendsService.getFriends().subscribe({
      next: (data: any) => {
        this.friends = data.filter((friend: any) => friend.userSender.id === this.tokenStorage.getUser().id || friend.userReciever.id === this.tokenStorage.getUser().id);
        this.getMyFriends();
      },
      error: (error: any) => {
        console.log("Cannot get friend", error);
      }
    });
  }

  getMyFriends() {
    this.friends = this.friends.map((friend: any) => {
      if (friend.userSender.id === this.tokenStorage.getUser().id) {
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
    this.isFriendSenderMatchUser = this.friends.some(friend => friend.userSender.id === this.showData);

  }

}
