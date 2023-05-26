import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/services/friends.service';
import { FriendRequest, UserReciever, UserSender } from 'src/app/models/FriendsModels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // User
  myProfile = true;       // To check if is my profile or other profile
  showData = 0;           // To GET user id from URL
  user: any;              // To GET user profile information

  // Lists friends
  friends:   any[] = [];  // To GET all my friend interaction
  friendsRS: any[] = [];  // To GET all my friend request sent
  friendsRR: any[] = [];  // To GET all my friend request received

  // Button
  button = 0;             // Value to change button friend profile
  buttonChanged = false;  // Compove if button change

  // Models
  friendRt: FriendRequest = {} as FriendRequest;  // Model with sender and reciever
  userSRt: UserSender = {} as UserSender;         // Model with id sender
  userRRt: UserReciever = {} as UserReciever;     // Model with id reciever

  // Contructor
  constructor(
    private userService: UserService,           // To manage users
    private tokenStorage: TokenStorageService,  // To manage my session logged
    private route: ActivatedRoute,              // To manage routes
    private friendsService: FriendsService      // To manage friends

  ) {}

  // OnInit
  ngOnInit() {

    // GET URL user id and save in showData
    this.route.paramMap.subscribe(params => {
      const showDataParam = params.get('showData');
      this.showData = showDataParam !== null ? parseInt(showDataParam) : 0;
    });
    this.user = this.tokenStorage.getUser();
    this.myProfile = this.showData === this.user.id;

    // GET all user information from showData id
    this.getUserById(this.showData);
    // GET all friends lists
    this.getFriendsLists();
  }

  // GET one user information from id
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

  // GET all friends list to compare
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

  // Check lists to change friend button in profile
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

  // Check if button change
  printButtonStatus() {
    if (this.buttonChanged) {
      console.log("El botón ha cambiado a " + this.button);
    } else {
      console.log("El botón no ha cambiado");
    }
  }

  // Send friend request
  sendRequest(): void {
    // Save session user id into model
    this.userSRt.id = this.tokenStorage.getUser().id;
    this.getUserById(this.showData);
    // Save URL user id into model
    this.userRRt.id = this.user.id;
    this.friendRt.userSender = this.userSRt;
    // Save users id models into request model
    this.friendRt.userReciever = this.userRRt;
    // Post with request model
    this.friendsService.createFriend(this.friendRt).subscribe(
      () => {
        // Change button status to pending
        this.button = 3;
        // Show success message
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your friend request has been sent',
          showConfirmButton: false,
          timer: 1500
        });
      },
    );
  }
}
