import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  @Input()
  contactos: { id: number; nombre: string; }[] = [];
  @Input()
  parties: { id: number; title: string; }[] = [];

  private _selectedTab!: string;
  @Input()
  set selectedTab(value: string) {
    this._selectedTab = value;
    console.log('selectedTab ha cambiado:', this._selectedTab);
  }

  get selectedTab(): string {
    return this._selectedTab;
  }

  usuarioSeleccionado!: string;
  seleccionarUsuario(usuario: string) {
    this.usuarioSeleccionado = usuario;
  }
}
