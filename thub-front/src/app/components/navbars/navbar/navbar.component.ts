import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FriendsService } from 'src/app/services/friends.service';
import { Accept, UserReciever, UserSender } from 'src/app/models/FriendsModels';
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

  // Models
  accept: Accept = {} as Accept;                // Accept friend model
  acceptRS: UserSender = {} as UserSender;      // Model to user sender
  acceptRR: UserReciever = {} as UserReciever;  // Model to user reciever

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

    /* Get friends lists (not necessary) */
    this.getList();
  }

  /* Get Lists */
  getList() {
    /* Get fiend list */
    this.friendsService.getFriendsList(this.user.id, true, false).subscribe(
      (friends: any[]) => {
        this.friends = friends;
      }
    );

     /* Get fiend request list */
     this.friendsService.getFriendsList(this.user.id, false, true).subscribe(
      (friends: any[]) => {
        this.friendsRequest = friends;
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
    let modalClosed = false;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-2',
        cancelButton: 'btn btn-danger me-2'
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
      if (!modalClosed) {
        modalClosed = true;

        if (result.isConfirmed) {
          this.friendsService.deleteFriend(id).subscribe(() => {
            swalWithBootstrapButtons.fire(
              'Deleted',
              'The friend request has been removed.',
              'success'
            ).then(() => {
              this.getList();
            });
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'The friend request has not been removed.',
            'error'
          );
        }
      }
    });
  }

  // Accept friend request with sweet alert
  acceptFriend(id: number, idR: number) {
    // Friend request PUT format
    this.accept.id = id;
    this.acceptRS.id = this.tokenStorage.getUser().id;
    this.accept.userSender = this.acceptRS;
    this.acceptRR.id = idR;
    this.accept.userReciever = this.acceptRR;
    this.accept.status = true;
    // Send PUT
    this.friendsService.updateFriend(id, this.accept).subscribe(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Friend request accepted',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.getList();
        const friendsListTab = document.querySelector('#home-tab');
          if (friendsListTab) {
            friendsListTab.dispatchEvent(new Event('click'));
          }
      });
    });
  }
}
