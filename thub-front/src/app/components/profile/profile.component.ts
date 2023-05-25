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

  // Variables
  myProfile = true;       // To check if is my profile or other profile
  showData = 0;           // To GET user id from URL
  user: any;              // To GET user profile information

  // Lists
  friends:   any[] = [];  // To GET all my friend interaction
  friendsRS: any[] = [];
  friendsRR: any[] = [];

  button = 0;
  buttonChanged = false;

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private friendsService: FriendsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const showDataParam = params.get('showData');
      this.showData = showDataParam !== null ? parseInt(showDataParam) : 0;
    });

    this.user = this.tokenStorage.getUser();
    this.myProfile = this.showData === this.user.id;

    this.getUserById(this.showData);
    this.getFriendsLists();
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

  getFriendsLists() {
    this.friendsService.getFriendsListTestFormat(this.tokenStorage.getUser().id, true).subscribe(
      (friends: any[]) => {
        this.friends = friends;
        this.checkFriends();
        this.printButtonStatus();
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
        console.log("La ID del primer registro es: " + (this.friendsRS[0]?.userSender?.id || 'N/A'));
        this.checkFriends();
        this.printButtonStatus();
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
        this.printButtonStatus();
      },
      (error: any) => {
        console.log("Error retrieving friends list", error);
      }
    );
  }

  checkFriends() {
    if (this.friends.some(friend => friend.userSender.id === this.showData && friend.status === true)) {
      this.button = 1; // Friends
    } else if (this.friendsRS.some(friend => friend.userSender.id === this.showData)) {
      this.button = 2; // Accept
    } else if (this.friendsRR.some(friend => friend.userReciever.id === this.showData)) {
      this.button = 3; // Pending
    } else {
      this.button = 0; // No friends
    }

    this.buttonChanged = this.button !== this.button;
  }

  printButtonStatus() {
    if (this.buttonChanged) {
      console.log("El botón ha cambiado a " + this.button);
    } else {
      console.log("El botón no ha cambiado");
    }
  }
}
