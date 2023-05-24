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
    console.log('logout function');
    this.tokenStorage.signOut();
    this.reloadPage();
  }

  reloadPage(): void {
    this.router.navigate(['landingpage']);
  }
}
