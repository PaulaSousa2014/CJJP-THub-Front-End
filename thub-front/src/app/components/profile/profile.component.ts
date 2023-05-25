import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myProfile: boolean = true;
  showData: number = 0;
  user: any;
  friends: any[] = [];
  friendsRS: any[] = [];
  friendsRR: any[] = [];

  button: number = 0;
  buttonChanged: boolean = false;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private friendsService: FriendsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const showDataParam = params.get('showData');
      if (showDataParam !== null) {
        this.showData = parseInt(showDataParam);
      }
    });

    this.user = this.tokenStorage.getUser();
    if (this.showData !== this.user.id) {
      this.myProfile = false;
    }

    this.getUserById(this.showData);

    this.friendsService.getFriendsListTestFormat(this.tokenStorage.getUser().id, true).subscribe(
      (friends: any[]) => {
        this.friends = friends;
        this.checkFriends();

        if (this.buttonChanged) {
          console.log("El botón ha cambiado a " + this.button);
        } else {
          console.log("El botón no ha cambiado");
        }
      },
      (error: any) => {
        console.log("Error retrieving friends list", error);
      }
    );

    this.friendsService.getFriendsList(this.tokenStorage.getUser().id, false, true).subscribe(
      (friends: any[]) => {
        this.friendsRS = friends;
        console.log("RS" + this.showData);
        console.log(this.friendsRS);
        console.log("La ID del primer registro es: " + this.friendsRS[0].userSender.id);
        this.checkFriends();
      },
      (error: any) => {
        console.log("Error retrieving friends list", error);
      }
    );

    this.friendsService.getFriendsListTest(this.tokenStorage.getUser().id).subscribe(
      (friends: any[]) => {
        this.friendsRR = friends;
        console.log(this.friendsRR);
        this.checkFriends();
      },
      (error: any) => {
        console.log("Error retrieving friends list", error);
      }
    );
  }

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

  checkFriends() {
    let newButton = 0;

    if (this.friends.some(friend => friend.userSender.id === this.showData && friend.status === true)) {
      newButton = 1; // Friends
    } else {
      if (this.friendsRS.some(friend => friend.userSender.id === this.showData)) {
        newButton = 2; // Accept
      } else {
        if (this.friendsRR.some(friend => friend.userReciever.id === this.showData)) {
          newButton = 3; // Pending
        } else {
          newButton = 0; // No friends
        }
      }
    }

    if (newButton !== this.button) {
      this.button = newButton;
      this.buttonChanged = true;
    } else {
      this.buttonChanged = false;
    }
  }
}
