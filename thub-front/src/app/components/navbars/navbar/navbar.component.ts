import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: any;

  constructor(private userService: UserService, private router: Router, private tokenStorage: TokenStorageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.tokenStorage.getUser();
    this.getUserById(this.user.id);
  }

  goToYourProfile() {
    const showData = this.tokenStorage.getUser().id;
    this.router.navigate(['/profile', showData]);
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

}
