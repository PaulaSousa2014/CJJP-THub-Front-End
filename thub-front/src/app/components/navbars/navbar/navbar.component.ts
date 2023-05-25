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

  isLoggedIn = true;            // Logged
  user: any;                    // User logged info
  friends: any[] = [];          // Friends list
  friendsRequest: any[] = [];   // Friends requests list

  /* Constructor */
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private friendsService: FriendsService
  ) {}

  /* On init */
  ngOnInit() {

    /* Obtain user logged */
    this.user = this.tokenStorage.getUser();
    this.getUserById(this.user.id);

    /* Open modal (firends page) */
    $(document).ready(() => {
      $('#myModal').on('shown.bs.modal', () => {
        $('#myInput').trigger('focus');
      });
    });

  }

  /* View my profile button */
  goToYourProfile(): void {
    const currentUserId = this.tokenStorage.getUser().id;
    this.handleProfileClick(currentUserId);
  }


  /* Go to another profile */
  goToOtherProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }

  /* Get one user by id */
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

  /* Log out button */
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

  /* See other profiles in /profile page */
  handleProfileClick(userId: number): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile', userId]);
    });
  }

  /* Open fiends modal */
  openModal(): void {
    $('#exampleModal').modal('show');
  }
}
