import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn = true;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  logOut(): void {
    this.tokenStorage.signOut();
    this.isLoggedIn=false;
    this.reloadPage();
  }
  yourParties(): void {
    if(this.tokenStorage.getToken()){
      this.router.navigate(['parties']);
    }else{
      this.router.navigate(['login']);
    }

  }

  reloadPage(): void {
    this.router.navigate(['landingpage']);
  }
}
