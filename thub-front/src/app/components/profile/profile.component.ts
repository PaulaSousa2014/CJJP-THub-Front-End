import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // User array
  user: any;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {}
  id: number = 3;

  ngOnInit() {
    this.getUserById();
    //this.user = this.tokenStorage.getUser();
  }

  //Function on get user by id
  getUserById() {
    this.userService.getUser(this.id).subscribe({
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
