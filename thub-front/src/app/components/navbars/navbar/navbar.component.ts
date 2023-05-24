import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = true;
  user: any;
  friends: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private friendsService: FriendsService
  ) {}

  ngOnInit() {
    this.user = this.tokenStorage.getUser();
    this.getUserById(this.user.id);

    $(document).ready(() => {
      $('#myModal').on('shown.bs.modal', () => {
        $('#myInput').trigger('focus');
      });
    });

    this.getFriends();
  }

  goToYourProfile(): void {
    const currentUserId = this.tokenStorage.getUser().id;
    const userProfileUrl = `/profile/${currentUserId}`;

    if (this.router.url === userProfileUrl) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([userProfileUrl]);
      });
    } else {
      this.router.navigate([userProfileUrl]);
    }
  }


  goToOtherProfile(id: number) {
    this.router.navigate(['/profile', id]);
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

  logOut(): void {
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.reloadPage();
  }

  yourParties(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['parties']);
    } else {
      this.router.navigate(['login']);
    }
  }

  reloadPage(): void {
    this.router.navigate(['landingpage']);
  }

  handleProfileClick(userId: number): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile', userId]);
    });
  }

  openModal(): void {
    $('#exampleModal').modal('show');
  }

  getFriends() {
    console.log("mi id es " + this.user.id);
    this.friendsService.getFriends().subscribe({
      next: (data: any) => {
        this.friends = data.filter((friend: any) => friend.userSender.id === this.user.id || friend.userReciever.id === this.user.id);
        this.getMyFriends();
      },
      error: (error: any) => {
        console.log("Cannot get friend", error);
      }
    });
  }

  getMyFriends() {
    this.friends = this.friends.map((friend: any) => {
      if (friend.userSender.id === this.user.id) {
        const tempReceiver = { ...friend.userReciever };

        return {
          ...friend,
          userSender: { ...tempReceiver },
          userReciever: { ...friend.userSender }
        };
      } else {
        // Mantener el amigo sin cambios
        return friend;
      }
    });
  }




}
