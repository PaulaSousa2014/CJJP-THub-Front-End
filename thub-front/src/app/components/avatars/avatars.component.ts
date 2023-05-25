import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css'],
})
export class AvatarsComponent {
  avatars: string[] = [
    'cat0.jpg',
    'cat1.jpg',
    'cat2.jpg',
    'cat3.jpg',
    'cat4.jpg',
    'cat5.jpg',
    'cat6.jpg',
    'cat7.jpg',
    'cat8.jpg',
    'cat9.jpg',
    'cat10.jpg',
    'cat11.jpg',
    'cat12.jpg',
    'cat13.jpg',
    'cat14.jpg',
    'cat15.jpg',
    'cat16.jpg',
    'cat17.jpg',
  ];

  user: any = this.tokenStorageService.getUser();
  selectedAvatar: string = '';
  userChanged: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  //Update User
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getUser();
  }

  selectAvatar(image: string): void {
    this.selectedAvatar = image;
  }

  getUser() {
    this.userService.getUser(this.user.id).subscribe({
      next: (response) => {
        this.userChanged = response;
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }

  save(): void {
    this.userChanged.profile_img =
      '../../../assets/img/avatars/' + this.selectedAvatar;

    // Llamar al servicio de actualización de usuario para enviar los cambios al servidor
    this.userService.updateUser(this.user.id, this.userChanged).subscribe({
      next: (response) => {
        // Checks response is valid
        if (response) {
          // Notifies it's valid
          alert('Character updated successfully!');
          this.returnPage();
        }
      },
      error: (error) => {
        console.log('Something went wrong', error);
      },
    });
  }

  returnPage(): void {
    this.router.navigate(['editprofile']);
  }
}
