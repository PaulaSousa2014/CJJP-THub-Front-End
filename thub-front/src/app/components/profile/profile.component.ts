import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // Boolen to change my profile view or other profile view
  myProfile: boolean = true;
  showData: number = 0;

  // User array
  user: any;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private route: ActivatedRoute) {}
  id: number = 3;

  ngOnInit() {

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
    console.log(this.myProfile);

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
