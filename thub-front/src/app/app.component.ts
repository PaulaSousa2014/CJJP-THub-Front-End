import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thub-front';
  /* Boolean is logged */
  isLogged: boolean = true;
  /* Show navbar */
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Update showNavBar depending on atual route
        this.showNavbar = !this.isSpecificRoute(event.urlAfterRedirects);
      }
    });
  }

  isSpecificRoute(url: string): boolean {
    // Define the routes
    const hiddenRoutes = ['/login', '/signup'];
    // Compare with the actual route
    return hiddenRoutes.some(route => url.startsWith(route));
  }
}
