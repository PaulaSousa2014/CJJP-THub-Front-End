import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoggedOut: boolean = true;

  /* Show navbar */
  showNavbar: boolean = true;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update showNavBar depending on atual route
        this.showNavbar = !this.isSpecificRoute(event.urlAfterRedirects);
      }
    });
  }
  //check if user is loggedIn to show the specific navbar
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.isLoggedOut = false;
      } else {
        this.isLoggedIn = false;
        this.isLoggedOut = true;
      }
    });
  }

  isSpecificRoute(url: string): boolean {
    // Define the routes
    const hiddenRoutes = ['/login', '/signup'];
    // Compare with the actual route
    return hiddenRoutes.some((route) => url.startsWith(route));
  }
}
