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

  // Id user profile (URL)
  showData: number = 0;

  // User array
  user: any;

  // Lists of friends
  friends:    any[] = [];                       // List one - Friends
  friendsRS:  any[] = [];                       // List two - Request send
  friendsRR:  any[] = [];                       // List three - Request recived

  isFriend:   boolean = false                   // List one
  isFriendRS: boolean = false;                  // List two
  isFriendRR: boolean = false;                  // List three

  // Constructor
  constructor (
    private userService: UserService,           // User server to get user
    private tokenStorage: TokenStorageService,  // Tocken to get session
    private route: ActivatedRoute,              // Router
    private friendsService: FriendsService      // Friend service to get friend
    ) {}

  ngOnInit() {

    // Get id from URL
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
}
