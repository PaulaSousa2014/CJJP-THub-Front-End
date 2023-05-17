import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  selectedTab = 'parties';
  changeTab(tabId: string) {
    this.selectedTab = tabId;
  }

  contactos: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Pedro López' },
    { id: 4, nombre: 'Ana Rodríguez' },
    { id: 5, nombre: 'Luis Martínez' },
    { id: 6, nombre: 'Laura Fernández' },
    { id: 7, nombre: 'Carlos González' },
    { id: 8, nombre: 'Sofía Ramírez' },
    { id: 9, nombre: 'Miguel Torres' },
    { id: 10, nombre: 'Isabel Sánchez' }
  ];

  usuarioSeleccionado: string | null = null;
  seleccionarUsuario(usuario: string) {
    this.usuarioSeleccionado = usuario;
  }

}
