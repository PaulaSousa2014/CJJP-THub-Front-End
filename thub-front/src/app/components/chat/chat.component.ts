import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  selectedTab = 'private';
  changeTab(tabId: string) {
    this.selectedTab = tabId;
  }

  contactos: { id: number, nombre: string }[] = [];
  parties: {id: number, title: string, participantes: number}[] = [];

  constructor() {
    this.contactos = [
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'María García' },
      { id: 3, nombre: 'Pedro López' },
      { id: 4, nombre: 'Ana Rodríguez' },
      { id: 5, nombre: 'Luis Martínez' },
      { id: 6, nombre: 'Laura Fernández' },
      { id: 7, nombre: 'Carlos González' },
      { id: 8, nombre: 'Sofía Ramírez' },
      { id: 9, nombre: 'Miguel Torres' },
      { id: 10, nombre: 'Isabel Sánchez' },
      { id: 11, nombre: 'Mario Gómez' },
      { id: 12, nombre: 'Lucía Silva' },
      { id: 13, nombre: 'Andrés Castro' },
      { id: 14, nombre: 'Carolina Peralta' },
      { id: 15, nombre: 'Fernando Molina' },
      { id: 16, nombre: 'Julieta Ramírez' },
      { id: 17, nombre: 'Ricardo Ortega' },
      { id: 18, nombre: 'Beatriz Morales' },
      { id: 19, nombre: 'Gustavo Herrera' },
      { id: 20, nombre: 'Valentina Rojas' }
    ];

    this.parties = [
      { id: 1, title: 'Fall Guys: Ultimate Knockout', participantes: 5 },
      { id: 2, title: 'Among Us', participantes: 8 },
      { id: 3, title: 'Phasmophobia', participantes: 3 },
      { id: 4, title: 'Dead by Daylight', participantes: 6 },
      { id: 5, title: 'Sea of Thieves', participantes: 2 },
      { id: 6, title: 'Overcooked 2', participantes: 7 },
      { id: 7, title: 'Genshin Impact', participantes: 9 },
      { id: 8, title: 'Raft', participantes: 4 },
      { id: 9, title: 'Minecraft', participantes: 1 },
      { id: 10, title: 'Terraria', participantes: 10 }
    ];
  }
}
