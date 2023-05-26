import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';
import Swal from 'sweetalert2';

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

    /* Get fiend list */
    this.friendsService.getFriendsList(this.user.id, true, false).subscribe(
      (friends: any[]) => {
        this.friends = friends;
        console.log("this.friends nabvar");
      },
      (error: any) => {
        console.log("Error retrieving friends list", error);
      }
    );

     /* Get fiend request list */
     this.friendsService.getFriendsList(this.user.id, false, true).subscribe(
      (friends: any[]) => {
        this.friendsRequest = friends;
      },
      (error: any) => {
        console.log("Error retrieving friends list", error);
      }
    );
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

  /* Delete friend request recieved with sweet alert */
  deleteFriend(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'This action will remove the friend request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.friendsService.deleteFriend(id).subscribe(() => {
          swalWithBootstrapButtons.fire(
            'Deleted',
            'The friend request has been removed.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'The friend request has not been removed.',
          'error'
        );
      }
    });
  }



}
