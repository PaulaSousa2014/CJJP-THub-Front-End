import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';
import { error } from 'jquery';

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

  goToYourProfile() {
    const showData = this.tokenStorage.getUser().id;
    this.router.navigate(['/profile', showData]);
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

  openModal(): void {
    $('#exampleModal').modal('show');
  }

  getFriends() {
    this.friendsService.getFriends().subscribe({
      next: (data: any) => {
        this.friends = data;
        console.log(this.friends);
      },
      error: (error: any) => {
        console.log("Cannot get friend", error);
      }
    });
  }
}
