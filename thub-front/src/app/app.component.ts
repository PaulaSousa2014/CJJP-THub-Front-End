import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thub-front';
  isLoggedIn = false;

  constructor() {
    // Inicializar como no autenticado
  }

  // Lógica para iniciar sesión
  login() {
    // Realizar el proceso de inicio de sesión y luego establecer isLoggedIn como true
    this.isLoggedIn = true;
  }
}
